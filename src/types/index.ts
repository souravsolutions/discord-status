// ─── Shared TypeScript Types ─────────────────────────────────────────────────

export interface Song {
  src: string;
  title: string;
}

export interface SocialLink {
  id: string;
  icon: React.ReactNode;
  href: string;
  label: string;
  glowColor: string;
  shadowColor: string;
}
