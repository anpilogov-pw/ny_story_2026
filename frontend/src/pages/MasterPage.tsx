import { useEffect } from "react";
import { useGameStore } from "../lib/store";
import { connectWS, sendReset, sendUpdate } from "../lib/ws";

import { SCENES } from "../config/scenes";
import { MUSIC_TRACKS } from "../config/music";
import { CHARACTERS } from "../config/characters";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export default function MasterPage() {
  const state = useGameStore();

  useEffect(() => {
    connectWS();
  }, []);

  /** Активная кнопка (визуальный маркер) */
  const activeButtonClass =
    "!ring-2 !ring-ring !ring-offset-2 !ring-offset-background";

  return (
    <div className="dark min-h-dvh bg-primary px-3 py-4 flex justify-center">
      <Card className="w-full max-w-md sm:max-w-2xl !p-4">
        {/* ===== HEADER ===== */}
        <CardHeader className="!p-4 !pb-0">
          <CardTitle className="text-xl tracking-tight">
            🎛 Пульт мастера
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ===== SCENES ===== */}
          <section className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground !mb-2">
              Сцены
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {SCENES.map((scene) => {
                const isActive = state.scene === scene.id;

                return (
                  <Button
                    key={scene.id}
                    size="lg"
                    variant={isActive ? "default" : "outline"}
                    className={isActive ? activeButtonClass : undefined}
                    onClick={() => sendUpdate({ scene: scene.id })}
                  >
                    {scene.title}
                  </Button>
                );
              })}
            </div>
          </section>

          <div className="!py-4" />

          {/* ===== MUSIC ===== */}
          <section className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground !mb-2">
              Музыка
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <Button
                size="lg"
                variant={state.music === null ? "default" : "outline"}
                className={
                  state.music === null ? activeButtonClass : undefined
                }
                onClick={() => sendUpdate({ music: null })}
              >
                ВЫКЛ.
              </Button>

              {MUSIC_TRACKS.map((track) => {
                const isActive = state.music === track.id;

                return (
                  <Button
                    key={track.id}
                    size="lg"
                    variant={isActive ? "default" : "outline"}
                    className={isActive ? activeButtonClass : undefined}
                    onClick={() => sendUpdate({ music: track.id })}
                  >
                    {track.title}
                  </Button>
                );
              })}
            </div>
          </section>

          <div className="!py-4" />

          {/* ===== CHARACTERS ===== */}
          <section className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground !mb-2">
              Персонаж на сцене
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <Button
                size="lg"
                variant={
                  state.activeCharacter === null
                    ? "default"
                    : "outline"
                }
                className={
                  state.activeCharacter === null
                    ? activeButtonClass
                    : undefined
                }
                onClick={() =>
                  sendUpdate({ activeCharacter: null })
                }
              >
                ВЫКЛ.
              </Button>

              {CHARACTERS.map((char) => {
                const isActive =
                  state.activeCharacter === char.id;

                return (
                  <Button
                    key={char.id}
                    size="lg"
                    variant={isActive ? "default" : "outline"}
                    className={
                      isActive ? activeButtonClass : undefined
                    }
                    onClick={() =>
                      sendUpdate({ activeCharacter: char.id })
                    }
                  >
                    {char.name}
                  </Button>
                );
              })}
            </div>

            {state.activeCharacter && (
              <div className="flex justify-end">
                <Badge>
                  На сцене:{" "}
                  {
                    CHARACTERS.find(
                      (c) => c.id === state.activeCharacter
                    )?.name
                  }
                </Badge>
              </div>
            )}
          </section>

          <div className="!py-4" />

          {/* ===== CONTROLS ===== */}
          <section className="space-y-2">
            <Button
              variant="destructive"
              size="lg"
              className="w-full"
              onClick={sendReset}
            >
              Начать заново
            </Button>
          </section>

          {/* ===== DEBUG ===== */}
          <details className="text-xs text-muted-foreground !mt-4">
            <summary className="cursor-pointer select-none">
              Debug state
            </summary>
            <pre className="mt-2 bg-muted/50 !rounded !p-4">
              {JSON.stringify(state, null, 2)}
            </pre>
          </details>
        </CardContent>
      </Card>
    </div>
  );
}
