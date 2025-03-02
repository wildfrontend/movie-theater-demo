import { Container, Stack, Typography } from '@mui/material';

import PopularMovies from './list';

const ResultsEmpty: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Stack pt="32px" spacing="16px">
        <Typography fontWeight="bold" variant="h2">
          時下熱門電影
        </Typography>
        <PopularMovies />
      </Stack>
    </Container>
  );
};

export default ResultsEmpty;
