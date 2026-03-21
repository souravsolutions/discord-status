// ─── VolumeControl ────────────────────────────────────────────────────────────
// Fixed top-left volume icon + slide-in volume slider.

import { Volume2, VolumeX } from "lucide-react";

interface VolumeControlProps {
  isMuted:            boolean;
  volume:             number;
  showVolumeSlider:   boolean;
  onMouseEnter:       () => void;
  onMouseLeave:       () => void;
  onToggleMute:       () => void;
  onVolumeChange:     (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function VolumeControl({
  isMuted,
  volume,
  showVolumeSlider,
  onMouseEnter,
  onMouseLeave,
  onToggleMute,
  onVolumeChange,
}: VolumeControlProps) {
  const isSilent = isMuted || volume === 0;

  return (
    <div
      className="fixed top-5 left-5 z-50 flex items-center opacity-30"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Mute toggle button */}
      <button
        onClick={onToggleMute}
        title={isSilent ? "Unmute" : "Mute"}
        className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-white/5 transition-all duration-300 relative z-10"
        style={{ color: "#5a5360", background: "transparent" }}
      >
        {isSilent ? <VolumeX size={28} /> : <Volume2 size={28} />}
      </button>

      {/* Volume slider panel */}
      <div
        className={[
          "absolute left-10 ml-2 bg-[#252029] border border-white/10 rounded-xl px-4 py-3",
          "shadow-2xl transition-all duration-300 origin-left flex items-center gap-3",
          showVolumeSlider
            ? "opacity-100 scale-100 visible translate-x-4"
            : "opacity-0 scale-95 invisible translate-x-0",
        ].join(" ")}
      >
        <div className="relative w-24 h-1.5 bg-[#161219] rounded-full flex outline-none">
          <div
            className="h-full rounded-full bg-[#5a5360] shadow-[0_0_10px_rgba(90,83,96,0.5)] transition-all duration-75"
            style={{ width: `${isSilent ? 0 : volume * 100}%` }}
          />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isSilent ? 0 : volume}
            onChange={onVolumeChange}
            className="absolute inset-x-0 -inset-y-2.5 w-full h-5 opacity-0 cursor-pointer appearance-none outline-none"
          />
        </div>
      </div>
    </div>
  );
}
