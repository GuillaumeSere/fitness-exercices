import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { formatBodyPart, formatEquipment, formatTarget } from '../utils/formatExerciseText';

const ExerciseCard = ({ exercise, variant = 'default' }) => {
  const isCompact = variant === 'compact';

  return (
    <Link
      className={`exercise-card${isCompact ? ' exercise-card--compact' : ''}`}
      to={`/exercise/${exercise.id}`}
      aria-label={`Ouvrir ${exercise.name}`}
    >
      <Box className="exercise-card__media">
        <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      </Box>
      <Stack className="exercise-card__content" gap={isCompact ? '10px' : '12px'}>
        <Stack direction="row" flexWrap="wrap" gap="8px">
          <Box component="span" className="exercise-chip exercise-chip--primary">
            {formatBodyPart(exercise.bodyPart)}
          </Box>
          <Box component="span" className="exercise-chip exercise-chip--secondary">
            {formatTarget(exercise.target)}
          </Box>
          {!isCompact && exercise.equipment && (
            <Box component="span" className="exercise-chip exercise-chip--neutral">
              {formatEquipment(exercise.equipment)}
            </Box>
          )}
        </Stack>
        <Typography
          color="#151515"
          fontWeight={700}
          sx={{ fontSize: { lg: isCompact ? '18px' : '22px', xs: isCompact ? '17px' : '20px' } }}
          textTransform="capitalize"
        >
          {exercise.name}
        </Typography>
        {isCompact && exercise.equipment && (
          <Typography color="text.secondary" fontSize="14px" fontWeight={700} textTransform="capitalize">
            {formatEquipment(exercise.equipment)}
          </Typography>
        )}
      </Stack>
    </Link>
  );
};

export default ExerciseCard;
