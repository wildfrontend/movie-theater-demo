import { Container, Grid2, Skeleton, Stack } from '@mui/material';
import React from 'react';

import { MovieItemSkeleton } from '../list/skeleton';

const ResultsSkeleton: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Stack pt="32px" spacing="16px">
        <Skeleton
          sx={{
            height: {
              xs: '46px',
              md: '60px',
              lg: '64px',
            },
          }}
          variant="rounded"
          width="100%"
        />
        <Skeleton height="36px" variant="rounded" width="100%" />
        <Grid2 columns={12} container py={2} spacing={{ xs: 2, md: 3 }}>
          {Array.from({ length: 8 }).map((item, i) => {
            return (
              <Grid2 key={i} size={{ xs: 6, sm: 4, md: 3 }}>
                <MovieItemSkeleton />
              </Grid2>
            );
          })}
        </Grid2>
      </Stack>
    </Container>
  );
};

export default ResultsSkeleton;
