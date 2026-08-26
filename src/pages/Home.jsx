import React, { useState } from 'react';
import { Box } from '@mui/material';
import HeroBanner from '../components/HeroBanner';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';
import Seo from '../components/Seo';
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
      <Seo
        title="Fitness Exercices | Plus de 1 300 exercices et vidéos"
        description="Découvrez plus de 1 300 exercices de fitness avec ou sans matériel. Filtrez par zone du corps, muscle ciblé et équipement."
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Fitness Exercices',
          url: 'https://fitness-exercices.netlify.app/',
          description: 'Bibliothèque de plus de 1 300 exercices de fitness.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://fitness-exercices.netlify.app/?search={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }}
      />
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
