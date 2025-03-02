import { Box } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

import { useMovieDetail } from '.';

const defaultImg = 'https://fakeimg.pl/400x225?text=Oops';

const MovieHeadline: React.FC = () => {
  const { detail } = useMovieDetail();
  const [imageError, setImageError] = useState(false);
  return (
    <Box sx={{ aspectRatio: '780 / 439', position: 'relative' }}>
      <Image
        alt={detail?.title ?? 'noalt'}
        fill
        loading="eager"
        onError={(e) => {
          setImageError(true);
        }}
        src={
          imageError || !detail?.backdrop_path
            ? defaultImg
            : `https://image.tmdb.org/t/p/w780${detail?.backdrop_path}`
        }
        style={{ objectFit: 'cover' }}
        unoptimized
      />
    </Box>
  );
};

export default MovieHeadline;
