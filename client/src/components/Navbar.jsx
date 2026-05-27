import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { id: 'dashboard', label: 'Dashboard', to: '/' },
  { id: 'expenses', label: 'Expenses', to: '/expenses' },
  { id: 'analytics', label: 'Analytics', to: '/analytics' },
  { id: 'profile', label: 'Profile', to: '/profile' },
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

function ChevronDownIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function UserAvatar({ name, className = '' }) {
  const letter = (name || 'U').trim().charAt(0).toUpperCase();
  return (
    <span
      className={[
        'inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-sm font-bold text-zinc-950 shadow-md shadow-emerald-500/25',
        className,
      ].join(' ')}
      aria-hidden="true"
    >
      {letter}
    </span>
  );
}

function Navbar({ userSession, userSettings, onOpenSignIn, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const isSignedIn = Boolean(userSession);

  useEffect(() => {
    if (!profileMenuOpen) return;
    const onMouseDown = (e) => {
      if (!profileMenuRef.current?.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', onMouseDown);
    return () => window.removeEventListener('mousedown', onMouseDown);
  }, [profileMenuOpen]);

  const linkClass = ({ isActive }) =>
    [
      'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-emerald-500/15 text-emerald-400'
        : 'text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-100',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
          onClick={closeMenu}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-zinc-950 shadow-lg shadow-emerald-500/20 transition group-hover:shadow-emerald-500/35">
            <WalletIcon className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight text-white sm:text-lg">
              Expense Tracker
            </span>
            <span className="text-xs font-medium text-emerald-400/90 sm:text-sm">
              Dashboard
            </span>
          </span>
        </Link>

        <ul className="hidden list-none items-center gap-1 md:flex">
          {NAV_LINKS.map(({ id, label, to }) => (
            <li key={id}>
              <NavLink to={to} end={to === '/'} className={linkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {!isSignedIn ? (
            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800/80 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
              onClick={onOpenSignIn}
            >
              Sign in
            </button>
          ) : (
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700/70 bg-zinc-900/70 px-2.5 py-1.5 text-sm text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                aria-expanded={profileMenuOpen}
                aria-haspopup="menu"
              >
                <UserAvatar
                  name={userSettings?.name || userSession?.name}
                  className="h-8 w-8 text-xs"
                />
                <ChevronDownIcon className="h-4 w-4 text-zinc-400" />
              </button>
              {profileMenuOpen ? (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-zinc-800 bg-zinc-900/95 p-1 shadow-xl shadow-black/40 backdrop-blur-md">
                  <Link
                    to="/profile"
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800/80"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-rose-300 transition hover:bg-zinc-800/80"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      onLogout?.();
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-300 transition hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
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
          {NAV_LINKS.map(({ id, label, to }) => (
            <li key={id}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => `block ${linkClass({ isActive })}`}
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 border-t border-zinc-800/80 px-4 pb-4 pt-2 sm:px-6">
          {!isSignedIn ? (
            <button
              type="button"
              className="w-full rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800/80 hover:text-zinc-100"
              onClick={() => {
                closeMenu();
                onOpenSignIn?.();
              }}
            >
              Sign in
            </button>
          ) : (
            <>
              <Link
                to="/profile"
                className="block w-full rounded-lg px-3 py-2.5 text-center text-sm font-medium text-zinc-300 transition hover:bg-zinc-800/80 hover:text-zinc-100"
                onClick={closeMenu}
              >
                Profile
              </Link>
              <button
                type="button"
                className="w-full rounded-lg px-3 py-2.5 text-sm font-medium text-rose-300 transition hover:bg-zinc-800/80"
                onClick={() => {
                  closeMenu();
                  onLogout?.();
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
