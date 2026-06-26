import React, { useState } from 'react';
import { Box } from '@mui/material';
import HeroBanner from '../components/HeroBanner';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';
import { formatBodyPart } from '../utils/formatExerciseText';

const Home = () => {
  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([]);
  const [resultLabel, setResultLabel] = useState('toutes les zones du corps');
  const [filterVersion, setFilterVersion] = useState(0);

  const handleBodyPartChange = (selectedBodyPart) => {
    setBodyPart(selectedBodyPart);
    setResultLabel(selectedBodyPart === 'all' ? 'toutes les zones du corps' : formatBodyPart(selectedBodyPart));
    setFilterVersion((version) => version + 1);
  };

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={handleBodyPartChange}
        setResultLabel={setResultLabel}
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
        resultLabel={resultLabel}
        filterVersion={filterVersion}
      />
    </Box>
  );
};

export default Home;
