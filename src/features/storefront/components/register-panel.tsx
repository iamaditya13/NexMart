'use client';

import { setDemoAuthState, setDemoProfileState } from '@/features/storefront/utils/demo-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

type RegisterFormState = {
  email: string;
  password: string;
};

const initialFormState: RegisterFormState = {
  email: '',
  password: '',
};

export function RegisterPanel() {
  const router = useRouter();
  const [formState, setFormState] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(fieldName: keyof RegisterFormState, value: string) {
    setFormState((previousState) => ({ ...previousState, [fieldName]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');

    const normalizedEmail = formState.email.trim().toLowerCase();

    if (!normalizedEmail) {
      setErrorMessage('Email is required.');
      return;
    }

    if (formState.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const normalizedUsername = normalizedEmail.split('@')[0] ?? normalizedEmail;
      const profile = {
        username: normalizedUsername,
        fullName: normalizedUsername,
        email: normalizedEmail,
      };

      setDemoProfileState(profile);
      setDemoAuthState({
        token: `local-demo-${Date.now()}`,
        username: normalizedUsername,
        fullName: profile.fullName,
        email: profile.email,
      });

      router.replace('/profile');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-md px-4 py-12">
      <section className="rounded-3xl border border-zinc-200 bg-[var(--surface)] p-6 shadow-[0_14px_34px_rgba(0,0,0,0.08)]">
        <p className="text-xs font-semibold tracking-[0.16em] text-[var(--primary)] uppercase">
          Create Account
        </p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text)]">Join NexMart</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Create your account with email and password.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-zinc-700">Email</span>
            <input
              type="email"
              value={formState.email}
              onChange={(event) => {
                updateField('email', event.target.value);
              }}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-[var(--surface)] px-3 text-sm outline-none transition-colors focus:border-[var(--primary)]"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-zinc-700">Password</span>
            <input
              type="password"
              value={formState.password}
              onChange={(event) => {
                updateField('password', event.target.value);
              }}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-[var(--surface)] px-3 text-sm outline-none transition-colors focus:border-[var(--primary)]"
              placeholder="At least 6 characters"
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
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
            <FiArrowRight />
          </button>
        </form>

        <p className="mt-4 text-sm text-zinc-600">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[var(--primary)]">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
