import { Container, Stack, Typography } from '@mui/material';

const WatchlistEmpty: React.FC = ({}) => {
  return (
    <Container maxWidth="lg">
      <Stack pt="32px" spacing="16px">
        <Typography fontWeight="bold" variant="h2">
          哎呀！你還沒有收藏任何電影喔！
        </Typography>
        <Typography
          sx={{
            py: {
              md: '32px',
            },
          }}
        >
          快來探索電影世界，收藏你喜愛的影片吧！
        </Typography>
      </Stack>
    </Container>
  );
};

export default WatchlistEmpty;
