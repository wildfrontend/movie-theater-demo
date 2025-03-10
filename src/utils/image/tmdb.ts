'use client';

import type { ImageProps } from 'next/image';

// 定義不同類型圖片的可用尺寸
const imageSizes = {
  backdrop: [400, 780],
  random: [300, 400],
  default: [185, 200, 300, 400],
};

const convertWidth = (width: number, type: keyof typeof imageSizes) => {
  const sizes = imageSizes[type];

  const maxWidthMap = {
    backdrop: 780,
    random: width < 1200 ? 300 : 400,
    default: width < 1200 ? 200 : 300,
  };

  const maxWidth = maxWidthMap[type] ?? maxWidthMap.default;
  const adjustedWidth = Math.min(width, maxWidth);

  return sizes.find((size) => size >= adjustedWidth) ?? sizes[sizes.length - 1];
};

// 通用 TMDB Loader
const createTmdbLoader = (type: keyof typeof imageSizes) => {
  return ({ src, width }: { src: string; width: number }) => {
    if (!src) return '';
    return `https://image.tmdb.org/t/p/w${convertWidth(width, type)}${src}`;
  };
};

// 分別導出不同類型的 Loader
export const tmdbBackdropLoader: ImageProps['loader'] =
  createTmdbLoader('backdrop');
export const tmdbRandomLoader: ImageProps['loader'] =
  createTmdbLoader('random');
const tmdbLoader: ImageProps['loader'] = createTmdbLoader('default');

export default tmdbLoader;
