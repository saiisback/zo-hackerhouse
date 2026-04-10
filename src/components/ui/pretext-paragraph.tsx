"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { prepareWithSegments, layoutWithLines, type LayoutLine } from "@chenglou/pretext";

interface PretextParagraphProps {
  children: string;
  className?: string;
  font?: string;
  lineHeight?: number;
}

export function PretextParagraph({
  children,
  className = "",
  font = "300 18px Inter, sans-serif",
  lineHeight = 28,
}: PretextParagraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<LayoutLine[] | null>(null);

  const computeLines = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const width = el.clientWidth;
    if (width <= 0) return;

    const prepared = prepareWithSegments(children, font);
    const result = layoutWithLines(prepared, width, lineHeight);
    setLines(result.lines);
  }, [children, font, lineHeight]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Initial computation
    computeLines();

    const ro = new ResizeObserver(() => {
      computeLines();
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, [computeLines]);

  return (
    <div ref={containerRef} className={className}>
      {lines ? (
        <div style={{ lineHeight: `${lineHeight}px` }}>
          {lines.map((line, i) => (
            <span
              key={i}
              style={{
                display: "block",
                textAlign: i < lines.length - 1 ? "justify" : "left",
                textAlignLast: i < lines.length - 1 ? "justify" : "left",
              }}
            >
              {line.text}
            </span>
          ))}
        </div>
      ) : (
        // Fallback while measuring
        <p style={{ lineHeight: `${lineHeight}px` }}>{children}</p>
      )}
    </div>
  );
}
