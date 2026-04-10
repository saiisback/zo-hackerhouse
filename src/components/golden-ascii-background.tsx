"use client";

import { useMemo } from "react";

const CHARS = "░▒▓█▄▀■□▪▫◆◇○●◎★☆♦♠♣♥▲△▽▼◁▷◢◣◤◥╬╪╫┼┃━┗┛┏┓";

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function GoldenAsciiBackground() {
  const chars = useMemo(() => {
    const rng = seededRandom(42);
    return Array.from({ length: 600 }, () =>
      CHARS[Math.floor(rng() * CHARS.length)]
    ).join("");
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[50%] overflow-hidden pointer-events-none select-none p-4"
      aria-hidden="true"
      style={{
        zIndex: 8,
        opacity: 0.4,
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: "11px",
        lineHeight: "14px",
        color: "#c9a84c",
        wordBreak: "break-all",
      }}
    >
      {chars}
    </div>
  );
}
