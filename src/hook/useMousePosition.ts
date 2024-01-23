import { useState, useEffect } from "react";

type Coords = {
  x: number;
  y: number;
};

const useMousePosition = (): Coords => {
  const [position, setPosition] = useState<Coords>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
};

export default useMousePosition;
