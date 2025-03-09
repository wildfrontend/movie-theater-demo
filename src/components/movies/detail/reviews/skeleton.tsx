import { List, ListItem, Skeleton } from '@mui/material';

const MovieReviewsSkeleton: React.FC = () => {
  return (
    <List>
      {Array.from({ length: 2 }).map((_, i) => {
        return (
          <ListItem key={i}>
            <Skeleton height={94} key={i} variant="rounded" width="100%" />
          </ListItem>
        );
      })}
    </List>
  );
};

export default MovieReviewsSkeleton;
