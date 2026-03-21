// ─── useVolume ────────────────────────────────────────────────────────────────
// Manages mute state, volume level, and the volume slider visibility.

import { useState } from "react";

export const useVolume = () => {
  const [isMuted,          setIsMuted]          = useState(false);
  const [volume,           setVolume]            = useState(0.2);
  const [showVolumeSlider, setShowVolumeSlider]  = useState(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0)       setIsMuted(true);
    else if (isMuted)    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      if (!prev && volume === 0) setVolume(0.5);
      return !prev;
    });
  };

  return {
    isMuted,
    volume,
    showVolumeSlider,
    setShowVolumeSlider,
    handleVolumeChange,
    toggleMute,
  };
};
