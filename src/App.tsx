// ─── App ──────────────────────────────────────────────────────────────────────
// Root component — thin orchestrator, no business logic.

import { useVolume }     from "./hooks/useVolume";
import VolumeControl     from "./components/VolumeControl";
import StatusBadge       from "./components/StatusBadge";
import ProfileCard       from "./components/ProfileCard";
import SocialLinks       from "./components/SocialLinks";
import Quote             from "./components/Quote";
import MusicPlayer       from "./components/MusicPlayer";

export default function App() {
  const {
    isMuted,
    volume,
    showVolumeSlider,
    setShowVolumeSlider,
    handleVolumeChange,
    toggleMute,
  } = useVolume();

  return (
    <div className="relative min-h-screen w-full bg-[#070707] flex items-center justify-center overflow-hidden">
      {/* ── Fixed UI ── */}
      <VolumeControl
        isMuted={isMuted}
        volume={volume}
        showVolumeSlider={showVolumeSlider}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
        onToggleMute={toggleMute}
        onVolumeChange={handleVolumeChange}
      />
      <StatusBadge />

      {/* ── Main content column ── */}
      <div className="animate-fade-in relative flex flex-col items-center w-full max-w-150 px-6 gap-5 z-10">
        <ProfileCard />
        <SocialLinks />

        <div className="w-full mt-8">
          <Quote />
        </div>

        <div className="w-full">
          <MusicPlayer isMuted={isMuted} volume={volume} />
        </div>
      </div>
    </div>
  );
}
