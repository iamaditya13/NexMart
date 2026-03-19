export type StorefrontSlide = {
  id: string;
  heading: string;
  summary: string;
  buttonText: string;
  buttonHref: string;
  image: string;
};

export type StorefrontFaq = {
  question: string;
  answer: string;
};

export type StorefrontBlog = {
  id: string;
  tag: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  featured: boolean;
};

export const storefrontSlides: StorefrontSlide[];
export const storefrontFaq: StorefrontFaq[];
export const storefrontBlogs: StorefrontBlog[];
export const storefrontBrands: string[];
