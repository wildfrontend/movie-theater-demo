import { Box } from '@mui/material';

import type { SearchMovieItem } from '@/types/apis/movies';

import DesktopMovieListItem from './desktop';
import MobileMovieListItem from './mobile';

const MovieListItem: React.FC<{
  movie: SearchMovieItem;
  listCount: number;
}> = ({ movie, listCount }) => {
  return (
    <>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <DesktopMovieListItem listCount={listCount} movie={movie} />
      </Box>
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <MobileMovieListItem listCount={listCount} movie={movie} />
      </Box>
    </>
  );
};

export default MovieListItem;
