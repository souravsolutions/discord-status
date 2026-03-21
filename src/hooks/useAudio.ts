// ─── useAudio ─────────────────────────────────────────────────────────────────
// Manages audio playback, track switching, seeking, and time tracking.

import { useRef, useState, useEffect, useCallback } from "react";
import { SONGS } from "../constants/songs";

export const formatTime = (s: number): string => {
  if (!isFinite(s) || isNaN(s) || s < 0) return "0:00";
  const m   = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

interface UseAudioOptions {
  isMuted: boolean;
  volume:  number;
}

export const useAudio = ({ isMuted, volume }: UseAudioOptions) => {
  const audioRef    = useRef<HTMLAudioElement>(null);
  const [trackIndex,    setTrackIndex]    = useState(0);
  const [isPlaying,     setIsPlaying]     = useState(false);
  const [currentTime,   setCurrentTime]   = useState(0);
  const [duration,      setDuration]      = useState(0);
  const [isDragging,    setIsDragging]    = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const currentSong = SONGS[trackIndex];

  // ── Sync mute & volume ────────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted  = isMuted;
  }, [isMuted, volume]);

  // ── Auto-play on first user interaction ──────────────────────────────────
  useEffect(() => {
    if (hasInteracted) return;
    const handleInteraction = () => {
      const audio = audioRef.current;
      if (audio) {
        audio.volume = volume;
        audio.muted  = false;
        if (audio.paused) {
          audio.play().catch(console.error);
          setIsPlaying(true);
        }
      }
      setHasInteracted(true);
    };
    const opts = { once: true, capture: true } as const;
    window.addEventListener("click",      handleInteraction, opts);
    window.addEventListener("touchstart", handleInteraction, opts);
    window.addEventListener("keydown",    handleInteraction, opts);
    window.addEventListener("mousedown",  handleInteraction, opts);
    return () => {
      window.removeEventListener("click",      handleInteraction, opts);
      window.removeEventListener("touchstart", handleInteraction, opts);
      window.removeEventListener("keydown",    handleInteraction, opts);
      window.removeEventListener("mousedown",  handleInteraction, opts);
    };
  }, [hasInteracted, volume]);

  // ── Audio event listeners ─────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate      = () => { if (!isDragging) setCurrentTime(audio.currentTime); };
    const onLoadedMetadata  = () => setDuration(audio.duration);
    const onEnded           = () => setTrackIndex((i) => (i + 1) % SONGS.length);
    audio.addEventListener("timeupdate",     onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended",          onEnded);
    return () => {
      audio.removeEventListener("timeupdate",     onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended",          onEnded);
    };
  }, [isDragging]);

  // ── Load new track when trackIndex changes ────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const wasPlaying = isPlaying;
    audio.pause();
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    if (wasPlaying) audio.play().catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  // ── Controls ──────────────────────────────────────────────────────────────
  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try { await audio.play(); setIsPlaying(true); }
      catch (e) { console.error(e); }
    }
  }, [isPlaying]);

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const val = parseFloat(e.target.value);
    audio.currentTime = val;
    setCurrentTime(val);
  };

  const prevTrack = () => { setTrackIndex((i) => (i - 1 + SONGS.length) % SONGS.length); setIsPlaying(true); };
  const nextTrack = () => { setTrackIndex((i) => (i + 1)                 % SONGS.length); setIsPlaying(true); };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return {
    audioRef,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    progress,
    isDragging,
    setIsDragging,
    togglePlay,
    seek,
    prevTrack,
    nextTrack,
  };
};
