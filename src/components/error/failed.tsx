import { Alert, Container, Stack, Typography } from '@mui/material';

const FailedPanel: React.FC<{ error: Error | null }> = ({ error }) => {
  return (
    <Container maxWidth="lg">
      <Stack pt="32px" spacing="16px">
        <Typography color="error" fontWeight="bold" variant="h2">
          Oops! 出了一點問題
        </Typography>
        <Typography
          color="error"
          sx={{
            py: {
              md: '32px',
            },
          }}
        >
          可能是網路問題或伺服器異常，請稍後再試。
        </Typography>
        <Alert severity="error">
          {error?.message ||
            '請重新整理頁面，或稍後再試。如果問題持續發生，請聯絡客服。'}
        </Alert>
      </Stack>
    </Container>
  );
};

export default FailedPanel;
