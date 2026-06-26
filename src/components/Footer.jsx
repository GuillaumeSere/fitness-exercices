import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Stack, Typography } from '@mui/material';
import Logo from '../assets/images/Logo-1.png';

const Footer = () => {
  return (
    <Box component="footer" className="site-footer">
      <Stack
        className="site-footer__inner"
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        gap="14px"
      >
        <img src={Logo} alt="Fitness Club" className="site-footer__logo" />
        <Typography className="site-footer__credit">
          Cree avec <FavoriteBorderIcon className="site-footer__icon" /> par Guillaume SERE
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
