import React from 'react';
import { Box } from '@mui/material';
import SignupForm from '../components/forms/SignupForm';
import Navbar from '../components/layout/Navbar';

const SignUpPage = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          background: 'linear-gradient(135deg, rgba(3,26,68,0.95) 0%, rgba(18,18,18,0.95) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          pt: 12, // Add padding top to account for navbar
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 'sm', mb: 8 }}>
          <SignupForm />
        </Box>
      </Box>
    </>
  );
};

export default SignUpPage;