import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { MovieItem } from '@/types/apis/movies';
import { generateMovieHerf } from '@/utils/global/link';
import sizes from '@/utils/image/sizes';
import tmdbLoader from '@/utils/image/tmdb';

const defaultImg = 'https://fakeimg.pl/300x169';

const MovieCard: React.FC<{ item: MovieItem }> = ({ item }) => {
  const searchParams = useSearchParams();
  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        {...{
          href: {
            pathname: generateMovieHerf(item.id),
            search: searchParams.toString(),
          },
        }}
      >
        <CardMedia
          sx={{
            width: '100%',
            aspectRatio: 16 / 9,
            position: 'relative',
          }}
        >
          <Image
            alt={item.title}
            fill
            onError={(e) => (e.currentTarget.src = defaultImg)}
            src={item.backdrop_path ?? ''}
            sizes={sizes('30vw', '400px')}
            loader={tmdbLoader}
          />
        </CardMedia>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '8px',
            background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))', // 增加可讀性
            color: 'white',
          }}
        >
          <Typography fontWeight="bold" noWrap variant="subtitle1">
            {item.title}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};
export default MovieCard;
