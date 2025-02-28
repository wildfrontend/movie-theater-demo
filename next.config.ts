import { withPigment } from '@pigment-css/nextjs-plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    TMDB_API_TOKEN:
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjY4NDBjY2YzMTg5N2EzMmE4NGJmZTFmZGZmZGQ5YSIsIm5iZiI6MTc0MDcyMTE1Ny4wNjMsInN1YiI6IjY3YzE0YzA1YWIyZDhiODFjY2M4ZWQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AZodzmTyBsp7m-kZQ9FGqoTfKDZpPRqdqcRldrlAmeM',
    TMDB_API_KEY: 'b26840ccf31897a32a84bfe1fdffdd9a',
  },
  images: {
    remotePatterns: [
      {
        hostname: 'image.tmdb.org',
      },
      {
        hostname: 'fakeimg.pl',
      }
    ],
  },
};

export default withPigment(nextConfig);
