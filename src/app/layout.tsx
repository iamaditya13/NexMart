import { MarketFooter } from '@/features/storefront/components/market-footer';
import { MarketHeader } from '@/features/storefront/components/market-header';
import '@/core/styles/globals.css';
import { ThemeProvider } from '@/core/styles/components/theme-provider';
import { SessionRefresher } from '@/features/auth/components/session-refresher';
import { BackToTopButton } from '@/features/storefront/components/back-to-top';
import { CookieConsentBanner } from '@/features/storefront/components/cookie-consent';
import { APP_DESCRIPTION, APP_TITLE } from '@/core/shared/utils';
import { CartProvider } from '../../context/CartContext';
import { WishlistProvider } from '../../context/WishlistContext';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'sonner';

export const viewport: Viewport = {
  themeColor: '#ff4500',
};

export const metadata: Metadata = {
  title: {
    default: APP_TITLE,
    template: `%s | ${APP_TITLE}`,
  },
  description: APP_DESCRIPTION,
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head />
      <body className="bg-[var(--bg)] text-[var(--text)]">
        <ThemeProvider>
          <Toaster richColors />
          <SessionRefresher />
          <WishlistProvider>
            <CartProvider>
              <div className="min-h-screen bg-[var(--bg)]">
                <MarketHeader />
                {children}
                <MarketFooter />
                <BackToTopButton />
                <CookieConsentBanner />
              </div>
            </CartProvider>
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
