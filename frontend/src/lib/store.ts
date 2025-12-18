import { create } from "zustand";

export type GameState = {
  scene: string;
  music: string | null;
  activeCharacter: string | null;
};

type Store = GameState & {
  setFromServer: (s: GameState) => void;
};

export const useGameStore = create<Store>((set) => ({
  scene: "intro",
  music: null,
  activeCharacter: null,
  setFromServer: (s) => set(s),
}));
