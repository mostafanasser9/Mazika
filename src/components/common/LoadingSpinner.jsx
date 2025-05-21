import React from 'react';
import { Box, CircularProgress, Fade } from '@mui/material';

const LoadingSpinner = ({ size = 40, thickness = 4, delay = 0 }) => {
  return (
    <Fade in timeout={400} style={{ transitionDelay: `${delay}ms` }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px',
          width: '100%',
        }}
      >
        <CircularProgress
          size={size}
          thickness={thickness}
          sx={{
            color: 'primary.main',
          }}
        />
      </Box>
    </Fade>
  );
};

export default LoadingSpinner; 