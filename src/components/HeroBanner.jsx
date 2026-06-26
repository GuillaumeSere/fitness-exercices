import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Stack, Typography, Button } from '@mui/material';
import HeroBannerImage from '../assets/images/p6.jpg';

const HeroBanner = () => {
  return (
    <Box
      component="section"
      className="hero-banner"
      sx={{
        mt: { lg: '96px', xs: '44px' },
        mx: { xs: '16px', sm: '20px' },
      }}
    >
      <Stack className="hero-banner__content" gap="20px">
        <Typography color="#FF2625" fontWeight={700} fontSize="18px" letterSpacing="0">
          Fitness Club
        </Typography>
        <Typography
          component="h1"
          fontWeight={700}
          sx={{ fontSize: { lg: '56px', md: '48px', xs: '38px' }, lineHeight: 1.08 }}
        >
          Bibliothèque d'exercices
        </Typography>
        <Typography fontSize={{ xs: '18px', md: '22px' }} lineHeight="1.65" color="text.secondary" maxWidth="520px">
          Parcours toute la base d'exercices, filtre par zone du corps et ouvre chaque mouvement pour voir les vidéos et les alternatives.
        </Typography>
        <Button
          variant="contained"
          color="error"
          href="#exercises"
          endIcon={<ArrowForwardIcon />}
          className="hero-banner__button"
        >
          Explorer les exercices
        </Button>
      </Stack>
      <img src={HeroBannerImage} alt="Athlete training" className="hero-banner-img" />
    </Box>
  );
};

export default HeroBanner;
