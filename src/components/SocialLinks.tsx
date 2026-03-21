// ─── SocialLinks ──────────────────────────────────────────────────────────────
// Renders social icon links sourced from constants/socials.

import { SOCIALS } from "../constants/socials";

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-5 mb-8">
      {SOCIALS.map((s) => (
        <a
          key={s.id}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          title={s.label}
          className="social-icon w-9 h-9 flex items-center justify-center"
          style={{ "--glow-color": s.shadowColor } as React.CSSProperties}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
