export type SceneConfig = {
  id: string;
  title: string;
  background: string;
  ambient?: string;
};

export const SCENES: SceneConfig[] = [
  {
    id: "intro",
    title: "Вступление",
    background:
      "/assets/scenes/intro/file_000000004f0c720889adfce013370c20.webp",
  },
  {
    id: "hall",
    title: "Холл",
    background: "/assets/scenes/hall/bg.webp",
  },
  {
    id: "hall-2",
    title: "Холл - упала ель",
    background: "/assets/scenes/hall/bg-2.webp",
  },
  {
    id: "hallway",
    title: "Коридор",
    background: "/assets/scenes/hallway/bg.webp",
  },
  {
    id: "room",
    title: "Номер",
    background: "/assets/scenes/room/bg.webp",
  },
  {
    id: "radio",
    title: "Радиоузел",
    background: "/assets/scenes/radio/bg.webp",
  },
  {
    id: "old",
    title: "Старое помещение",
    background: "/assets/scenes/old/bg.webp",
  },
  {
    id: "outdoors",
    title: "На улице",
    background: "/assets/scenes/outdoors/bg.webp",
  },
  {
    id: "refectory",
    title: "Столовая",
    background: "/assets/scenes/refectory/bg.webp",
  },
  {
    id: "storegroom",
    title: "Кладовая",
    background: "/assets/scenes/storegroom/bg.webp",
  },
  {
    id: "window",
    title: "У окна",
    background:
      "/assets/scenes/window/file_00000000b68071f5852877968e43cd51.webp",
  },
];
