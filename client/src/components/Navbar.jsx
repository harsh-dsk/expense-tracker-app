import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { id: 'dashboard', label: 'Dashboard', href: '#dashboard' },
  { id: 'expenses', label: 'Expenses', href: '#expenses' },
  { id: 'analytics', label: 'Analytics', href: '#analytics' },
  { id: 'profile', label: 'Profile', href: '#profile' },
];

function WalletIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 7h15a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7z" />
      <path d="M3 10h15" />
      <circle cx="17" cy="14" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MenuIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('dashboard');

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const linkClass = (id) =>
    [
      'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      activeLink === id
        ? 'bg-emerald-500/15 text-emerald-400'
        : 'text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-100',
    ].join(' ');

  const handleNavClick = (id) => {
    setActiveLink(id);
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <a
          href="#dashboard"
          className="group flex shrink-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
          onClick={() => setActiveLink('dashboard')}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-zinc-950 shadow-lg shadow-emerald-500/20 transition group-hover:shadow-emerald-500/35">
            <WalletIcon className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight text-white sm:text-lg">
              Expense
            </span>
            <span className="text-xs font-medium text-emerald-400/90 sm:text-sm">
              Tracker
            </span>
          </span>
        </a>

        <ul className="hidden list-none items-center gap-1 md:flex">
          {NAV_LINKS.map(({ id, label, href }) => (
            <li key={id}>
              <a
                href={href}
                className={linkClass(id)}
                aria-current={activeLink === id ? 'page' : undefined}
                onClick={() => handleNavClick(id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800/80 hover:text-zinc-100"
          >
            Sign in
          </button>
          <a
            href="#add-expense"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-md shadow-emerald-500/25 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            + Add expense
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-300 transition hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <CloseIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </button>
      </nav>

      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 top-14 z-40 bg-black/50 md:hidden"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}

      <div
        id="mobile-nav"
        className={[
          'overflow-hidden border-t border-zinc-800/80 bg-zinc-950/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out md:hidden',
          menuOpen
            ? 'relative z-50 max-h-96 opacity-100'
            : 'pointer-events-none max-h-0 opacity-0 border-t-transparent',
        ].join(' ')}
        aria-hidden={!menuOpen}
      >
        <ul className="list-none space-y-1 px-4 py-4 sm:px-6">
          {NAV_LINKS.map(({ id, label, href }) => (
            <li key={id}>
              <a
                href={href}
                className={`block ${linkClass(id)}`}
                aria-current={activeLink === id ? 'page' : undefined}
                onClick={() => handleNavClick(id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 border-t border-zinc-800/80 px-4 pb-4 pt-2 sm:px-6">
          <button
            type="button"
            className="w-full rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800/80 hover:text-zinc-100"
            onClick={closeMenu}
          >
            Sign in
          </button>
          <a
            href="#add-expense"
            className="block w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-center text-sm font-semibold text-zinc-950 shadow-md shadow-emerald-500/25 transition hover:bg-emerald-400"
            onClick={closeMenu}
          >
            + Add expense
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
