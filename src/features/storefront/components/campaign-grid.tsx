import Image from 'next/image';
import Link from 'next/link';

export function CampaignGrid() {
  return (
    <section className="mx-auto mt-10 w-full max-w-7xl px-4">
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="relative min-h-[300px] overflow-hidden rounded-3xl border border-zinc-200 bg-[var(--secondary-bg)] p-6 shadow-[0_10px_24px_rgba(0,0,0,0.07)]">
          <div className="relative z-10 max-w-xs space-y-3">
            <p className="text-xs font-semibold tracking-[0.15em] text-zinc-600 uppercase">
              Shipping Offer
            </p>
            <h3 className="text-3xl font-black text-[var(--text)]">Free Shipping</h3>
            <p className="text-sm leading-6 text-zinc-600">
              Free and fast delivery on orders over $50. Everyday reliability,
              no hidden surprises.
            </p>
            <Link
              href="/products"
              className="inline-flex rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#df3d00]"
            >
              Shop Now
            </Link>
          </div>

          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80"
            alt="Free shipping campaign"
            width={420}
            height={300}
            className="absolute -right-6 bottom-0 h-56 w-80 object-contain opacity-95 md:h-64"
          />
        </article>

        <div className="grid gap-4">
          <article className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-[var(--secondary-bg)] p-6 shadow-[0_10px_24px_rgba(0,0,0,0.07)]">
            <div className="relative z-10 max-w-[16rem] space-y-3">
              <p className="text-xs font-semibold tracking-[0.15em] text-zinc-600 uppercase">
                Mega Deal
              </p>
              <h3 className="text-2xl font-black text-[var(--text)]">
                Black Friday Clearance
              </h3>
              <p className="text-sm text-zinc-600">Up to 80% off selected items.</p>
              <Link
                href="/products"
                className="inline-flex rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#df3d00]"
              >
                Shop Now
              </Link>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=80"
              alt="Black Friday campaign"
              width={280}
              height={150}
              className="absolute -right-6 top-1/2 h-36 w-56 -translate-y-1/2 object-contain"
            />
          </article>

          <article className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-[var(--secondary-bg)] p-6 shadow-[0_10px_24px_rgba(0,0,0,0.07)]">
            <div className="relative z-10 max-w-[16rem] space-y-3">
              <p className="text-xs font-semibold tracking-[0.15em] text-zinc-600 uppercase">
                Welcome Offer
              </p>
              <h3 className="text-2xl font-black text-[var(--text)]">
                First Purchase 20% Discount
              </h3>
              <p className="text-sm text-zinc-600">
                Use code <span className="font-bold text-[var(--primary)]">NEXFIRST20</span>
              </p>
              <Link
                href="/products"
                className="inline-flex rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#df3d00]"
              >
                Claim Deal
              </Link>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80"
              alt="First purchase discount"
              width={240}
              height={150}
              className="absolute -right-8 bottom-0 h-32 w-52 object-contain"
            />
          </article>
        </div>
      </div>
    </section>
  );
}
