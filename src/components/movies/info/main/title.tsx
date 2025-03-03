import { Typography } from '@mui/material';

import { useFetchMovie } from '@/apis/movies/api';
import useMovieIdQueyParams from '@/hooks/movies/item';

const MovieTitle: React.FC = () => {
  const { movieId } = useMovieIdQueyParams();
  const { detail } = useFetchMovie(movieId);
  return (
    <Typography fontWeight="bold" gutterBottom variant="h4">
      {detail?.title}
    </Typography>
  );
};
export default MovieTitle;
