"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const ASCII_CHARS = " .,:-=+*#%@";

interface AsciiImageOverlayProps {
  imageSrc: string;
  className?: string;
  cols?: number;
  fontSize?: number;
}

export function AsciiImageOverlay({
  imageSrc,
  className = "",
  cols = 80,
  fontSize = 8,
}: AsciiImageOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outputRef = useRef<HTMLPreElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const output = outputRef.current;
    const container = containerRef.current;
    if (!canvas || !output || !container) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const aspectRatio = img.naturalHeight / img.naturalWidth;
      const charAspect = 0.55;
      const rows = Math.floor(cols * aspectRatio * charAspect);

      canvas.width = cols;
      canvas.height = rows;

      ctx.drawImage(img, 0, 0, cols, rows);
      const imageData = ctx.getImageData(0, 0, cols, rows);
      const pixels = imageData.data;

      let html = "";

      for (let y = 0; y < rows; y++) {
        // Fade: top rows are transparent, bottom rows are fully visible
        const rowAlpha = Math.max(0, (y / rows - 0.3) / 0.7);

        for (let x = 0; x < cols; x++) {
          const idx = (y * cols + x) * 4;
          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];

          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
          const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
          const char = ASCII_CHARS[charIndex] === " " ? "&nbsp;" : ASCII_CHARS[charIndex];

          const alpha = rowAlpha * (0.3 + (brightness / 255) * 0.7);
          html += `<span style="color:rgba(255,255,255,${alpha})">${char}</span>`;
        }
        html += "\n";
      }

      output.innerHTML = html;
      setReady(true);
    };
    img.src = imageSrc;
  }, [imageSrc, cols]);

  useEffect(() => {
    render();
  }, [render]);

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="hidden" />
      <pre
        ref={outputRef}
        className="absolute inset-0 w-full h-full overflow-hidden leading-none select-none"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: `${fontSize}px`,
          fontFamily: '"Courier New", Courier, monospace',
          letterSpacing: "0px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          textAlign: "center",
          whiteSpace: "pre",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
    </div>
  );
}
