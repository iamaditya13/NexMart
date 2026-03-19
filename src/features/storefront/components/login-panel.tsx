'use client';

import {
  getDemoProfileState,
  setDemoAuthState,
  setDemoProfileState,
} from '@/features/storefront/utils/demo-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiArrowRight, FiLock, FiMail } from 'react-icons/fi';

export function LoginPanel() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setErrorMessage('Email is required.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);

    const savedProfile = getDemoProfileState();
    const fallbackName = normalizedEmail.split('@')[0] ?? normalizedEmail;
    const profile =
      savedProfile?.email.toLowerCase() === normalizedEmail
        ? savedProfile
        : {
            username: fallbackName,
            fullName: fallbackName,
            email: normalizedEmail,
          };

    setDemoProfileState(profile);
    setDemoAuthState({
      token: `local-demo-${Date.now()}`,
      username: profile.username,
      fullName: profile.fullName,
      email: profile.email,
    });

    router.replace('/profile');
    setIsSubmitting(false);
  }

  return (
    <main className="mx-auto w-full max-w-md px-4 py-12">
      <section className="rounded-3xl border border-zinc-200 bg-[var(--surface)] p-6 shadow-[0_14px_34px_rgba(0,0,0,0.08)]">
        <p className="text-xs font-semibold tracking-[0.16em] text-[var(--primary)] uppercase">
          Welcome Back
        </p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text)]">Sign in to NexMart</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Use your email and password to access your demo account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <label className="block">
            <span className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-zinc-700">
              <FiMail />
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-[var(--surface)] px-3 text-sm outline-none transition-colors focus:border-[var(--primary)]"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-zinc-700">
              <FiLock />
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-[var(--surface)] px-3 text-sm outline-none transition-colors focus:border-[var(--primary)]"
              placeholder="••••••••"
              required
            />
          </label>

          {errorMessage ? (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-300">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
            <FiArrowRight />
          </button>
        </form>

        <p className="mt-4 text-sm text-zinc-600">
          New here?{' '}
          <Link href="/register" className="font-semibold text-[var(--primary)]">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
