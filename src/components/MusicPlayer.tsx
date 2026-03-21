// ─── MusicPlayer ──────────────────────────────────────────────────────────────
// Presentational player — all logic lives in useAudio hook.

import { SkipBack, SkipForward, Play, Pause } from "lucide-react";
import { useAudio, formatTime }               from "../hooks/useAudio";

interface MusicPlayerProps {
  isMuted: boolean;
  volume:  number;
}

export default function MusicPlayer({ isMuted, volume }: MusicPlayerProps) {
  const {
    audioRef,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    progress,
    setIsDragging,
    togglePlay,
    seek,
    prevTrack,
    nextTrack,
  } = useAudio({ isMuted, volume });

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-5 w-full opacity-40 transition-opacity duration-500">
      <audio ref={audioRef} src={currentSong.src} preload="auto" />

      {/* ── Album art icon ── */}
      <div
        className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shadow-lg"
        style={{ background: "#070608" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" className="w-7 h-7 md:w-9 md:h-9">
          <g id="music-note-circle--music-audio-note-circle-entertainment">
            <path
              id="Subtract"
              fill="#8b8095"
              fillRule="evenodd"
              d="M2.02145 2.02145C3.20296 0.839932 4.90797 0.25 7 0.25c2.09203 0 3.797 0.589932 4.9786 1.77145C13.1601 3.20296 13.75 4.90797 13.75 7c0 2.09203 -0.5899 3.797 -1.7714 4.9786C10.797 13.1601 9.09203 13.75 7 13.75c-2.09203 0 -3.79704 -0.5899 -4.97855 -1.7714C0.839932 10.797 0.25 9.09203 0.25 7c0 -2.09203 0.589932 -3.79704 1.77145 -4.97855Zm4.17411 1.57936c0 -0.34518 0.27982 -0.625 0.625 -0.625 0.27479 0 0.54565 0.00896 0.81165 0.02357 1.73898 0.09553 3.27239 1.50593 3.33979 3.30129 0.0044 0.11687 0.0068 0.23489 0.0068 0.35395 0 0.34517 -0.2798 0.625 -0.625 0.625s-0.62499 -0.27983 -0.62499 -0.625c0 -0.10216 -0.00208 -0.20448 -0.00593 -0.30704 -0.04115 -1.09591 -1.00927 -2.03691 -2.15923 -2.10008 -0.03929 -0.00216 -0.07857 -0.00418 -0.11785 -0.00605v4.89828l0.00005 0.01705c0 1.19512 -0.67229 1.86742 -1.86746 1.86742 -1.19517 0 -1.86745 -0.6723 -1.86745 -1.86742 0 -1.19517 0.67228 -1.86746 1.86745 -1.86746 0.2246 0 0.43073 0.02374 0.61741 0.07023v-3.7411l-0.00024 -0.01764Z"
              clipRule="evenodd"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>

      {/* ── Progress bar + timestamps ── */}
      <div className="flex items-center gap-3 md:gap-4 w-full flex-1">
        <span className="text-sm md:text-base font-medium tabular-nums flex-shrink-0 opacity-30" style={{ color: "#9a8fa5" }}>
          {formatTime(currentTime)}
        </span>

        <div className="relative flex-1 h-[3px] group">
          <div className="h-full rounded-full overflow-hidden" style={{ background: "#252029" }}>
            <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "#5a5360" }} />
          </div>
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={seek}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={()   => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={()   => setIsDragging(false)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        <span className="text-sm md:text-base font-medium tabular-nums flex-shrink-0 opacity-30" style={{ color: "#5a5360" }}>
          {formatTime(duration)}
        </span>
      </div>

      {/* ── Playback controls ── */}
      <div className="flex items-center justify-center gap-4 md:gap-5 flex-shrink-0 mt-2 md:mt-0">
        <button onClick={prevTrack} className="transition-transform duration-200 hover:scale-110 active:scale-95" style={{ color: "#5a5360" }}>
          <SkipBack size={20} className="md:w-[22px] md:h-[22px]" />
        </button>
        <button onClick={togglePlay} className="transition-transform duration-200 hover:scale-110 active:scale-95 drop-shadow-md" style={{ color: "#9a8fa5" }}>
          {isPlaying
            ? <Pause size={23} fill="currentColor" className="md:w-[25px] md:h-[25px]" />
            : <Play  size={23} fill="currentColor" className="md:w-[25px] md:h-[25px]" />}
        </button>
        <button onClick={nextTrack} className="transition-transform duration-200 hover:scale-110 active:scale-95" style={{ color: "#5a5360" }}>
          <SkipForward size={20} className="md:w-[22px] md:h-[22px]" />
        </button>
      </div>
    </div>
  );
}
