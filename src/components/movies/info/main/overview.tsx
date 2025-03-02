import { Typography } from '@mui/material';

import { useMovieDetail } from '.';

const MovieOverview: React.FC = () => {
  const { detail } = useMovieDetail();
  return <Typography variant="body1">{detail?.overview}</Typography>;
};
export default MovieOverview;
