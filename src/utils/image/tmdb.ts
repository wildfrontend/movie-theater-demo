'use client';

import type { ImageProps } from 'next/image';

const tmdbLoader: ImageProps['loader'] = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

export default tmdbLoader;
