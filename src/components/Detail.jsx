import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';
import Loader from './Loader';
import { formatBodyPart, formatEquipment, formatTarget } from '../utils/formatExerciseText';


const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      label: 'Zone du corps',
      name: formatBodyPart(bodyPart),
    },
    {
      icon: TargetImage,
      label: 'Muscle ciblé',
      name: formatTarget(target),
    },
    {
      icon: EquipmentImage,
      label: 'Matériel',
      name: formatEquipment(equipment),
    },
  ];

  if (!name) {
    return <Loader />;
  }

  return (
    <Stack
      component="section"
      gap={{ xs: '32px', lg: '60px' }}
      sx={{ flexDirection: { lg: 'row' }, p: { xs: '16px', sm: '20px' }, alignItems: 'center' }}
    >
      <Box className="detail-image-frame">
        <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      </Box>
      <Stack sx={{ gap: { lg: '28px', xs: '20px' }, maxWidth: '560px' }}>
        <Typography variant="h3" fontWeight={700} textTransform="capitalize" sx={{ fontSize: { xs: '34px', md: '48px' } }}>
          {name}
        </Typography>
        <Typography variant="h6" color="text.secondary" lineHeight="1.7">
          Renforce ta technique avec une vue claire du mouvement, puis retrouve des exercices proches par muscle et par matériel.
        </Typography>
        <Stack gap="16px">
          {extraDetail.map((item) => (
            <Stack key={item.label} direction="row" gap="18px" alignItems="center" className="detail-meta-row">
              <Box className="detail-meta-icon">
                <img src={item.icon} alt="" aria-hidden="true" />
              </Box>
              <Box>
                <Typography color="text.secondary" fontSize="14px" fontWeight={700}>
                  {item.label}
                </Typography>
                <Typography textTransform="capitalize" variant="h5" fontWeight={700}>
                  {item.name}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Detail;
