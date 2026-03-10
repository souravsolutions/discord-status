import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import VisitorCounter from "./components/VisitorCounter";
import MusicPlayer from "./components/MusicPlayer";
import SocialLinks from "./components/SocialLinks";
import StatusBadge from "./components/StatusBadge";
import pfp from "./assets/pfp.png";

/* ─── Config ─────────────────────────────────────────────────────────────── */

const SONG_SRC = "/music.mp3";

function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5); // Start at 50% volume
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted && volume === 0) {
      setVolume(0.5);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#070707] flex items-center justify-center overflow-hidden">
      {/* Background ambient glow orbs */}

      {/* Mute/Volume Control – top left */}
      <div
        className="fixed top-5 left-5 z-50 flex items-center opacity-30"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <button
          onClick={toggleMute}
          title={isMuted || volume === 0 ? "Unmute" : "Mute"}
          className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-white/5 transition-all duration-300 relative z-10"
          style={{ color: "#5a5360", background: "transparent" }}
        >
          {isMuted || volume === 0 ? (
            <VolumeX size={28} />
          ) : (
            <Volume2 size={28} />
          )}
        </button>

        {/* Hover Volume Slider - Opens to the right */}
        <div
          className={`absolute left-10 ml-2 bg-[#252029] border border-white/10 rounded-xl px-4 py-3 shadow-2xl transition-all duration-300 origin-left flex items-center gap-3
            ${showVolumeSlider ? "opacity-100 scale-100 visible translate-x-4" : "opacity-0 scale-95 invisible translate-x-0"}`}
        >
          <div className="relative w-24 h-1.5 bg-[#161219] rounded-full flex outline-none">
            <div
              className="h-full rounded-full bg-[#5a5360] shadow-[0_0_10px_rgba(90,83,96,0.5)] transition-all duration-75"
              style={{ width: `${isMuted ? 0 : volume * 100}%` }}
            />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="absolute inset-x-0 inset-y-[-10px] w-full h-[20px] opacity-0 cursor-pointer appearance-none outline-none"
            />
          </div>
        </div>
      </div>
      {/* ── Bottom-right status badge using images ──────────────── */}
      <StatusBadge />
      {/* Centered layout */}
      <div className="animate-fade-in relative flex flex-col items-center w-full max-w-[600px] px-6 gap-3 z-10">
        {/* ── Profile section ─────────────────────────────────── */}
        <div className="flex flex-col items-center mb-9 gap-3">
          {/* Avatar */}
          <div className="relative mb-6">
            {/* Avatar ring glows green when online */}
            <div
              className={`w-32 h-32 rounded-full overflow-hidden select-none
                ring-2 transition-all duration-300`}
            >
              <img
                src={pfp}
                alt="avatar"
                className="w-full h-full object-cover brightness-90"
              />
            </div>
          </div>

          {/* Username */}
          <h1 className="text-[#252029] text-3xl font-semibold tracking-wider mb-3 select-none">
            風 Sourav
          </h1>

          {/* Status */}
          <p className="text-lg select-none" style={{ color: "#5a5360" }}>
            🍬
          </p>
        </div>

        {/* ── Social icons ─── */}
        <SocialLinks />

        {/* ── Visitor counter ──────────────────────────────────── */}
        <div className="mb-10">
          <VisitorCounter />
        </div>

        {/* ── Music player — flat strip, no border ─────────────── */}
        <div className="w-full">
          <MusicPlayer src={SONG_SRC} isMuted={isMuted} volume={volume} />
        </div>
      </div>
    </div>
  );
}

export default App;
