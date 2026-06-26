import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import HorizontalScollbar from './HorizontalScollbar';

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  const renderExerciseRow = (items, emptyText, ariaLabel) => (
    <Stack className="similar-carousel" direction="row">
      {items.length > 0 ? (
        <HorizontalScollbar data={items} cardVariant="compact" ariaLabel={ariaLabel} />
      ) : (
        <Box className="empty-state empty-state--compact">
          <Typography color="text.secondary">{emptyText}</Typography>
        </Box>
      )}
    </Stack>
  );

  return (
    <Box component="section" className="similar-exercises" sx={{ mt: { lg: '100px', xs: '64px' } }}>
      <Stack className="similar-section">
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'flex-end' }} gap="8px" px={{ xs: '16px', sm: '20px' }}>
          <Box>
            <Typography sx={{ fontSize: { lg: '36px', xs: '26px' } }} fontWeight={700} color="#151515">
              Exercices pour le <span style={{ color: '#FF2625' }}>même muscle</span>
            </Typography>
            <Typography color="text.secondary" mt="6px">
              Des alternatives proches pour varier ta séance.
            </Typography>
          </Box>
          <Typography className="similar-count">
            {targetMuscleExercises.length} résultat{targetMuscleExercises.length > 1 ? 's' : ''}
          </Typography>
        </Stack>
        {renderExerciseRow(
          targetMuscleExercises,
          'Aucun exercice similaire trouvé pour ce muscle.',
          'Exercices similaires pour le même muscle',
        )}
      </Stack>

      <Stack className="similar-section">
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'flex-end' }} gap="8px" px={{ xs: '16px', sm: '20px' }}>
          <Box>
            <Typography sx={{ fontSize: { lg: '36px', xs: '26px' } }} fontWeight={700} color="#151515">
              Exercices avec le <span style={{ color: '#FF2625' }}>même matériel</span>
            </Typography>
            <Typography color="text.secondary" mt="6px">
              Pratique quand tu veux rester sur le même équipement.
            </Typography>
          </Box>
          <Typography className="similar-count">
            {equipmentExercises.length} résultat{equipmentExercises.length > 1 ? 's' : ''}
          </Typography>
        </Stack>
        {renderExerciseRow(
          equipmentExercises,
          'Aucun exercice similaire trouvé pour ce matériel.',
          'Exercices similaires avec le même matériel',
        )}
      </Stack>
    </Box>
  );
};

export default SimilarExercises;
