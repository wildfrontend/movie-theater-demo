'use client';

import { Chip, Stack } from '@mui/material';


import { useMovieDetail } from '../hooks/detail';

const MovieGenres: React.FC = () => {
  const { detail } = useMovieDetail();
  return (
    <Stack direction="row" spacing="8px">
      {detail?.genres.map((genre) => (
        <Chip key={genre.id} label={genre.name} />
      ))}
    </Stack>
  );
};
export default MovieGenres;
