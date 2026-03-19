'use client';

import Image from 'next/image';
import { useState } from 'react';

type ProductImageZoomProps = {
  src: string;
  alt: string;
};

export function ProductImageZoom({ src, alt }: ProductImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-[var(--secondary-bg)] p-5"
      onMouseEnter={() => {
        setIsZoomed(true);
      }}
      onMouseLeave={() => {
        setIsZoomed(false);
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={520}
        height={520}
        className={isZoomed ? 'h-full w-full scale-125 object-contain transition-transform duration-300' : 'h-full w-full scale-100 object-contain transition-transform duration-300'}
        priority
      />
    </div>
  );
}
