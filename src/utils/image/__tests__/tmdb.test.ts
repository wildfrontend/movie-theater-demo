import { describe, expect, it } from '@jest/globals';

import {
  tmdbBackdropLoader,
  default as tmdbLoader,
  tmdbRandomLoader,
} from '../tmdb';

describe('tmdbLoader', () => {
  it('tmdbBackdropLoader 應該回傳正確的圖片 URL', () => {
    const src = '/9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg';
    const width = 800;
    const url = tmdbBackdropLoader?.({ src, width });

    expect(url).toBe(`https://image.tmdb.org/t/p/w780${src}`);
  });

  it('tmdbRandomLoader 應該根據 width 變化回傳不同尺寸', () => {
    const src = '/9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg';

    expect(tmdbRandomLoader?.({ src, width: 1000 })).toBe(
      `https://image.tmdb.org/t/p/w300${src}`
    );

    expect(tmdbRandomLoader?.({ src, width: 1300 })).toBe(
      `https://image.tmdb.org/t/p/w400${src}`
    );
  });

  it('tmdbLoader 應該根據裝置 width 回傳適當的尺寸', () => {
    const src = '/qGnXe6idV3M35xGwkS26ztqwSdT.jpg';

    expect(tmdbLoader?.({ src, width: 1000 })).toBe(
      `https://image.tmdb.org/t/p/w200${src}`
    );

    expect(tmdbLoader?.({ src, width: 1300 })).toBe(
      `https://image.tmdb.org/t/p/w300${src}`
    );
  });

  it('應該回傳空字串如果 src 為空', () => {
    expect(tmdbLoader?.({ src: '', width: 800 })).toBe('');
  });
});
