"use client";

import { useEffect, useRef, useCallback, useState } from "react";

// Characters ordered by perceived brightness (dark → light)
const ASCII_CHARS_PROPORTIONAL = " .·:;+*%#@█";
const ASCII_CHARS_MONO = " .,:-=+*#%@";

interface AsciiEffectProps {
  videoSrc: string;
  className?: string;
  cols?: number;
  fontFamily?: "mono" | "proportional";
  colorMode?: "mono-green" | "mono-white" | "warm" | "tinted";
  opacity?: number;
  fontSize?: number;
}

export function AsciiEffect({
  videoSrc,
  className = "",
  cols = 120,
  fontFamily = "mono",
  colorMode = "mono-white",
  opacity = 0.6,
  fontSize = 10,
}: AsciiEffectProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outputRef = useRef<HTMLPreElement>(null);
  const animFrameRef = useRef<number>(0);
  const [isReady, setIsReady] = useState(false);
  const [effectiveCols, setEffectiveCols] = useState(cols);

  // Responsive column count
  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 768) {
        setEffectiveCols(Math.floor(cols * 0.5));
      } else if (window.innerWidth < 1024) {
        setEffectiveCols(Math.floor(cols * 0.75));
      } else {
        setEffectiveCols(cols);
      }
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, [cols]);

  const chars =
    fontFamily === "mono" ? ASCII_CHARS_MONO : ASCII_CHARS_PROPORTIONAL;

  const getColor = useCallback(
    (brightness: number, r: number, g: number, b: number) => {
      const alpha = 0.3 + (brightness / 255) * 0.7;
      switch (colorMode) {
        case "mono-green":
          return `rgba(0,${Math.floor(180 + (brightness / 255) * 75)},${Math.floor(brightness * 0.2)},${alpha})`;
        case "warm":
          return `rgba(${Math.floor(196 * (brightness / 255))},${Math.floor(163 * (brightness / 255))},${Math.floor(90 * (brightness / 255))},${alpha})`;
        case "tinted":
          return `rgba(${r},${g},${b},${alpha})`;
        case "mono-white":
        default:
          return `rgba(255,255,255,${alpha})`;
      }
    },
    [colorMode]
  );

  const renderFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const output = outputRef.current;

    if (!video || !canvas || !output || video.paused || video.ended) {
      animFrameRef.current = requestAnimationFrame(renderFrame);
      return;
    }

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const aspectRatio = video.videoHeight / video.videoWidth;
    // Character aspect ratio compensation (chars are ~2x taller than wide)
    const charAspect = 0.55;
    const rows = Math.floor(effectiveCols * aspectRatio * charAspect);

    canvas.width = effectiveCols;
    canvas.height = rows;

    ctx.drawImage(video, 0, 0, effectiveCols, rows);
    const imageData = ctx.getImageData(0, 0, effectiveCols, rows);
    const pixels = imageData.data;

    let html = "";

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < effectiveCols; x++) {
        const idx = (y * effectiveCols + x) * 4;
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];

        // Perceived brightness (luminance formula)
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

        const charIndex = Math.floor(
          (brightness / 255) * (chars.length - 1)
        );
        const char = chars[charIndex] === " " ? "&nbsp;" : chars[charIndex];
        const color = getColor(brightness, r, g, b);

        html += `<span style="color:${color}">${char}</span>`;
      }
      html += "\n";
    }

    output.innerHTML = html;
    animFrameRef.current = requestAnimationFrame(renderFrame);
  }, [effectiveCols, chars, getColor]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsReady(true);
      video.play().catch(() => {});
    };

    video.addEventListener("canplay", handleCanPlay);
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    animFrameRef.current = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isReady, renderFrame]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-0 h-0 opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <canvas ref={canvasRef} className="hidden" />
      <pre
        ref={outputRef}
        className="absolute inset-0 w-full h-full overflow-hidden leading-none select-none pointer-events-none"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: `${fontSize}px`,
          fontFamily:
            fontFamily === "mono"
              ? '"Courier New", Courier, monospace'
              : "Georgia, serif",
          letterSpacing: fontFamily === "mono" ? "0px" : "-0.5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          whiteSpace: "pre",
        }}
      />
      {/* Gradient overlays for blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 pointer-events-none" />
    </div>
  );
}
