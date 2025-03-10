'use client';

import { Box, Skeleton, Stack } from '@mui/material';
import dynamic from 'next/dynamic';

import { useFetchMovieVideos } from '@/apis/movies/api';

import { useMovieDetail } from '../hooks/detail';
import AddWatchlist from './add-watchlist';

// 動態導入 YouTubeEmbed 和 MovieBackdrop
const YouTubeEmbed = dynamic(() => import('./youtube-embed'), {
  ssr: false,
  loading: () => {
    return <Skeleton sx={{ aspectRatio: '780 / 439', transform: 'initial' }} />;
  },
});
const MovieBackdrop = dynamic(() => import('./backdrop'), {
  loading: () => {
    return <Skeleton sx={{ aspectRatio: '780 / 439', transform: 'initial' }} />;
  },
});

const MovieHeadline: React.FC = () => {
  const { detail, movieId, isFetching } = useMovieDetail();

  const { trailer, isFetching: isTrailerFetching } =
    useFetchMovieVideos(movieId);

  if (isFetching || isTrailerFetching) {
    return <Skeleton sx={{ aspectRatio: '780 / 439', transform: 'initial' }} />;
  }

  return (
    <Box sx={{ aspectRatio: '780 / 439', position: 'relative' }}>
      {trailer ? (
        <YouTubeEmbed title={trailer?.name} youtubeId={trailer?.key} />
      ) : (
        <MovieBackdrop alt={detail?.title} url={detail?.backdrop_path} />
      )}
      <Stack
        direction="row"
        justifyContent="end"
        p="16px"
        spacing="8px"
        sx={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          width: '100%',
        }}
      >
        <AddWatchlist />
      </Stack>
    </Box>
  );
};

export default MovieHeadline;
