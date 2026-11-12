import Link from "next/link";

type SocialPlatform = "github" | "instagram" | "telegram";

const socialLinks: { platform: SocialPlatform; label: string; href: string }[] = [
  { platform: "github", label: "bhuvii16", href: "https://github.com/bhuvii16" },
  { platform: "instagram", label: "bhuvii0716", href: "https://www.instagram.com/bhuvii0716/" },
  { platform: "telegram", label: "walker_web", href: "https://t.me/walker_web" },
];

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === "github") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.45-1.11-1.45-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.63-1.35-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="size-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M21.8 3.2 18.7 20c-.23 1.2-.86 1.5-1.75.94l-4.85-3.58-2.34 2.25c-.26.26-.48.48-.98.48l.35-4.94 8.99-8.12c.39-.35-.09-.55-.61-.2L6.39 13.86l-4.77-1.49c-1.04-.33-1.06-1.04.22-1.55L20.5 3.37c.87-.32 1.63.21 1.3-.17Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/90">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-xs text-zinc-500">
          ELabVault <span className="px-1.5 text-zinc-700">/</span> Built by{" "}
          <a
            href="https://github.com/bhuvii16"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-zinc-300 transition hover:text-emerald-300"
          >
            bhuvii16
          </a>
        </p>

        <nav aria-label="Contact links" className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link href="/contribute" className="text-xs font-medium text-emerald-300 transition hover:text-emerald-200">
            Contribute
          </Link>
          {socialLinks.map(({ platform, label, href }) => (
            <a
              key={platform}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${platform} profile: ${label}`}
              className="inline-flex items-center gap-2 text-xs text-zinc-400 transition hover:text-emerald-300"
            >
              <SocialIcon platform={platform} />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}