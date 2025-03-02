import { Typography } from '@mui/material';

import { useMovieDetail } from '.';

const MovieTitle: React.FC = () => {
  const { detail } = useMovieDetail();
  return (
    <Typography fontWeight="bold" gutterBottom variant="h4">
      {detail?.title}
    </Typography>
  );
};
export default MovieTitle;
