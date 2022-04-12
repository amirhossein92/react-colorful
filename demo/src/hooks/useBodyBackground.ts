import { useEffect } from "react";

export const useBodyBackground = (color: string): void => {
  useEffect(() => {
    document.body.style.background = color;
  }, [color]);
};
