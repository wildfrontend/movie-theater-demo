import { Skeleton, Stack } from '@mui/material';

import { ScrollBox } from './styles';

const MovieCreditsSkeleton: React.FC = () => {
  return (
    <ScrollBox>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          width: 'max-content',
          paddingBottom: '8px',
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => {
          return (
            <Skeleton height={215} key={i} variant="rounded" width={128} />
          );
        })}
      </Stack>
    </ScrollBox>
  );
};

export default MovieCreditsSkeleton;
