'use client';

import type { ImageProps } from 'next/image';

const posterSizes = [92, 154, 185, 200, 300];

const convertWidath = (width: number) => {
  const maxWidth = 780; // 根據需求設定上限
  const adjustedWidth = Math.min(width, maxWidth);
  for (let size of posterSizes) {
    if (size >= adjustedWidth) return size;
  }
  return 300;
};

export const tmdbPosterLoader: ImageProps['loader'] = ({
  src,
  width,
  quality,
}) => {
  if (!src) return '';
  return `https://image.tmdb.org/t/p/w${convertWidath(width)}${src}`;
};
