import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import { InView } from 'react-intersection-observer';

const Trailer: React.FC<PropsWithChildren> = ({ children }) => {
  const videoId = 'mRma6NkHwWU';
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio: { xs: '4/3', md: '10/4' },
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'gray',
      }}
    >
      <InView delay={300} triggerOnce>
        {({ inView, ref, entry }) => {
          return (
            <>
              <div ref={ref}></div>
              {inView ? (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    border: 'none',
                  }}
                  component="iframe"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=0`}
                  title="YouTube video player"
                  allow="autoplay; encrypted-media"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></Box>
              ) : (
                <></>
              )}
            </>
          );
        }}
      </InView>

      {children}
    </Box>
  );
};

export default Trailer;
