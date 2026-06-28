import React from 'react';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import Logo from '../assets/images/Logo-1.png';

const Navbar = () => {
  return (
    <Stack
      component="header"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mt: { sm: '28px', xs: '18px' } }}
      px={{ xs: '16px', sm: '20px' }}
    >
      <Link to="/" className="nav-brand" aria-label="Accueil Golds Gym">
        <img src={Logo} className="site-footer__logo" alt="Golds Gym" />
      </Link>
      <Stack component="nav" direction="row" gap={{ xs: '22px', sm: '36px' }} fontSize={{ xs: '18px', sm: '22px' }} alignItems="center">
        <Link className="nav-link nav-link--active" to="/">Accueil</Link>
        <a className="nav-link" href="#exercises">Exercices</a>
      </Stack>
    </Stack>
  );
};

export default Navbar;
