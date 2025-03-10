import Image from 'next/image';

import sizes from '@/utils/image/sizes';
import { tmdbBackdropLoader } from '@/utils/image/tmdb';

const defaultImg = 'https://fakeimg.pl/774x435?text=Oops';

const MovieBackdrop: React.FC<{ alt?: string; url?: string | null }> = ({
  alt,
  url,
}) => {
  return (
    <Image
      alt={alt ?? 'noalt'}
      fill
      loader={tmdbBackdropLoader}
      loading="eager"
      onError={(e) => {
        e.currentTarget.src = defaultImg;
      }}
      sizes={sizes('60vw', '780px')}
      src={url ?? ''}
      style={{ objectFit: 'cover' }}
    />
  );
};

export default MovieBackdrop;
