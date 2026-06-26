import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { exerciseOptions, fetchData, getExerciseListUrl } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({
  exercises,
  setExercises,
  bodyPart,
  resultLabel,
  filterVersion,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const exercisesPerPage = 9;
  const hasSingleResult = exercises.length === 1;
  const resultCountLabel = `${exercises.length} exercice${hasSingleResult ? '' : 's'}`;

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchExercisesData = async () => {
      setIsLoading(true);
      setError('');

      try {
        const endpoint = bodyPart === 'all'
          ? '/exercises'
          : `/exercises/bodyPart/${encodeURIComponent(bodyPart)}`;
        const exercisesData = await fetchData(getExerciseListUrl(endpoint), exerciseOptions);

        if (isCurrentRequest) {
          setExercises(Array.isArray(exercisesData) ? exercisesData : []);
        }
      } catch (fetchError) {
        if (isCurrentRequest) {
          setExercises([]);
          setError(fetchError.message || 'Impossible de charger les exercices.');
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    fetchExercisesData();

    return () => {
      isCurrentRequest = false;
    };
  }, [bodyPart, filterVersion, reloadKey, setExercises]);

  useEffect(() => {
    setCurrentPage(1);
  }, [exercises]);

    // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);

    document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box id="exercises" component="section" sx={{ mt: { lg: '96px', xs: '48px' } }} p={{ xs: '16px', sm: '20px' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'flex-end' }}
        justifyContent="space-between"
        gap="16px"
        mb={{ xs: '28px', md: '40px' }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ fontSize: { lg: '42px', xs: '30px' } }}
          >
            Bibliothèque d'exercices
          </Typography>
          <Typography color="text.secondary" mt="8px">
            {isLoading ? 'Chargement des exercices...' : `${resultCountLabel} trouvé${hasSingleResult ? '' : 's'} pour ${resultLabel}`}
          </Typography>
        </Box>

        {!isLoading && exercises.length > 0 && (
          <Typography color="text.secondary">
            Page {currentPage} sur {Math.ceil(exercises.length / exercisesPerPage)}
          </Typography>
        )}
      </Stack>

      {error && (
        <Alert
          severity="error"
          action={(
            <Button color="inherit" size="small" onClick={() => setReloadKey((key) => key + 1)}>
              Réessayer
            </Button>
          )}
          sx={{ mb: '24px' }}
        >
          {error}
        </Alert>
      )}

      {isLoading && <Loader />}

      {!isLoading && !error && exercises.length === 0 && (
        <Box className="empty-state">
          <Typography variant="h6" fontWeight={700}>Aucun exercice trouvé</Typography>
          <Typography color="text.secondary" mt="8px">
            Essaie un autre mot-clé ou une autre zone du corps.
          </Typography>
        </Box>
      )}

      {!isLoading && !error && exercises.length > 0 && (
        <>
          <Box className="exercise-grid">
            {currentExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </Box>

          {exercises.length > exercisesPerPage && (
            <Stack className="exercise-pagination" sx={{ mt: { lg: '64px', xs: '44px' } }} alignItems="center">
              <Pagination
                aria-label="Pagination des exercices"
                color="primary"
                getItemAriaLabel={(type, page, selected) => {
                  if (type === 'page') {
                    return selected ? `Page ${page}, page actuelle` : `Aller à la page ${page}`;
                  }

                  const labels = {
                    first: 'Aller à la première page',
                    last: 'Aller à la dernière page',
                    next: 'Aller à la page suivante',
                    previous: 'Aller à la page précédente',
                  };

                  return labels[type] || '';
                }}
                shape="rounded"
                count={Math.ceil(exercises.length / exercisesPerPage)}
                page={currentPage}
                onChange={paginate}
                size="large"
                showFirstButton
                showLastButton
                siblingCount={1}
                boundaryCount={1}
              />
            </Stack>
          )}
        </>
      )}
    </Box>
  );
};

export default Exercises;
