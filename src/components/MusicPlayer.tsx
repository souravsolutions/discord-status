import { useEffect, useRef, useState, useCallback } from "react";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";

interface MusicPlayerProps {
  src: string;
  isMuted: boolean;
  volume: number;
}

const formatTime = (s: number) => {
  if (!isFinite(s) || isNaN(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const MusicPlayer = ({ src, isMuted, volume }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = isMuted;
  }, [isMuted, volume]);

  const [hasInteracted, setHasInteracted] = useState(false);

  // Global interaction listener to play and unmute
  useEffect(() => {
    if (hasInteracted) return;

    const handleInteraction = () => {
      const audio = audioRef.current;
      if (audio) {
        // Enforce low initial volume
        audio.volume = 0.3; 
        audio.muted = false;

        // Play the audio if not already playing
        if (audio.paused) {
          audio.play().catch(console.error);
          setIsPlaying(true);
        }
      }
      setHasInteracted(true);
    };

    // Use capture phase to ensure we catch the very first event before anything else stops propagation
    const options = { once: true, capture: true };
    
    window.addEventListener("click", handleInteraction, options);
    window.addEventListener("touchstart", handleInteraction, options);
    window.addEventListener("keydown", handleInteraction, options);
    window.addEventListener("mousedown", handleInteraction, options);

    return () => {
      window.removeEventListener("click", handleInteraction, options);
      window.removeEventListener("touchstart", handleInteraction, options);
      window.removeEventListener("keydown", handleInteraction, options);
      window.removeEventListener("mousedown", handleInteraction, options);
    };
  }, [hasInteracted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => {
      if (!isDragging) setCurrentTime(audio.currentTime);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [isDragging]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, [isPlaying]);

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const val = parseFloat(e.target.value);
    audio.currentTime = val;
    setCurrentTime(val);
  };

  const rewind = () => {
    const a = audioRef.current;
    if (a) a.currentTime = Math.max(0, a.currentTime - 5);
  };
  const forward = () => {
    const a = audioRef.current;
    if (a) a.currentTime = Math.min(duration, a.currentTime + 5);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-5 w-full opacity-40 transition-opacity duration-500">
      <audio ref={audioRef} src={src} preload="auto" />

      {/* Album art - Enlarged */}
      <div
        className="flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center shadow-lg"
        style={{ background: "#070608" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
          className="w-9 h-9"
        >
          <g id="music-note-circle--music-audio-note-circle-entertainment">
            <path
              id="Subtract"
              fill="#8b8095"
              fillRule="evenodd"
              d="M2.02145 2.02145C3.20296 0.839932 4.90797 0.25 7 0.25c2.09203 0 3.797 0.589932 4.9786 1.77145C13.1601 3.20296 13.75 4.90797 13.75 7c0 2.09203 -0.5899 3.797 -1.7714 4.9786C10.797 13.1601 9.09203 13.75 7 13.75c-2.09203 0 -3.79704 -0.5899 -4.97855 -1.7714C0.839932 10.797 0.25 9.09203 0.25 7c0 -2.09203 0.589932 -3.79704 1.77145 -4.97855Zm4.17411 1.57936c0 -0.34518 0.27982 -0.625 0.625 -0.625 0.27479 0 0.54565 0.00896 0.81165 0.02357 1.73898 0.09553 3.27239 1.50593 3.33979 3.30129 0.0044 0.11687 0.0068 0.23489 0.0068 0.35395 0 0.34517 -0.2798 0.625 -0.625 0.625s-0.62499 -0.27983 -0.62499 -0.625c0 -0.10216 -0.00208 -0.20448 -0.00593 -0.30704 -0.04115 -1.09591 -1.00927 -2.03691 -2.15923 -2.10008 -0.03929 -0.00216 -0.07857 -0.00418 -0.11785 -0.00605v4.89828l0.00005 0.01705c0 1.19512 -0.67229 1.86742 -1.86746 1.86742 -1.19517 0 -1.86745 -0.6723 -1.86745 -1.86742 0 -1.19517 0.67228 -1.86746 1.86745 -1.86746 0.2246 0 0.43073 0.02374 0.61741 0.07023v-3.7411l-0.00024 -0.01764Z"
              clipRule="evenodd"
              strokeWidth="1"
            ></path>
          </g>
        </svg>
      </div>

      {/* Time elapsed - enlarged to text-base */}
      <span
        className="text-base font-medium tabular-nums flex-shrink-0"
        style={{ color: "#9a8fa5" }}
      >
        {formatTime(currentTime)}
      </span>

      {/* Progress bar */}
      <div className="relative flex-1 h-[3px] group">
        <div
          className="h-full rounded-full overflow-hidden"
          style={{ background: "#252029" }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, background: "#5a5360" }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onChange={seek}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Duration - enlarged to text-base */}
      <span
        className="text-base font-medium tabular-nums flex-shrink-0"
        style={{ color: "#5a5360" }}
      >
        {formatTime(duration)}
      </span>

      {/* Controls - enlarged icons and gap */}
      <div className="flex items-center gap-5 flex-shrink-0">
        <button
          onClick={rewind}
          className="transition-transform duration-200 hover:scale-110 active:scale-95"
          style={{ color: "#5a5360" }}
        >
          <SkipBack size={22} />
        </button>
        <button
          onClick={togglePlay}
          className="transition-transform duration-200 hover:scale-110 active:scale-95 drop-shadow-md"
          style={{ color: "#9a8fa5" }}
        >
          {isPlaying ? (
            <Pause size={25} fill="currentColor" />
          ) : (
            <Play size={25} fill="currentColor" />
          )}
        </button>
        <button
          onClick={forward}
          className="transition-transform duration-200 hover:scale-110 active:scale-95"
          style={{ color: "#5a5360" }}
        >
          <SkipForward size={22} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
