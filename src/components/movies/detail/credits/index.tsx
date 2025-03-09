'use client';

import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import { useMovieCredits } from '../hooks/detail';
import MovieCreditsSkeleton from './skeleton';
import { ScrollBox } from './styles';

const defaultImg = 'https://fakeimg.pl/138x175';
const MovieCredits: React.FC = () => {
  const { cast, isFetching } = useMovieCredits();

  if (isFetching) {
    return <MovieCreditsSkeleton />;
  }
  if ((cast?.length ?? 0) === 0) {
    return (
      <Stack>
        <Typography variant="body1">什麼!! 竟然沒有演員?</Typography>
      </Stack>
    );
  }
  return (
    <ScrollBox>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          width: 'max-content',
          paddingBottom: '8px',
        }}
      >
        {cast?.map((item) => {
          return (
            <Card key={item.cast_id} sx={{ width: '138px' }}>
              <CardMedia sx={{ width: '138px', height: '175px' }}>
                <Image
                  alt={item.name}
                  height={175}
                  src={
                    item.profile_path
                      ? `https://media.themoviedb.org/t/p/w138_and_h175_face${item.profile_path}`
                      : defaultImg
                  }
                  unoptimized
                  width={138}
                />
              </CardMedia>
              <CardContent
                sx={{
                  padding: '4px',
                  paddingBottom: '4px!important',
                  whiteSpace: 'initial',
                }}
              >
                <Typography variant="caption">{item.name}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </ScrollBox>
  );
};

export default MovieCredits;
