import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { exerciseOptions, fetchData, getExerciseDbUrl, getExerciseListUrl } from '../utils/fetchData';
import HorizontalScollbar from './HorizontalScollbar';
import Loader from './Loader';
import { formatExerciseMeta } from '../utils/formatExerciseText';

const SearchExercises = ({
  setExercises,
  bodyPart,
  setBodyPart,
  setResultLabel,
}) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);
  const [isLoadingBodyParts, setIsLoadingBodyParts] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchBodyParts = async () => {
      setIsLoadingBodyParts(true);
      setError('');

      try {
        const bodyPartsData = await fetchData(getExerciseDbUrl('/exercises/bodyPartList'), exerciseOptions);

        if (isCurrentRequest) {
          setBodyParts(['all', ...(Array.isArray(bodyPartsData) ? bodyPartsData : [])]);
        }
      } catch (fetchError) {
        if (isCurrentRequest) {
          setBodyParts(['all']);
          setError(fetchError.message || 'Impossible de charger les filtres.');
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoadingBodyParts(false);
        }
      }
    };

    fetchBodyParts();

    return () => {
      isCurrentRequest = false;
    };
  }, []);

  const handleSearch = async () => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return;
    }

    setIsSearching(true);
    setError('');

    try {
      const exercisesData = await fetchData(getExerciseListUrl('/exercises'), exerciseOptions);
      const exerciseList = Array.isArray(exercisesData) ? exercisesData : [];

      const searchedExercises = exerciseList.filter((item) => (
        item.name?.toLowerCase().includes(normalizedSearch)
        || item.target?.toLowerCase().includes(normalizedSearch)
        || item.equipment?.toLowerCase().includes(normalizedSearch)
        || item.bodyPart?.toLowerCase().includes(normalizedSearch)
        || formatExerciseMeta(item.target)?.toLowerCase().includes(normalizedSearch)
        || formatExerciseMeta(item.equipment)?.toLowerCase().includes(normalizedSearch)
        || formatExerciseMeta(item.bodyPart)?.toLowerCase().includes(normalizedSearch)
      ));

      setExercises(searchedExercises);
      setResultLabel(`la recherche "${normalizedSearch}"`);
      setSearch('');
      document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (fetchError) {
      setError(fetchError.message || 'Impossible de rechercher les exercices.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Stack component="section" alignItems="center" mt={{ xs: '40px', md: '72px' }} justifyContent="center" p={{ xs: '16px', sm: '20px' }}>
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb={{ xs: '28px', md: '40px' }}
        textAlign="center"
      >
        Trouve le bon mouvement
      </Typography>

      <Stack
        className="search-panel"
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="stretch"
        gap="12px"
        mb={{ xs: '36px', md: '56px' }}
      >
        <TextField
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          placeholder="Rechercher par nom, muscle, matériel..."
          type="text"
          inputProps={{ 'aria-label': 'Rechercher des exercices' }}
        />
        <Button
          className="search-btn"
          variant="contained"
          startIcon={<SearchIcon />}
          disabled={isSearching || !search.trim()}
          onClick={handleSearch}
        >
          {isSearching ? 'Recherche...' : 'Rechercher'}
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ width: '100%', maxWidth: '900px', mb: '24px' }}>
          {error}
        </Alert>
      )}

      <Box sx={{ position: 'relative', width: '100%' }}>
        {isLoadingBodyParts ? (
          <Loader />
        ) : (
          <HorizontalScollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts />
        )}
      </Box>
    </Stack>
  );
};

export default SearchExercises;
