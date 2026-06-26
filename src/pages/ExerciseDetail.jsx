import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Box } from '@mui/material';
import { exerciseOptions, fetchData, getExerciseDbUrl, getExerciseListUrl, youtubeOptions } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';
import Loader from '../components/Loader';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchExercisesData = async () => {
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      setIsLoading(true);
      setError('');
      setExerciseDetail({});
      setExerciseVideos([]);
      setTargetMuscleExercises([]);
      setEquipmentExercises([]);

      try {
        const exerciseDetailData = await fetchData(
          getExerciseDbUrl(`/exercises/exercise/${encodeURIComponent(id)}`),
          exerciseOptions,
        );

        if (!isCurrentRequest) {
          return;
        }

        setExerciseDetail(exerciseDetailData);

        const [videosResult, targetResult, equipmentResult] = await Promise.allSettled([
          fetchData(
            `${youtubeSearchUrl}/search?query=${encodeURIComponent(`${exerciseDetailData.name} exercise`)}`,
            youtubeOptions,
          ),
          fetchData(
            getExerciseListUrl(`/exercises/target/${encodeURIComponent(exerciseDetailData.target)}`),
            exerciseOptions,
          ),
          fetchData(
            getExerciseListUrl(`/exercises/equipment/${encodeURIComponent(exerciseDetailData.equipment)}`),
            exerciseOptions,
          ),
        ]);

        if (!isCurrentRequest) {
          return;
        }

        setExerciseVideos(videosResult.status === 'fulfilled' ? videosResult.value?.contents || [] : []);
        setTargetMuscleExercises(targetResult.status === 'fulfilled' && Array.isArray(targetResult.value) ? targetResult.value : []);
        setEquipmentExercises(equipmentResult.status === 'fulfilled' && Array.isArray(equipmentResult.value) ? equipmentResult.value : []);
      } catch (fetchError) {
        if (isCurrentRequest) {
          setError(fetchError.message || "Impossible de charger le détail de l'exercice.");
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
  }, [id]);

  if (isLoading) {
    return (
      <Box p="20px" minHeight="60vh" display="flex" alignItems="center">
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p="20px" minHeight="50vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;


