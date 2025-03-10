'use client';

import { Box, Skeleton, Stack } from '@mui/material';
import Image from 'next/image';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import { useFetchMovieVideos } from '@/apis/movies/api';
import sizes from '@/utils/image/sizes';
import { tmdbBackdropLoader } from '@/utils/image/tmdb';

import { useMovieDetail } from '../hooks/detail';
import AddWatchlist from './add-watchlist';

const defaultImg = 'https://fakeimg.pl/774x435?text=Oops';

const MovieBackdrop: React.FC<{ alt?: string; url?: string | null }> = ({
  alt,
  url,
}) => {
  return (
    <Image
      alt={alt ?? 'noalt'}
      fill
      loader={tmdbBackdropLoader}
      loading="eager"
      onError={(e) => {
        e.currentTarget.src = defaultImg;
      }}
      sizes={sizes('60vw', '780px')}
      src={url ?? ''}
      style={{ objectFit: 'cover' }}
    />
  );
};

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
        <LiteYouTubeEmbed
          id={trailer?.key}
          poster="hqdefault"
          title={trailer?.name}
        />
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
