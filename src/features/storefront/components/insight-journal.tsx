import { storefrontBlogs } from '../data/content.js';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export function InsightJournal() {
  const leadStory = storefrontBlogs.find((story) => story.featured);
  const sideStories = storefrontBlogs.filter((story) => !story.featured);

  return (
    <section id="tech-talk" className="mx-auto mt-10 w-full max-w-7xl px-4">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-black text-[var(--text)]">Tech Talk</h2>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)]"
        >
          View All
          <FiArrowRight />
        </Link>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        {leadStory && (
          <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_18px_32px_rgba(0,0,0,0.14)]">
            <div className="relative h-60">
              <Image
                src={leadStory.image}
                alt={leadStory.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-3 p-5">
              <span className="inline-flex rounded-full bg-[var(--primary)] px-2.5 py-1 text-xs font-semibold text-white">
                {leadStory.tag}
              </span>
              <h3 className="text-xl font-black text-[var(--text)]">{leadStory.title}</h3>
              <p className="text-xs text-zinc-500">{leadStory.date}</p>
              <p className="text-sm leading-6 text-zinc-600">{leadStory.excerpt}</p>
            </div>
          </article>
        )}

        <div className="grid gap-4">
          {sideStories.map((story) => (
            <article
              key={story.id}
              className="grid overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_18px_32px_rgba(0,0,0,0.14)] sm:grid-cols-[170px_1fr]"
            >
              <div className="relative h-40 sm:h-full">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 p-4">
                <span className="inline-flex rounded-full bg-[var(--secondary-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--primary)]">
                  {story.tag}
                </span>
                <h3 className="text-base font-black text-[var(--text)]">{story.title}</h3>
                <p className="text-xs text-zinc-500">{story.date}</p>
                <p className="text-sm text-zinc-600">{story.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
