'use client';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const YouTubeEmbed: React.FC<{ youtubeId: string; title: string }> = ({
  youtubeId,
  title,
}) => {
  return (
    <LiteYouTubeEmbed
      id={youtubeId}
      params=""
      poster="hqdefault"
      title={title}
    />
  );
};

export default YouTubeEmbed;
