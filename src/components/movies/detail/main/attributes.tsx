'use client';

import { Stack, Typography } from '@mui/material';
import React from 'react';

import dayjs from '@/utils/global/dayjs';

import { useMovieDetail } from '../hooks/detail';

const MovieAttribute: React.FC = ({}) => {
  const { detail } = useMovieDetail();
  return (
    <Stack
      direction="row"
      divider={<Typography variant="caption">•</Typography>}
      px="4px"
      spacing="4px"
    >
      <Typography variant="caption">
        {dayjs(detail?.release_date).format('YYYY/MM/DD')}
      </Typography>
      {(detail?.origin_country?.length ?? 0) > 0 && (
        <Stack
          direction="row"
          divider={<Typography variant="caption">,</Typography>}
          spacing="2px"
        >
          {detail?.origin_country.map((country) => {
            return (
              <Typography key={country} variant="caption">
                {country}
              </Typography>
            );
          })}
        </Stack>
      )}
      {detail?.runtime && (
        <Typography variant="caption">
          {dayjs.duration(detail?.runtime, 'minutes').format('H 小時 mm 分鐘')}
        </Typography>
      )}
    </Stack>
  );
};

export default MovieAttribute;
