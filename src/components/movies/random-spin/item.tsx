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

const MovieCard: React.FC<{ item: MovieItem }> = ({ item }) => {
  const searchParams = useSearchParams();
  return (
    <Card
      sx={{
        width: '360px',
        aspectRatio: 16 / 9,
        position: 'relative',
      }}
    >
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
            width: '360px',
            aspectRatio: 16 / 9,
            position: 'relative',
          }}
        >
          <Image
            alt={item.title}
            fill
            src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
            unoptimized
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
