import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { z } from 'zod';

export const runtime = 'nodejs';

const verifyPayloadSchema = z.object({
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

export async function POST(request: Request) {
  const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!razorpaySecret) {
    return NextResponse.json(
      { error: 'Razorpay secret is not configured.' },
      { status: 500 },
    );
  }

  const requestBody: unknown = await request.json().catch(() => null);
  const parsedInput = verifyPayloadSchema.safeParse(requestBody);

  if (!parsedInput.success) {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
  }

  const message = `${parsedInput.data.razorpayOrderId}|${parsedInput.data.razorpayPaymentId}`;
  const expectedSignature = createHmac('sha256', razorpaySecret)
    .update(message)
    .digest('hex');

  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
  const receivedBuffer = Buffer.from(parsedInput.data.razorpaySignature, 'utf8');

  const isVerified =
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer);

  if (!isVerified) {
    return NextResponse.json(
      { error: 'Payment signature verification failed.' },
      { status: 400 },
    );
  }

  return NextResponse.json({ verified: true });
}
