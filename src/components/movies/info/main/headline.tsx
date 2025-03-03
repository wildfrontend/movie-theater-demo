import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Button, Stack } from '@mui/material';
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
      <Stack
        sx={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          width: '100%',
          height: '48px',
        }}
        spacing="8px"
        direction="row"
        padding="8px"
      >
        <Button startIcon={<PlayArrowIcon />} size="small" variant="contained" color="primary">
          播放預告片
        </Button>
        <Button
          startIcon={<BookmarkBorderIcon />}
          size="small"
          variant="outlined"
        >
          加入收藏
        </Button>
      </Stack>
    </Box>
  );
};

export default MovieHeadline;
