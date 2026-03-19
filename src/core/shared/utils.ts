export const APP_URL = 'https://nexmart-storefront.vercel.app';
export const APP_TITLE = 'NexMart';
export const APP_DESCRIPTION =
  'Everything. Everywhere. Every Day. Portfolio-ready e-commerce storefront built with Next.js, Tailwind CSS, and Fake Store API.';
export const APP_REPOSITORY_URL = 'https://github.com/your-username/nexmart';

export function createMockArray(length: number) {
  // eslint-disable-next-line unicorn/prefer-spread
  return Array.from(Array.from({ length }).keys());
}

export function getDateString(date: Date) {
  return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}
