import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const MovieTrailer: React.FC = () => {
  return (
    <LiteYouTubeEmbed
        adNetwork={false}
      id="rUSdnuOLebE"
      poster="maxresdefault"
      title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
      params={'?autoplay=1'}
    />
  );
};

export default MovieTrailer;
