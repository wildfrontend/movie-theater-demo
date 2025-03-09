import { Grid2, Skeleton } from '@mui/material';
import React from 'react';

export const MovieItemSkeleton: React.FC = () => {
  return (
    <Skeleton height="100%" sx={{ aspectRatio: 154 / 220 }} variant="rounded" />
  );
};

const LoadMoreSkeleton: React.FC = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((item, i) => {
        return (
          <Grid2 key={i} size={{ xs: 6, sm: 4, md: 3 }}>
            <MovieItemSkeleton />
          </Grid2>
        );
      })}
    </>
  );
};

export default LoadMoreSkeleton;
