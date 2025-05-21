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
      card: '#181818', // Card background color
      cardHover: '#282828', // Card hover background color
      gradient: {
        overlay: 'rgba(0,0,0,0.2)',
        overlayDark: 'rgba(0,0,0,0.8)',
        content: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(18,18,18,1) 100%)',
      },
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#b3b3b3', // Spotify's exact gray text color for secondary text
      disabled: '#6b6b6b',
    },
    divider: '#282828', // Spotify's exact divider color
    action: {
      hover: '#282828', // Proper hover color for table rows
      selected: '#282828',
      disabled: '#6b6b6b',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
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
          backgroundColor: '#121212',
          borderBottom: '1px solid #282828',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 500,
          padding: '6px 20px',
          backgroundColor: '#031a44',
          '&:hover': {
            backgroundColor: '#50C5F9',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
          },
        },
        text: {
          color: '#b3b3b3',
          '&:hover': {
            backgroundColor: 'transparent',
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#181818',
          '&:hover': {
            backgroundColor: '#282828',
            transform: 'translateY(-4px)',
          },
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#282828',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          color: '#b3b3b3',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2a2a',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#282828',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#b3b3b3',
          fontWeight: 'bold',
          textTransform: 'none',
          minWidth: 100,
          fontSize: '16px',
          '&.Mui-selected': {
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#50C5F9',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#b3b3b3',
          '&:hover': {
            backgroundColor: 'transparent',
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#50C5F9',
        },
      },
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
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