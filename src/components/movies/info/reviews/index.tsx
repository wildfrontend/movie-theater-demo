import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

import { useFetchMovieReviews } from '@/apis/movies/api';
import useMovieIdQueyParams from '@/hooks/movies/item';
import dayjs from '@/utils/dayjs';

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
        return (
          <React.Fragment key={item.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography component="span" fontWeight="bold">
                    {item.author}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography color="text.secondary" variant="body2">
                      {dayjs(item.updated_at).format('YYYY/MM/DD HH:mm:ss')}
                    </Typography>
                    <Typography component="p" variant="body1">
                      {item.content}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider component="li" variant="inset" />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default MovieReviews;
