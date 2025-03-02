import { Container, Stack, Typography } from '@mui/material';

const MoviesEmpty: React.FC = ({}) => {
  return (
    <Container maxWidth="lg">
      <Stack pt="32px" spacing="16px">
        <Typography fontWeight="bold" variant="h2">
          嗯？這裡沒有電影呢！
        </Typography>
        <Typography
          sx={{
            py: {
              md: '32px',
            },
          }}
        >
          試試在上方的搜尋欄輸入電影名稱，看看是否能找到您想看的電影吧！
        </Typography>
      </Stack>
    </Container>
  );
};

export default MoviesEmpty;
