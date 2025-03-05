'use client';

import { Grid2, Typography } from '@mui/material';

import { useMovieCredits, useMovieDetail } from '../hooks/detail';

const getScoreColor = (score: number) => {
  if (score < 5) return 'error';
  if (score < 7) return 'warning';
  return 'success';
};

const numberToUS = (money?: number) => {
  return money
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(money)
    : '-';
};

const MovieStatus: React.FC = () => {
  const { detail } = useMovieDetail();
  const { crew } = useMovieCredits();

  const formattedScore =
    detail?.vote_average && !Number.isNaN(detail?.vote_average)
      ? detail?.vote_average.toFixed(1)
      : 'NA';

  return (
    <Grid2 container spacing="8px">
      <Grid2 size={{ xs: 6, sm: 4 }}>
        <Typography fontWeight="bold" variant="h6">
          導演
        </Typography>
        <Typography>
          {crew?.find((item) => item.job === 'Producer')?.name ?? 'NA'}
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4 }}>
        <Typography fontWeight="bold" variant="h6">
          評分
        </Typography>
        <Typography
          color={getScoreColor(detail?.vote_average ?? 0)}
          fontWeight="700"
        >
          {formattedScore}
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4 }}>
        <Typography fontWeight="bold" variant="h6">
          狀態
        </Typography>
        <Typography>{detail?.status ?? '-'}</Typography>
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4 }}>
        <Typography fontWeight="bold" variant="h6">
          原始語言
        </Typography>
        <Typography>
          {detail?.spoken_languages.find(
            (item) => item.iso_639_1 === detail?.original_language
          )?.name ?? '-'}
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4 }}>
        <Typography fontWeight="bold" variant="h6">
          成本
        </Typography>
        <Typography>{numberToUS(detail?.budget)}</Typography>
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4 }}>
        <Typography fontWeight="bold" variant="h6">
          收入
        </Typography>
        <Typography>{numberToUS(detail?.revenue)}</Typography>
      </Grid2>
    </Grid2>
  );
};

export default MovieStatus;
