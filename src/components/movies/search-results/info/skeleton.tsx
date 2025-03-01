import {
  Skeleton,
  Stack,
} from '@mui/material';
import { times } from 'lodash-es';


import { ScrollBox } from './styles';

const defaultImg = 'https://fakeimg.pl/138x175/?text=Oops';

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
        {times(6).map((i) => {
          return (
            <Skeleton
              height={215}
              key={i}
              variant="rounded"
              width={128}
            ></Skeleton>
          );
        })}
      </Stack>
    </ScrollBox>
  );
};

export default MovieCreditsSkeleton;
