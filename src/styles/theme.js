// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#031a44', // Dark blue for play button
      light: '#50C5F9', // Exact blue for highlighted playing tracks
      dark: '#0C7EB0',
    },
    secondary: {
      main: '#E84C65', // Bright red accent
      light: '#FA7C90',
      dark: '#B32E44',
    },
    background: {
      default: '#121212', // Spotify's dark background
      paper: '#1A1A1A', // Slightly lighter than the default background
      input: '#2a2a2a', // Spotify's input field background color
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#b3b3b3', // Spotify's exact gray text color for secondary text
    },
    divider: '#282828', // Spotify's exact divider color
    hover: {
      row: '#282828', // Proper hover color for table rows
    }
  },
  typography: {
    fontFamily: '"Poppins", "Montserrat", "Roboto", sans-serif',
    h1: {
      fontSize: '2.8rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '2.3rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.9rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.6rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontFamily: '"Nunito", "Open Sans", sans-serif',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontFamily: '"Nunito", "Open Sans", sans-serif',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.03em',
    },
    subtitle1: {
      fontSize: '0.9rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    subtitle2: {
      fontSize: '0.8rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8, // Base spacing unit
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#121212', // Match Spotify's navbar color
          borderBottom: '1px solid #282828',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 500, // Pill-shaped buttons like Spotify
          padding: '6px 20px',
          backgroundColor: '#031a44', // Dark blue for play button
          '&:hover': {
            backgroundColor: '#50C5F9', // Light blue hover effect
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
          '&:hover': {
            backgroundColor: '#282828', // Consistent hover color
          },
          transition: 'background-color 0.3s ease',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#282828', // Proper hover color for table rows
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2a2a', // Spotify's input field style
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#282828', // Spotify's exact divider color
        },
      },
    },
  },
});

// Add a custom variant for more emphasis/section headers
theme.typography.display = {
  fontFamily: '"Montserrat", sans-serif',
  fontWeight: 800,
  fontSize: '3.2rem',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
};

export default theme;