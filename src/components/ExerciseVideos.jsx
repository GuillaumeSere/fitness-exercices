import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if (!exerciseVideos.length) {
    return (
      <Box component="section" sx={{ marginTop: { lg: '120px', xs: '48px' } }} p={{ xs: '16px', sm: '20px' }}>
        <Typography variant="h4" fontWeight={700} mb="16px">
          Vidéos de l'exercice
        </Typography>
        <Box className="empty-state">
          <Typography color="text.secondary">
            Aucune vidéo n'a été trouvée pour cet exercice.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box component="section" sx={{ marginTop: { lg: '120px', xs: '48px' } }} p={{ xs: '16px', sm: '20px' }}>
      <Typography variant="h4" fontWeight={700} mb="33px">
        Vidéos pour <span style={{ color: '#ff2625', textTransform: 'capitalize' }}>{name}</span>
      </Typography>
      <Stack justifyContent="flex-start" flexWrap="wrap" alignItems="stretch" className="video-grid">
        {exerciseVideos?.slice(0, 6)?.map((item) => {
          const video = item.video;

          if (!video?.videoId) {
            return null;
          }

          return (
            <a
              key={video.videoId}
              className="exercise-video"
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={video.thumbnails?.[0]?.url} alt={video.title} loading="lazy" />
              <Box className="exercise-video__content">
                <Typography variant="h6" color="#151515" fontWeight={700}>
                  {video.title}
                </Typography>
                <Typography color="text.secondary">
                  {video.channelName}
                </Typography>
              </Box>
            </a>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;
