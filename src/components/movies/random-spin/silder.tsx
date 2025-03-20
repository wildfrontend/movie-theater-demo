import { Box, Button, Stack } from '@mui/material';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';
import 'swiper/css/free-mode';
import { Autoplay, EffectCoverflow, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { MovieItem } from '@/types/apis/movies';

import { useWatchlist } from '../movies/watchlist';
import MovieCard from './item';

const generateRandomMovies = (movies: MovieItem[], random: number) => {
  return [...movies]
    .sort(
      (a, b) =>
        Math.sin(random * movies.indexOf(a)) -
        Math.sin(random * movies.indexOf(b))
    )
    .slice(0, 10);
};

const useControlSpin = () => {
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [random, setRandom] = useState(Math.random());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoplayEnabled) {
      timeoutRef.current = setTimeout(() => {
        setAutoplayEnabled(false);
        timeoutRef.current = null;
      }, 700);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [autoplayEnabled]);

  const restartSpin = useCallback(() => {
    setAutoplayEnabled(true);
    setRandom(Math.random());
  }, []);

  return { random, autoplayEnabled, restartSpin };
};

const SwiperControl: React.FC<{ enableAutoPlay: boolean }> = ({
  enableAutoPlay,
}) => {
  const swiper = useSwiper();

  useEffect(() => {
    if (enableAutoPlay) {
      swiper?.autoplay?.start();
    } else {
      swiper?.autoplay?.stop();
    }
  }, [enableAutoPlay, swiper]);

  return <></>;
};

const useRandomMovies = ({ random }: { random: number }) => {
  const { data, isFetching } = useWatchlist();
  const randomMovies = useMemo(() => {
    if (!data?.pages) return [];
    return generateRandomMovies(
      data.pages.flatMap((group) => group?.results) ?? [],
      random
    );
  }, [data, random]);
  return {
    randomMovies,
    isFetching,
    isEmpty: randomMovies.length === 0,
  };
};

const MovieSlider: React.FC = () => {
  const { random, autoplayEnabled, restartSpin } = useControlSpin();
  const { randomMovies } = useRandomMovies({ random });
  return (
    <Stack alignItems="center" direction="column" spacing="16px" width="100%">
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          ['.swiper-slide']: {
            width: { xs: '320px', md: '360px' },
          },
        }}
      >
        <Swiper
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          centeredSlides
          coverflowEffect={{
            rotate: 0,
            stretch: 100,
            depth: 150,
            modifier: 1.5,
            slideShadows: false,
          }}
          effect="coverflow"
          freeMode
          loop
          modules={[Autoplay, EffectCoverflow, FreeMode]}
          slidesPerView="auto"
          speed={30}
        >
          <SwiperControl enableAutoPlay={autoplayEnabled} />
          {randomMovies.map((item, i) => {
            return (
              <SwiperSlide key={item.id}>
                <MovieCard item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
      <Box>
        <Button
          disabled={autoplayEnabled}
          onClick={restartSpin}
          sx={{
            visibility: autoplayEnabled ? 'hidden' : undefined,
          }}
          variant="contained"
        >
          不喜歡?再選一次
        </Button>
      </Box>
    </Stack>
  );
};

export default MovieSlider;
