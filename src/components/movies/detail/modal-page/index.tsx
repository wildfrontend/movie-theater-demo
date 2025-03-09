'use client';

import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  dialogClasses,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React from 'react';
import { InView } from 'react-intersection-observer';

import MovieCreditsSkeleton from '@/components/movies/detail/credits/skeleton';
import MovieAttribute from '@/components/movies/detail/main/attributes';
import MovieGenres from '@/components/movies/detail/main/genres';
import MovieHeadline from '@/components/movies/detail/main/headline';
import MovieOverview from '@/components/movies/detail/main/overview';
import MovieStatus from '@/components/movies/detail/main/status';
import MovieTitle from '@/components/movies/detail/main/title';
import MovieReviewsSkeleton from '@/components/movies/detail/reviews/skeleton';

const MovieCredits = dynamic(
  () => import('@/components/movies/detail/credits'),
  {
    loading: () => {
      return <MovieCreditsSkeleton />;
    },
  }
);
const MovieReviews = dynamic(
  () => import('@/components/movies/detail/reviews'),
  {
    loading: () => {
      return <MovieReviewsSkeleton />;
    },
  }
);

const MovieModalPage: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const onClose = () => {
    router.back();
  };
  return (
    <Dialog
      fullScreen={isMobile}
      maxWidth="md"
      onClose={onClose}
      open
      scroll="body"
      sx={{
        [`.${dialogClasses.container}:after`]: {
          height: 'auto',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: 1,
          color: 'white',
        }}
      >
        <CloseIcon />
      </IconButton>
      <MovieHeadline />
      <DialogContent>
        <Stack spacing="16px">
          <MovieTitle />
          <MovieAttribute />
          <MovieGenres />
          <MovieStatus />
          <Typography fontWeight="bold" gutterBottom variant="h5">
            概要
          </Typography>
          <MovieOverview />
          <InView delay={300} triggerOnce>
            {({ inView, ref, entry }) => {
              return (
                <>
                  <Typography ref={ref} fontWeight="bold" variant="h5">
                    演出
                  </Typography>
                  {inView ? <MovieCredits /> : <></>}
                </>
              );
            }}
          </InView>
          <InView delay={300} triggerOnce>
            {({ inView, ref, entry }) => {
              return (
                <>
                  <Typography ref={ref} fontWeight="bold" variant="h5">
                    評論
                  </Typography>
                  {inView ? <MovieReviews /> : <></>}
                </>
              );
            }}
          </InView>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default MovieModalPage;
