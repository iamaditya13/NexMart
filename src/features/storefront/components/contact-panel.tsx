'use client';

import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

type ContactFormState = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  topic: '',
  message: '',
};

export function ContactPanel() {
  const [formState, setFormState] = useState(initialFormState);
  const [successMessage, setSuccessMessage] = useState('');

  function updateField(fieldName: keyof ContactFormState, value: string) {
    setFormState((previousState) => ({ ...previousState, [fieldName]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage('Thanks for reaching out. We will get back to you shortly.');
    setFormState(initialFormState);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <header className="mb-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-[var(--primary)] uppercase">
          Contact NexMart
        </p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text)]">Let&apos;s Talk</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Questions about orders, shipping, or partnerships? Send us a message.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="rounded-3xl border border-zinc-200 bg-[var(--secondary-bg)] p-5">
          <h2 className="text-xl font-black text-[var(--text)]">Get in Touch</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2 text-zinc-700">
              <FiMapPin className="text-[var(--primary)]" />
              123 Nexus Avenue, San Francisco, CA
            </li>
            <li className="flex items-center gap-2 text-zinc-700">
              <FiPhone className="text-[var(--primary)]" />
              +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2 text-zinc-700">
              <FiMail className="text-[var(--primary)]" />
              support@nexmart.shop
            </li>
          </ul>

          <div className="mt-5 rounded-2xl border border-zinc-200 bg-[var(--surface)] p-4 text-sm text-zinc-600">
            Average response time: under 24 hours.
          </div>
        </aside>

        <section className="rounded-3xl border border-zinc-200 bg-[var(--surface)] p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-zinc-700">Name</span>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(event) => {
                    updateField('name', event.target.value);
                  }}
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-[var(--surface)] px-3 text-sm outline-none transition-colors focus:border-[var(--primary)]"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-zinc-700">Email</span>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(event) => {
                    updateField('email', event.target.value);
                  }}
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-[var(--surface)] px-3 text-sm outline-none transition-colors focus:border-[var(--primary)]"
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-zinc-700">Subject</span>
              <input
                type="text"
                value={formState.topic}
                onChange={(event) => {
                  updateField('topic', event.target.value);
                }}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-[var(--surface)] px-3 text-sm outline-none transition-colors focus:border-[var(--primary)]"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-zinc-700">Message</span>
              <textarea
                value={formState.message}
                onChange={(event) => {
                  updateField('message', event.target.value);
                }}
                rows={5}
                className="w-full rounded-xl border border-zinc-200 bg-[var(--surface)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--primary)]"
                required
              />
            </label>

            {successMessage ? (
              <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                {successMessage}
              </p>
            ) : null}

            <button
              type="submit"
              className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
