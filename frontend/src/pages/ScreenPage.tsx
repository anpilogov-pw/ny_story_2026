import { useEffect, useState } from "react";
import { useGameStore } from "../lib/store";
import { connectWS } from "../lib/ws";

import { SCENES } from "../config/scenes";
import { CHARACTERS } from "../config/characters";
import { AudioManager } from "@/components/AudioManager";
import { preloadImages } from "@/lib/preloadImages";

type SceneConfig = {
  id: string;
  title: string;
  background: string;
};

type CharacterConfig = {
  id: string;
  name: string;
  image: string;
};

const CHAR_FADE_DURATION = 300; // ms

export default function ScreenPage() {
  const { scene, activeCharacter } = useGameStore();

  useEffect(() => {
    connectWS();

    preloadImages([
      ...SCENES.map((s) => s.background),
      ...CHARACTERS.map((c) => c.image),
    ]);
  }, []);

  /* ===== CONFIGS ===== */
  const sceneConfig = SCENES.find((s) => s.id === scene)!;

  const nextCharacter: CharacterConfig | null =
    CHARACTERS.find((c) => c.id === activeCharacter) ?? null;

  /* ===== PAGE TITLE ===== */
  useEffect(() => {
    if (!sceneConfig) return;
    document.title = sceneConfig.title;
  }, [sceneConfig]);

  /* ===== SCENE DOUBLE BUFFER ===== */
  const [sceneA, setSceneA] = useState<SceneConfig>(sceneConfig);
  const [sceneB, setSceneB] = useState<SceneConfig>(sceneConfig);
  const [showA, setShowA] = useState(true);

  useEffect(() => {
    if (sceneConfig.id === sceneA.id) return;

    if (showA) {
      setSceneB(sceneConfig);
    } else {
      setSceneA(sceneConfig);
    }

    requestAnimationFrame(() => {
      setShowA((v) => !v);
    });
  }, [sceneConfig]);

  /* ===== CHARACTER FADE ===== */
  const [visibleChar, setVisibleChar] =
    useState<CharacterConfig | null>(nextCharacter);
  const [charOpacity, setCharOpacity] = useState(
    nextCharacter ? 1 : 0
  );

  useEffect(() => {
    if (nextCharacter?.id === visibleChar?.id) return;

    setCharOpacity(0);

    const t = setTimeout(() => {
      setVisibleChar(nextCharacter);
      setCharOpacity(nextCharacter ? 1 : 0);
    }, CHAR_FADE_DURATION);

    return () => clearTimeout(t);
  }, [nextCharacter]);

  return (
    <>
      <AudioManager />

      <div
        style={{
          width: "100dvw",
          height: "100dvh",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        {/* ===== SCENE LAYERS ===== */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${sceneA.background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: showA ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${sceneB.background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: showA ? 0 : 1,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* ===== CHARACTER ===== */}
        {visibleChar && (
          <img
            key={visibleChar.id}
            src={visibleChar.image}
            alt={visibleChar.name}
            style={{
              position: "fixed",
              bottom: 0,
              right: "10%",
              maxHeight: "90%",
              pointerEvents: "none",
              opacity: charOpacity,
              transition: `opacity ${CHAR_FADE_DURATION}ms ease`,
            }}
          />
        )}
      </div>
    </>
  );
}
