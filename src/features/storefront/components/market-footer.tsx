import Link from 'next/link';
import {
  FiFacebook,
  FiHeadphones,
  FiInstagram,
  FiRotateCcw,
  FiShield,
  FiTruck,
  FiTwitter,
} from 'react-icons/fi';

const footerBadges = [
  {
    label: 'Responsive',
    note: 'Customer support available 24/7',
    icon: FiHeadphones,
  },
  { label: 'Secure', note: 'Certified marketplace since 2017', icon: FiShield },
  {
    label: 'Shipping',
    note: 'Free, fast, and reliable worldwide',
    icon: FiTruck,
  },
  {
    label: 'Transparent',
    note: 'Hassle-free return policy',
    icon: FiRotateCcw,
  },
];

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/#faq' },
  ],
  policies: [
    { label: 'Returns', href: '/about' },
    { label: 'Privacy Policy', href: '/about' },
    { label: 'Terms of Service', href: '/about' },
  ],
  shop: [
    { label: 'Electronics', href: '/products?category=electronics' },
    { label: 'Jewelry', href: '/products?category=jewelery' },
    { label: "Men's Fashion", href: '/products?category=men%27s%20clothing' },
    {
      label: "Women's Fashion",
      href: '/products?category=women%27s%20clothing',
    },
  ],
};

export function MarketFooter() {
  return (
    <footer
      id="nexmart-footer"
      className="mt-28 bg-[#111111] text-zinc-300 md:mt-2 md:mt-34"
    >
      <div className="border-b border-white/10 bg-[#1a1a1a]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-2xl font-black text-white">
            Subscribe to get our updates
          </h2>
          <form className="flex w-full max-w-xl flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              className="h-11 w-full rounded-lg border border-white/15 bg-transparent px-3 text-sm text-white outline-none focus:border-[var(--primary)]"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="h-11 rounded-lg bg-[var(--primary)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 py-6 md:grid-cols-2 xl:grid-cols-4">
        {footerBadges.map((item) => (
          <article
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[var(--primary)]">
              <item.icon />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{item.label}</h3>
              <p className="text-xs text-zinc-400">{item.note}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-8 border-t border-white/10 px-4 py-10 md:grid-cols-4">
        <div className="space-y-3">
          <p className="text-3xl font-black text-white">
            NexMart<span className="text-[var(--primary)]">.</span>
          </p>
          <p className="text-sm text-zinc-400">
            Everything. Everywhere. Every Day.
          </p>
          <p className="text-xs text-zinc-500">Support: +1 (555) 123-4567</p>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-zinc-300 transition-colors hover:text-[var(--primary)]"
              aria-label="Facebook"
            >
              <FiFacebook />
            </Link>
            <Link
              href="/"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-zinc-300 transition-colors hover:text-[var(--primary)]"
              aria-label="Twitter"
            >
              <FiTwitter />
            </Link>
            <Link
              href="/"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-zinc-300 transition-colors hover:text-[var(--primary)]"
              aria-label="Instagram"
            >
              <FiInstagram />
            </Link>
          </div>
        </div>

        <nav aria-label="Company links">
          <h3 className="mb-3 text-sm font-semibold tracking-[0.12em] text-white uppercase">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            {footerLinks.company.map((entry) => (
              <li key={entry.label}>
                <Link
                  href={entry.href}
                  className="transition-colors hover:text-white"
                >
                  {entry.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Policy links">
          <h3 className="mb-3 text-sm font-semibold tracking-[0.12em] text-white uppercase">
            Policies
          </h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            {footerLinks.policies.map((entry) => (
              <li key={entry.label}>
                <Link
                  href={entry.href}
                  className="transition-colors hover:text-white"
                >
                  {entry.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Shop links">
          <h3 className="mb-3 text-sm font-semibold tracking-[0.12em] text-white uppercase">
            Shop
          </h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            {footerLinks.shop.map((entry) => (
              <li key={entry.label}>
                <Link
                  href={entry.href}
                  className="transition-colors hover:text-white"
                >
                  {entry.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} NexMart. All rights reserved.
      </div>
    </footer>
  );
}
