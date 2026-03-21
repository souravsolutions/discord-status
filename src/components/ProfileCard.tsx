// ─── ProfileCard ───────────────────────────────────────────────────────────────
// Banner GIF card with circular PFP overlapping at the bottom center.

import pfp    from "../assets/pfp.webp";
import banner from "../assets/banner.gif";

const noContextMenu = (e: React.MouseEvent) => e.preventDefault();

export default function ProfileCard() {
  return (
    <div className="flex flex-col items-center mb-4 gap-3">
      <div className="banner-card-group">
        {/* ── GIF Banner ── */}
        <div className="banner-card opacity-50">
          <img
            src={banner}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
            onContextMenu={noContextMenu}
            style={{ pointerEvents: "none", userSelect: "none" }}
          />
          <div className="banner-overlay" />
        </div>

        {/* ── Circular PFP (overlaps bottom center of banner) ── */}
        <div className="pfp-wrapper opacity-80">
          <img
            src={pfp}
            alt="avatar"
            className="pfp-img"
            draggable={false}
            onContextMenu={noContextMenu}
            style={{ pointerEvents: "none", userSelect: "none" }}
          />
        </div>
      </div>

      {/* Name + emoji */}
      <h1 className="text-[#252029] text-2xl md:text-3xl font-semibold tracking-wider mb-2 md:mb-3 select-none text-center">
        風 Sourav
      </h1>
      <p className="text-lg select-none" style={{ color: "#5a5360" }}>
        🍬
      </p>
    </div>
  );
}
