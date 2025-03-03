import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Alert, Button, Snackbar } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { useFetchMovieAccountStates } from '@/apis/movies/api';
import { addToWatchlist } from '@/apis/user/api';
import useMovieIdQueyParams from '@/hooks/movies/item';

const AddWatchlist: React.FC = () => {
  const { movieId } = useMovieIdQueyParams();

  const {
    isWatchlist,
    isFetching: isAccountStatusFetching,
    refetch,
  } = useFetchMovieAccountStates(movieId);

  const mutate = useMutation({
    mutationFn: addToWatchlist,
    onSuccess: () => {
      console.log('Successfully updated watchlist!');
      refetch();
    },
    onError: (error) => {
      console.log('Error updating watchlist:', error);
    },
  });

  return (
    <>
      <Button
        loading={isAccountStatusFetching || mutate.isPending}
        onClick={() => {
          mutate.mutate({ watchlist: !isWatchlist });
        }}
        size="small"
        startIcon={isWatchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        variant="contained"
      >
        {isWatchlist ? '已收藏' : '加入收藏'}
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={3000}
        onClick={() => {
          mutate.reset();
        }}
        onClose={() => {
          mutate.reset();
        }}
        open={mutate.isError}
      >
        <Alert severity="error">{mutate.error?.message ?? '執行錯誤'}</Alert>
      </Snackbar>
    </>
  );
};

export default AddWatchlist;
