import { useEffect, useState } from 'react';
import Modal from './Modal';

function SignInModal({ open, onClose, onSubmit, initialName = '', initialEmail = '' }) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  useEffect(() => {
    if (!open) return;
    setName(initialName);
    setEmail(initialEmail);
  }, [open, initialName, initialEmail]);

  return (
    <Modal open={open} onClose={onClose} titleId="sign-in-title">
      <div className="animate-modal-in rounded-2xl border border-zinc-800/80 bg-zinc-900/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-7">
        <h2 id="sign-in-title" className="text-xl font-semibold tracking-tight text-white">
          Welcome back
        </h2>
        <p className="mt-1.5 text-sm text-zinc-400">
          Sign in to manage your profile, budget, and preferences.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const ok = onSubmit?.({ name, email });
            if (ok) onClose?.();
          }}
        >
          <div>
            <label htmlFor="signin-name" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Full name
            </label>
            <input
              id="signin-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 transition focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Enter your name"
              autoComplete="name"
              required
            />
          </div>
          <div>
            <label htmlFor="signin-email" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Email address
            </label>
            <input
              id="signin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 transition focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-zinc-700/80 bg-zinc-950/70 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800/80 hover:text-zinc-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 shadow-md shadow-emerald-500/25 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default SignInModal;
