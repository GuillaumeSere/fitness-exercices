import React from 'react';
import { ButtonBase, Typography } from '@mui/material';
import Icon from '../assets/icons/gym.png';
import { formatBodyPart } from '../utils/formatExerciseText';

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const isSelected = bodyPart === item;

  return (
    <ButtonBase
      aria-pressed={isSelected}
      className={`bodyPart-card${isSelected ? ' is-active' : ''}`}
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: { xs: '164px', sm: '190px' },
        height: { xs: '150px', sm: '170px' },
        gap: '18px',
      }}
      onClick={() => {
        setBodyPart(item);
        document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
    >
      <img src={Icon} alt="" aria-hidden="true" style={{ width: '40px', height: '40px' }} />
      <Typography
        fontSize={{ xs: '18px', sm: '20px' }}
        fontWeight={700}
        color="#301d1d"
        textTransform="capitalize"
      >
        {formatBodyPart(item)}
      </Typography>
    </ButtonBase>
  );
};

export default BodyPart;
