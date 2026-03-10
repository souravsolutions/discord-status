import { DiscordIcon, SpotifyIcon, RobloxBrandIcon } from "./icons.tsx";

interface SocialLink {
  id: string;
  icon: React.ReactNode;
  href: string;
  label: string;
  glowColor: string;
  shadowColor: string; // used as --glow-color CSS var value
}

const socials: SocialLink[] = [
  {
    id: "roblox",
    icon: <RobloxBrandIcon />,
    href: "https://www.roblox.com/",
    label: "Roblox",
    glowColor: "rgba(255,255,255,0.9)",
    shadowColor: "rgba(255,255,255,0.6)",
  },
  {
    id: "discord",
    icon: <DiscordIcon />,
    href: "https://discord.com/",
    label: "Discord",
    glowColor: "rgba(88,101,242,0.9)",
    shadowColor: "rgba(88,101,242,0.7)",
  },
  {
    id: "spotify",
    icon: <SpotifyIcon />,
    href: "https://open.spotify.com/",
    label: "Spotify",
    glowColor: "rgba(29,215,96,0.9)",
    shadowColor: "rgba(29,215,96,0.7)",
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-7 mb-8">
      {socials.map((s) => (
        <a
          key={s.id}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          title={s.label}
          className="social-icon w-9 h-9 flex items-center justify-center"
          style={
            {
              "--glow-color": s.shadowColor,
            } as React.CSSProperties
          }
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
