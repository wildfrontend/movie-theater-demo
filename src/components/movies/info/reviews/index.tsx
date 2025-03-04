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
import useMovieIdQueyParams from '@/hooks/movies/item';
import { MovieReview } from '@/types/apis/movies';
import dayjs from '@/utils/dayjs';

const ReviewItem: React.FC<{ review: MovieReview }> = ({ review }) => {
  const [isReadmore, setReadmore] = useState(false);
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
            {isReadmore
              ? review.content
              : review.content.slice(0, 200) + ` ...`}
            {isReadmore ? (
              <Button
                onClick={() => setReadmore(false)}
                size="small"
                sx={{
                  float: 'right',
                }}
                variant="text"
              >
                更少
              </Button>
            ) : (
              <Button
                onClick={() => setReadmore(true)}
                size="small"
                sx={{
                  float: 'right',
                }}
                variant="text"
              >
                更多
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
  const { movieId } = useMovieIdQueyParams();
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
