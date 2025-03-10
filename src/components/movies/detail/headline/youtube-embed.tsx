'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const YouTubeEmbed: React.FC<{ youtubeId: string; title: string }> = ({
  youtubeId,
  title,
}) => {
  const theme = useTheme();
  const isDestktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <LiteYouTubeEmbed
      id={youtubeId}
      params=""
      poster={isDestktop ? 'maxresdefault' : 'hqdefault'}
      title={title}
    />
  );
};

export default YouTubeEmbed;
