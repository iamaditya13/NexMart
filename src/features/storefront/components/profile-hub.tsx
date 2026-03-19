'use client';

import {
  AUTH_EVENT_KEY,
  clearDemoAuthState,
  getDemoAuthState,
  getDemoProfileState,
  setDemoAuthState,
  setDemoProfileState,
  type DemoAuthState,
  type DemoProfileState,
} from '@/features/storefront/utils/demo-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiLogOut, FiSave } from 'react-icons/fi';

function readProfileSnapshot() {
  const auth = getDemoAuthState();
  const profile = getDemoProfileState();

  return {
    auth,
    profile: {
      username: auth?.username ?? profile?.username ?? '',
      fullName: profile?.fullName ?? auth?.fullName ?? '',
      email: profile?.email ?? auth?.email ?? '',
      phone: profile?.phone ?? '',
      address: profile?.address ?? '',
    } satisfies DemoProfileState,
  };
}

export function ProfileHub() {
  const initialSnapshot = readProfileSnapshot();
  const router = useRouter();
  const [authState, setAuthState] = useState<DemoAuthState | null>(
    initialSnapshot.auth,
  );
  const [profileState, setProfileState] = useState<DemoProfileState>(
    initialSnapshot.profile,
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    function syncFromStorage() {
      const snapshot = readProfileSnapshot();
      setAuthState(snapshot.auth);
      setProfileState(snapshot.profile);
    }

    window.addEventListener('storage', syncFromStorage);
    window.addEventListener(AUTH_EVENT_KEY, syncFromStorage as EventListener);

    return () => {
      window.removeEventListener('storage', syncFromStorage);
      window.removeEventListener(AUTH_EVENT_KEY, syncFromStorage as EventListener);
    };
  }, []);

  function updateField(fieldName: keyof DemoProfileState, value: string) {
    setProfileState((previousState) => ({ ...previousState, [fieldName]: value }));
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authState) return;

    setIsSaving(true);

    const nextProfile: DemoProfileState = {
      username: authState.username,
      fullName: profileState.fullName.trim(),
      email: profileState.email.trim(),
      phone: profileState.phone?.trim(),
      address: profileState.address?.trim(),
    };

    setDemoProfileState(nextProfile);
    setDemoAuthState({
      ...authState,
      fullName: nextProfile.fullName,
      email: nextProfile.email,
    });

    window.setTimeout(() => {
      setIsSaving(false);
    }, 350);
  }

  if (!authState) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-14 text-center">
        <h1 className="text-3xl font-black text-[var(--text)]">You are not signed in</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Sign in to manage your NexMart profile.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/login"
            className="inline-flex rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-flex rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            Create Account
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-[var(--primary)] uppercase">
            Dashboard
          </p>
          <h1 className="text-3xl font-black text-[var(--text)]">My Profile</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Manage your account details for this demo storefront.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            clearDemoAuthState();
            router.replace('/login');
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <FiLogOut />
          Logout
        </button>
      </header>

      <section className="rounded-3xl border border-zinc-200 bg-[var(--surface)] p-5 shadow-[0_10px_26px_rgba(0,0,0,0.07)]">
        <form onSubmit={handleSave} className="grid gap-3 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-semibold text-zinc-700">Username</span>
            <input
              type="text"
              value={authState.username}
              readOnly
              className="h-11 w-full rounded-xl border border-zinc-200 bg-[var(--secondary-bg)] px-3 text-sm text-zinc-500"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-zinc-700">Full Name</span>
            <input
              type="text"
              value={profileState.fullName}
              onChange={(event) => {
                updateField('fullName', event.target.value);
              }}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-[var(--surface)] px-3 text-sm outline-none transition-colors focus:border-[var(--primary)]"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-zinc-700">Email</span>
            <input
              type="email"
              value={profileState.email}
              onChange={(event) => {
                updateField('email', event.target.value);
              }}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-[var(--surface)] px-3 text-sm outline-none transition-colors focus:border-[var(--primary)]"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-zinc-700">Phone</span>
            <input
              type="tel"
              value={profileState.phone ?? ''}
              onChange={(event) => {
                updateField('phone', event.target.value);
              }}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-[var(--surface)] px-3 text-sm outline-none transition-colors focus:border-[var(--primary)]"
              placeholder="+1 (555) 123-4567"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-zinc-700">Address</span>
            <input
              type="text"
              value={profileState.address ?? ''}
              onChange={(event) => {
                updateField('address', event.target.value);
              }}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-[var(--surface)] px-3 text-sm outline-none transition-colors focus:border-[var(--primary)]"
              placeholder="123 Nexus Avenue, San Francisco, CA"
            />
          </label>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FiSave />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
