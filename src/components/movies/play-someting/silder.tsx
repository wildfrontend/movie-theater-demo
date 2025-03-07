import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Stack,
} from '@mui/material';
import Image from 'next/image';
import React, {
  useCallback,
  useEffect,
  useMemo,
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
  const initialSpeed = 60; // Increased initial speed for smoother start
  const minSpeed = 540; // Decreased min speed for more noticeable acceleration
  const maxSpeed = 1080; // Increased max speed for longer spin
  const accelerationFactor = 0.9;
  const decayFactor = 1.2;
  const intervalDelay = 30;

  const [speed, setSpeed] = useState(initialSpeed);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [isAccelerating, setIsAccelerating] = useState(true);
  const [random, setRandom] = useState(Math.random());

  useEffect(() => {
    if (!autoplayEnabled) return;

    let currentSpeed = speed;
    const interval = setInterval(() => {
      if (isAccelerating) {
        currentSpeed *= accelerationFactor;
        if (currentSpeed <= minSpeed) {
          setIsAccelerating(false);
        }
      } else {
        currentSpeed *= decayFactor;
        if (currentSpeed >= maxSpeed) {
          setAutoplayEnabled(false);
          clearInterval(interval);
          return;
        }
      }
      setSpeed(currentSpeed);
    }, intervalDelay); // Use the adjusted interval delay

    return () => clearInterval(interval);
  }, [autoplayEnabled, speed, isAccelerating]);

  const restartSpin = useCallback(() => {
    setSpeed(initialSpeed);
    setAutoplayEnabled(true);
    setIsAccelerating(true);
    setRandom(Math.random());
  }, []);

  return { speed, random, autoplayEnabled, restartSpin };
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
  const { speed, random, autoplayEnabled, restartSpin } = useControlSpin();
  const { randomMovies } = useRandomMovies({ random });
  return (
    <Stack alignItems="center" direction="column" spacing="16px" width="100%">
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          ['.swiper-slide']: {
            width: '370px',
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
          speed={speed}
        >
          <SwiperControl enableAutoPlay={autoplayEnabled} />
          {randomMovies.map((item, i) => {
            return (
              <SwiperSlide key={item.id}>
                <Card
                  sx={{
                    width: '370px',
                    aspectRatio: 16 / 9,
                    position: 'relative',
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      sx={{
                        width: '370px',
                        aspectRatio: 16 / 9,
                        position: 'relative',
                      }}
                    >
                      <Image
                        alt={item.title}
                        fill
                        loading={i === 0 ? 'eager' : 'lazy'}
                        priority={i === 0}
                        src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                        unoptimized
                      />
                    </CardMedia>
                  </CardActionArea>
                </Card>
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
