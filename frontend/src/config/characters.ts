export type CharacterConfig = {
  id: string;
  name: string;
  image: string;
};

export const CHARACTERS: CharacterConfig[] = [
  {
    id: "guest",
    name: "Гость",
    image: "/assets/characters/guest/idle.webp",
  },
  {
    id: "housemaid",
    name: "Горничная",
    image: "/assets/characters/housemaid/idle.webp",
  },
  {
    id: "manager",
    name: "Менеджер",
    image: "/assets/characters/manager/idle.webp",
  },
  {
    id: "quartermaster",
    name: "Квартирмейстер",
    image: "/assets/characters/quartermaster/idle.webp",
  },
];
