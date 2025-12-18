// src/lib/useImagePreload.ts
import { useEffect, useState } from "react";

export function useImagePreload(src?: string) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    setLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return loaded;
}
