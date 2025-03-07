import { Box, CircularProgress, Container, Skeleton } from '@mui/material';

const RandomSpinSkeleton: React.FC = () => {
  return (
    <Box>
      <Container
        maxWidth="lg"
        sx={{
          height: {
            xs: '280px',
            md: '360px',
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Container>
    </Box>
  );
};
export default RandomSpinSkeleton;
