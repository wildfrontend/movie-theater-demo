import { Chip, Stack } from '@mui/material';

import { useFetchMovie } from '@/apis/movies/api';
import useMovieIdQueyParams from '@/hooks/movies/item';

const MovieGenres: React.FC = () => {
  const { movieId } = useMovieIdQueyParams();
  const { detail } = useFetchMovie(movieId);
  return (
    <Stack direction="row" spacing="8px">
      {detail?.genres.map((genre) => (
        <Chip key={genre.id} label={genre.name} />
      ))}
    </Stack>
  );
};
export default MovieGenres;
