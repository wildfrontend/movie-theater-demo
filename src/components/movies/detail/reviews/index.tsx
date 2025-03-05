'use client';

import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { useFetchMovieReviews } from '@/apis/movies/api';
import { MovieReview } from '@/types/apis/movies';
import dayjs from '@/utils/dayjs';

import { useMovieDetail } from '../hooks/detail';

const ReviewItem: React.FC<{ review: MovieReview }> = ({ review }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => setIsReadMore((prev) => !prev);

  const isLongContent = review.content.length > 200;
  const displayedContent = isReadMore
    ? review.content
    : review.content.slice(0, 200) + (isLongContent ? ' ...' : '');

  return (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <Stack>
          <Typography component="span" fontWeight="bold">
            {review.author}
          </Typography>
          <Typography color="text.secondary" variant="caption">
            {dayjs(review.updated_at).format('YYYY/MM/DD HH:mm:ss')}
          </Typography>
          <Typography display="flow-root" variant="body2">
            {displayedContent}
            {isLongContent && (
              <Button
                onClick={toggleReadMore}
                size="small"
                sx={{ float: 'right' }}
                variant="text"
              >
                {isReadMore ? '更少' : '更多'}
              </Button>
            )}
          </Typography>
        </Stack>
      </ListItem>
      <Divider component="li" />
    </React.Fragment>
  );
};

const MovieReviews: React.FC = () => {
  const { movieId } = useMovieDetail();
  const { reviews } = useFetchMovieReviews(movieId);
  if ((reviews?.length ?? 0) === 0) {
    return (
      <Box>
        <Typography variant="body1">目前還未有評論</Typography>
      </Box>
    );
  }
  return (
    <List>
      {reviews?.map((item) => {
        return <ReviewItem key={item.id} review={item} />;
      })}
    </List>
  );
};

export default MovieReviews;
