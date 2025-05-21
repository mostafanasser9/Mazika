// src/components/layout/Navbar.jsx
import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  InputBase,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  MusicNote as MusicNoteIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '24px',
  backgroundColor: alpha(theme.palette.common.white, 0.08),
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    boxShadow: `0 0 0 1px ${alpha(theme.palette.common.white, 0.3)}`,
    transform: 'scale(1.01)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  transition: theme.transitions.create(['background-color', 'box-shadow', 'transform', 'border'], {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeInOut,
  }),
  display: 'flex',
  alignItems: 'center',
  '&:focus-within': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
    boxShadow: `0 0 0 2px ${alpha(theme.palette.common.white, 0.5)}`,
    transform: 'scale(1.02)',
    border: `1px solid ${alpha(theme.palette.common.white, 0.5)}`,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.common.white, 0.5),
  pointerEvents: 'none',
  zIndex: 1,
  transition: theme.transitions.create(['color', 'transform'], {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeInOut,
  }),
  '.MuiInputBase-root:focus-within &': {
    color: theme.palette.common.white,
    transform: 'scale(1.1)',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: alpha(theme.palette.common.white, 0.7),
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create(['width', 'color'], {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    '&:focus': {
      width: '30ch',
      color: theme.palette.common.white,
    },
    '&::placeholder': {
      color: alpha(theme.palette.common.white, 0.5),
      opacity: 1,
    },
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 800,
  letterSpacing: '.2rem',
  color: 'inherit',
  textDecoration: 'none',
  fontFamily: '"Montserrat", sans-serif',
}));

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const goToHome = () => {
    navigate('/');
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        <ListItem button onClick={goToHome}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo that navigates home */}
        <Box onClick={goToHome} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Logo variant="h6" noWrap>
            <MusicNoteIcon sx={{ mr: 1 }} />
            MAZIKA
          </Logo>
        </Box>

        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 3 }}>
            <IconButton 
              color="inherit" 
              onClick={goBack}
              sx={{
                transition: theme.transitions.create(['transform', 'color']),
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: 'primary.light',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              onClick={goForward}
              sx={{
                transition: theme.transitions.create(['transform', 'color']),
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: 'primary.light',
                },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        )}

        {/* Search Bar */}
        <Search sx={{ 
          flexGrow: 1, 
          maxWidth: { xs: '100%', md: '400px' }, 
          mx: 'auto',
          height: '40px',
          '& .MuiInputBase-root': {
            height: '100%',
            borderRadius: '24px',
          },
        }}>
          <SearchIconWrapper>
            <SearchIcon sx={{ fontSize: 20 }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Search>

        {/* Auth Buttons */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          <Button
            variant="text"
            sx={{
              color: 'text.secondary',
              fontSize: '0.9rem',
              backgroundColor: 'transparent',
              transition: 'color 0.2s ease-in-out',
              '&:hover': {
                color: 'text.primary',
                backgroundColor: 'transparent',
              },
            }}
          >
            Become Premium
          </Button>
          <Button
            variant="text"
            sx={{
              color: 'text.secondary',
              fontSize: '0.9rem',
              backgroundColor: 'transparent',
              transition: 'color 0.2s ease-in-out',
              '&:hover': {
                color: 'text.primary',
                backgroundColor: 'transparent',
              },
            }}
          >
            Login
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ 
              px: 3,
              py: 1,
              fontSize: '1rem',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'primary.main',
                transform: 'scale(1.1)',
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>

      {/* Drawer for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            bgcolor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
