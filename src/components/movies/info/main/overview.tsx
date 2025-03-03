import { Typography } from '@mui/material';

import { useFetchMovie } from '@/apis/movies/api';
import useMovieIdQueyParams from '@/hooks/movies/item';

const MovieOverview: React.FC = () => {
  const { movieId } = useMovieIdQueyParams();
  const { detail } = useFetchMovie(movieId);
  return <Typography variant="body1">{detail?.overview}</Typography>;
};
export default MovieOverview;
