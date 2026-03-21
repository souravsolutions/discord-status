// ─── Social Links ─────────────────────────────────────────────────────────────

import type { SocialLink } from "../types";
import { DiscordIcon, SpotifyIcon, XIcon } from "../components/icons";

export const SOCIALS: SocialLink[] = [
  {
    id:          "x",
    icon:        <XIcon />,
    href:        "https://x.com/SardarSour20331",
    label:       "X",
    glowColor:   "rgba(255,255,255,0.9)",
    shadowColor: "rgba(255,255,255,0.6)",
  },
  {
    id:          "discord",
    icon:        <DiscordIcon />,
    href:        "https://discord.com/users/1241601451440996413",
    label:       "Discord",
    glowColor:   "rgba(88,101,242,0.9)",
    shadowColor: "rgba(88,101,242,0.7)",
  },
  {
    id:          "spotify",
    icon:        <SpotifyIcon />,
    href:        "https://open.spotify.com/user/31x6u7vknsj7amvzjbj4tgovez2m?si=26431bf6250e433b",
    label:       "Spotify",
    glowColor:   "rgba(29,215,96,0.9)",
    shadowColor: "rgba(29,215,96,0.7)",
  },
];
