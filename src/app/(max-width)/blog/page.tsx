import { getMetadata } from '@/core/seo/utils';
import { storefrontBlogs } from '@/features/storefront/data/content.js';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = getMetadata({
  title: 'Tech Talk',
  description: 'NexMart editorial stories, guides, and product insights.',
  pathname: '/blog',
});

export default function BlogPage() {
  const featuredPost = storefrontBlogs.find((entry) => entry.featured);
  const sidePosts = storefrontBlogs.filter((entry) => !entry.featured);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <header className="mb-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-[var(--primary)] uppercase">
          NexMart Journal
        </p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text)]">Tech Talk</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Stay updated with shopping trends, product insights, and buying guides.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        {featuredPost ? (
          <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-[var(--surface)] shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
            <div className="relative h-64">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-3 p-5">
              <span className="inline-flex rounded-full bg-[var(--primary)] px-2.5 py-1 text-xs font-semibold text-white">
                {featuredPost.tag}
              </span>
              <h2 className="text-2xl font-black text-[var(--text)]">{featuredPost.title}</h2>
              <p className="text-xs text-zinc-500">{featuredPost.date}</p>
              <p className="text-sm leading-7 text-zinc-600">{featuredPost.excerpt}</p>
            </div>
          </article>
        ) : null}

        <div className="grid gap-4">
          {sidePosts.map((post) => (
            <article
              key={post.id}
              className="grid overflow-hidden rounded-3xl border border-zinc-200 bg-[var(--surface)] shadow-[0_10px_24px_rgba(0,0,0,0.08)] sm:grid-cols-[170px_1fr]"
            >
              <div className="relative h-44 sm:h-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 p-4">
                <span className="inline-flex rounded-full bg-[var(--secondary-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--primary)]">
                  {post.tag}
                </span>
                <h3 className="text-lg font-black text-[var(--text)]">{post.title}</h3>
                <p className="text-xs text-zinc-500">{post.date}</p>
                <p className="text-sm leading-6 text-zinc-600">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
