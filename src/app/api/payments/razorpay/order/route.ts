import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const createOrderSchema = z.object({
  amount: z.number().positive(),
  currency: z.literal('INR').optional(),
});

type RazorpayOrderResponse = {
  id: string;
  amount: number;
  currency: string;
};

function getRazorpayCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return null;
  }

  return { keyId, keySecret };
}

export async function POST(request: Request) {
  const credentials = getRazorpayCredentials();
  if (!credentials) {
    return NextResponse.json(
      {
        error:
          'Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.',
      },
      { status: 500 },
    );
  }

  const requestBody: unknown = await request.json().catch(() => null);
  const parsedInput = createOrderSchema.safeParse(requestBody);

  if (!parsedInput.success) {
    return NextResponse.json(
      {
        error: 'Invalid payment payload.',
      },
      { status: 400 },
    );
  }

  const amountInPaise = Math.round(parsedInput.data.amount * 100);

  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(
        `${credentials.keyId}:${credentials.keySecret}`,
      ).toString('base64')}`,
    },
    body: JSON.stringify({
      amount: amountInPaise,
      currency: parsedInput.data.currency ?? 'INR',
      receipt: `nexmart_${Date.now()}`,
      notes: {
        source: 'nexmart_cart',
      },
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const razorpayError = await response.text().catch(() => '');

    return NextResponse.json(
      {
        error: 'Failed to create Razorpay order.',
        details: razorpayError,
      },
      { status: 502 },
    );
  }

  const order = (await response.json()) as RazorpayOrderResponse;

  return NextResponse.json({
    id: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: credentials.keyId,
  });
}
