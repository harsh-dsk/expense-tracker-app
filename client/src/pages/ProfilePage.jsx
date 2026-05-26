function ProfilePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section id="profile">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Profile
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Account settings and preferences.
          </p>
        </div>

        <div className="mx-auto max-w-lg rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 shadow-lg shadow-black/20 sm:p-8">
          <div className="flex items-center gap-4">
            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-2xl font-bold text-zinc-950 shadow-lg shadow-emerald-500/20"
              aria-hidden="true"
            >
              ET
            </span>
            <div>
              <h2 className="text-lg font-semibold text-white">Expense Tracker User</h2>
              <p className="text-sm text-zinc-500">user@example.com</p>
            </div>
          </div>

          <dl className="mt-8 space-y-4 border-t border-zinc-800/80 pt-6">
            <div className="flex justify-between gap-4 text-sm">
              <dt className="text-zinc-500">Currency</dt>
              <dd className="font-medium text-zinc-200">INR (₹)</dd>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <dt className="text-zinc-500">Monthly budget</dt>
              <dd className="font-medium text-zinc-200">₹50,000</dd>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <dt className="text-zinc-500">Notifications</dt>
              <dd className="font-medium text-emerald-400">Enabled</dd>
            </div>
          </dl>

          <button
            type="button"
            className="mt-8 w-full rounded-lg border border-zinc-700/80 bg-zinc-950/80 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800/80 hover:text-white"
          >
            Edit profile
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
