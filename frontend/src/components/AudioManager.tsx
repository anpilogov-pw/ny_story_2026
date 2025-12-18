import { useEffect, useRef, useState } from "react";
import { useGameStore } from "../lib/store";
import { MUSIC_TRACKS } from "../config/music";

export function AudioManager() {
  const { music } = useGameStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  // Инициализация аудио
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.8;
    }
  }, []);

  // Реакция на смену трека
  useEffect(() => {
    if (!enabled || !audioRef.current) return;

    if (!music) {
      audioRef.current.pause();
      return;
    }

    const track = MUSIC_TRACKS.find((t) => t.id === music);
    if (!track) return;

    audioRef.current.src = track.src;
    audioRef.current.play().catch(() => {
      // autoplay still blocked (на всякий случай)
    });
  }, [music, enabled]);

  if (enabled) return null;

  // Кнопка разрешения звука
  return (
    <button
      onClick={() => {
        setEnabled(true);
        audioRef.current?.play().catch(() => {});
      }}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        padding: "12px 16px",
        fontSize: 16,
        zIndex: 9999,
      }}
    >
      🔊 Включить звук
    </button>
  );
}
