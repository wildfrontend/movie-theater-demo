import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';

import type { SearchMovieItem } from '@/types/apis/movies';

const defaultImg = 'https://fakeimg.pl/200x284/?text=Oops';

const MovieListItem: React.FC<{ movie: SearchMovieItem }> = ({ movie }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
      }}
    >
      <CardMedia>
        <Image
          width={200}
          height={284}
          onError={(e) => {
            e.currentTarget.src = defaultImg;
          }}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
        />
      </CardMedia>
      <CardContent></CardContent>
    </Card>
  );
};

export default MovieListItem;
