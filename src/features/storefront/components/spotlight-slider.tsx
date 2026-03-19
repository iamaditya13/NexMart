'use client';

import { storefrontSlides } from '../data/content.js';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { twJoin } from 'tailwind-merge';

export function SpotlightSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  const itemCount = storefrontSlides.length;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((previousSlide) => (previousSlide + 1) % itemCount);
    }, 4000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [itemCount]);

  const currentSlide = useMemo(() => {
    return storefrontSlides[activeSlide];
  }, [activeSlide]);

  function jumpBackward() {
    setActiveSlide((previousSlide) =>
      previousSlide === 0 ? itemCount - 1 : previousSlide - 1,
    );
  }

  function jumpForward() {
    setActiveSlide((previousSlide) => (previousSlide + 1) % itemCount);
  }

  return (
    <section className="mx-auto mt-4 w-full max-w-7xl px-4 md:mt-6" aria-label="Hero slider">
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-[var(--surface-2)]">
        <div className="grid min-h-[440px] items-center gap-8 p-6 md:grid-cols-[1.1fr_1fr] md:px-10 md:py-12">
          <div className="order-2 animate-[float-up_500ms_ease-out] space-y-5 md:order-1">
            <span className="inline-flex rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-bold tracking-[0.14em] text-[var(--primary)] uppercase shadow-sm">
              NexMart Spotlight
            </span>
            <h1 className="max-w-xl text-3xl font-black leading-tight text-[var(--text)] md:text-5xl">
              {currentSlide.heading}
            </h1>
            <p className="max-w-lg text-sm leading-7 text-zinc-600 md:text-base">
              {currentSlide.summary}
            </p>
            <Link
              href={currentSlide.buttonHref}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e13d00]"
            >
              {currentSlide.buttonText}
              <FiArrowRight />
            </Link>
          </div>

          <div className="relative order-1 h-64 overflow-hidden rounded-2xl bg-[var(--surface)]/80 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.65)] md:order-2 md:h-[360px] md:p-6">
            <Image
              key={currentSlide.id}
              src={currentSlide.image}
              alt={currentSlide.heading}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="animate-[float-up_450ms_ease-out] object-contain p-4"
              priority
            />
          </div>
        </div>

        <button
          type="button"
          onClick={jumpBackward}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 inline-flex -translate-y-1/2 rounded-full border border-zinc-200 bg-[var(--surface)] p-2.5 text-zinc-700 transition-colors hover:text-[var(--primary)]"
        >
          <FiArrowLeft />
        </button>

        <button
          type="button"
          onClick={jumpForward}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 inline-flex -translate-y-1/2 rounded-full border border-zinc-200 bg-[var(--surface)] p-2.5 text-zinc-700 transition-colors hover:text-[var(--primary)]"
        >
          <FiArrowRight />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {storefrontSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to ${slide.heading}`}
              onClick={() => {
                setActiveSlide(index);
              }}
              className={twJoin(
                'h-2.5 w-2.5 rounded-full transition-all',
                index === activeSlide ? 'w-7 bg-[var(--primary)]' : 'bg-zinc-300',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
