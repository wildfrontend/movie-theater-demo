'use client';

import type { ImageProps } from 'next/image';

const sizes = [92, 154, 185, 200, 300, 400];

const convertWidath = (width: number) => {
  const maxWidth = 400; // 根據需求設定上限
  const adjustedWidth = Math.min(width, maxWidth);
  for (let size of sizes) {
    if (size >= adjustedWidth) return size;
  }
  return 300;
};

const tmdbLoader: ImageProps['loader'] = ({ src, width, quality }) => {
  if (!src) return '';
  return `https://image.tmdb.org/t/p/w${convertWidath(width)}${src}`;
};

export default tmdbLoader;
