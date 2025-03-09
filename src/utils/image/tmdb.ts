'use client';

import type { ImageProps } from 'next/image';

const backdropSizes = [400, 780];

const convertBackdropWidath = (width: number) => {
  const maxWidth = 780; // 根據需求設定上限
  const adjustedWidth = Math.min(width, maxWidth);
  for (let size of backdropSizes) {
    if (size >= adjustedWidth) return size;
  }
  return 400;
};

export const tmdbBackdropLoader: ImageProps['loader'] = ({
  src,
  width,
  quality,
}) => {
  if (!src) return '';
  return `https://image.tmdb.org/t/p/w${convertBackdropWidath(width)}${src}`;
};

const sizes = [92, 154, 185, 200, 300];

const convertWidath = (width: number) => {
  const maxWidth = 780; // 根據需求設定上限
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
