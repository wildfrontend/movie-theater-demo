'use client';

import {
  Stack,
  Typography,
} from '@mui/material';
import React, { ComponentProps } from 'react';


const getScoreColor = (score: number) => {
  if (!score || Number.isNaN(score)) return 'textSecondary';
  if (score < 5) return 'error';
  if (score < 7) return 'warning';
  return 'success';
};

const MovieScore: React.FC<{
  score?: number;
  variant?: ComponentProps<typeof Typography>['variant'];
}> = ({ score, variant }) => {
  const formattedScore =
    score && !Number.isNaN(score) ? score.toFixed(1) : 'NA';
  return (
    <Stack alignItems="center" direction="row" spacing={1}>
      <Typography variant={variant}>評分 :</Typography>
      <Typography
        color={getScoreColor(score ?? 0)}
        fontWeight="700"
        variant={variant}
      >
        {formattedScore}
      </Typography>
    </Stack>
  );
};

export default MovieScore;
