'use client';

import React from 'react';

import { useFetchNowPlayingMovies } from '@/apis/movies';

const NowPlayingMovies: React.FC = () => {
  const {} = useFetchNowPlayingMovies();
  return <></>;
};

export default NowPlayingMovies;
