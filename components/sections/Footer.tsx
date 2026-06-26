import { portfolioData } from '@/lib/data';

export default function Footer() {
  const { profile } = portfolioData;
  const year = new Date().getFullYear();
  const wordmark = profile.fullName.toUpperCase().replace(' ', '_');

  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-sm font-bold tracking-tight text-accent-blue">
          {wordmark}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-faint">
          © {year} · {profile.location} · {profile.timezone}
        </span>
      </div>
    </footer>
  );
}
