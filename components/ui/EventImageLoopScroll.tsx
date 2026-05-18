"use client";

import Image from "next/image";

const GAP_PX = 12;
const SLIDE_HEIGHT_PX = 168;

type Props = {
  images: string[];
  title: string;
  height?: number;
  onImageClick: (index: number) => void;
};

export default function EventImageLoopScroll({
  images,
  title,
  height,
  onImageClick,
}: Props) {
  const loopImages = [...images, ...images];
  const loopDistance = images.length * (SLIDE_HEIGHT_PX + GAP_PX);
  const durationSec = Math.max(images.length * 5, 12);

  return (
    <div
      className="event-image-loop relative w-full max-w-[200px] overflow-hidden rounded-[1.5rem] shadow-glow"
      style={{ height: height ?? 280 }}
    >
      <div
        className="event-image-loop-track flex flex-col"
        style={
          {
            gap: `${GAP_PX}px`,
            "--loop-distance": `${loopDistance}px`,
            "--loop-duration": `${durationSec}s`,
          } as React.CSSProperties
        }
      >
        {loopImages.map((src, i) => {
          const sourceIndex = i % images.length;
          return (
            <button
              key={`${src}-${i}`}
              type="button"
              className="relative w-full shrink-0 cursor-zoom-in overflow-hidden rounded-[1rem]"
              style={{ height: SLIDE_HEIGHT_PX }}
              aria-label={`${title} (${sourceIndex + 1})`}
              onClick={() => onImageClick(sourceIndex)}
            >
              <Image
                src={src}
                alt={`${title} (${sourceIndex + 1})`}
                fill
                className="object-cover transition duration-300 hover:scale-[1.03]"
                sizes="200px"
              />
              {sourceIndex === 0 && i === 0 && (
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent"
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/80 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/80 to-transparent"
        aria-hidden
      />
    </div>
  );
}
