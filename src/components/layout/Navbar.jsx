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
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  MusicNote as MusicNoteIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  Help as HelpIcon,
  GetApp as DownloadIcon,
  Gavel as TermsIcon,
  Security as PrivacyIcon,
  WorkspacePremium as PremiumIcon,
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
  const [showMobileSearch, setShowMobileSearch] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const goToHome = () => {
    navigate('/home');
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  const drawer = (
    <Box 
      sx={{ 
        height: '100%',
        color: 'common.white',
        position: 'relative',
        bgcolor: '#000000'
      }} 
      role="presentation"
    >
      <List sx={{ px: 3, pt: 3 }}>
        {/* Auth options */}
        <ListItem 
          button 
          onClick={handleDrawerToggle}
          sx={{ 
            py: 2,
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)' }
          }}
        >
          <ListItemText 
            primary="Log in" 
            primaryTypographyProps={{
              fontSize: '1.5rem',
              letterSpacing: '-0.5px'
            }}
          />
        </ListItem>
        <ListItem 
          button 
          onClick={handleDrawerToggle}
          sx={{ 
            py: 2,
            mb: 3,
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)' }
          }}
        >
          <ListItemText 
            primary="Sign up"
            primaryTypographyProps={{
              fontSize: '1.5rem',
              letterSpacing: '-0.5px'
            }}
          />
        </ListItem>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

        {/* Menu options */}
        <Box sx={{ mt: 3 }}>
          {/* Main Menu Items */}
          <ListItem 
            button 
            onClick={() => { navigate('/home'); handleDrawerToggle(); }}
            sx={{ 
              py: 1.5,
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)' }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Home" 
              primaryTypographyProps={{
                fontSize: '1.1rem',
                letterSpacing: '0.2px'
              }}
            />
          </ListItem>
          <ListItem 
            button 
            onClick={handleDrawerToggle}
            sx={{ 
              py: 1.5,
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)' }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <PremiumIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Premium" 
              primaryTypographyProps={{
                fontSize: '1.1rem',
                letterSpacing: '0.2px'
              }}
            />
          </ListItem>

          {/* Playlists Section */}
          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ px: 2, mb: 1, color: 'text.secondary' }}>
              YOUR PLAYLISTS
            </Typography>
            <ListItem 
              button 
              onClick={() => { navigate('/playlist/liked'); handleDrawerToggle(); }}
              sx={{ 
                py: 1.5,
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)' }
              }}
            >
              <ListItemText 
                primary="Liked Songs" 
                primaryTypographyProps={{
                  fontSize: '1rem',
                  letterSpacing: '0.2px'
                }}
              />
            </ListItem>
            <ListItem 
              button 
              onClick={() => { navigate('/playlist/rock-classics'); handleDrawerToggle(); }}
              sx={{ 
                py: 1.5,
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)' }
              }}
            >
              <ListItemText 
                primary="Rock Classics" 
                primaryTypographyProps={{
                  fontSize: '1rem',
                  letterSpacing: '0.2px'
                }}
              />
            </ListItem>
            <ListItem 
              button 
              onClick={() => { navigate('/playlist/pop-hits'); handleDrawerToggle(); }}
              sx={{ 
                py: 1.5,
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)' }
              }}
            >
              <ListItemText 
                primary="Pop Hits" 
                primaryTypographyProps={{
                  fontSize: '1rem',
                  letterSpacing: '0.2px'
                }}
              />
            </ListItem>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', my: 2 }} />

          {/* Footer Menu Items */}
          <ListItem 
            button 
            onClick={handleDrawerToggle}
            sx={{ 
              py: 1.5,
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)' }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Help"
              primaryTypographyProps={{
                fontSize: '1.1rem',
                letterSpacing: '0.2px'
              }}
            />
          </ListItem>
          <ListItem 
            button 
            onClick={handleDrawerToggle}
            sx={{ 
              py: 1.5,
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)' }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <DownloadIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Download"
              primaryTypographyProps={{
                fontSize: '1.1rem',
                letterSpacing: '0.2px'
              }}
            />
          </ListItem>
          <ListItem 
            button 
            onClick={handleDrawerToggle}
            sx={{ 
              py: 1.5,
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)' }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <PrivacyIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Privacy"
              primaryTypographyProps={{
                fontSize: '1.1rem',
                letterSpacing: '0.2px'
              }}
            />
          </ListItem>
          <ListItem 
            button 
            onClick={handleDrawerToggle}
            sx={{ 
              py: 1.5,
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)' }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <TermsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Terms"
              primaryTypographyProps={{
                fontSize: '1.1rem',
                letterSpacing: '0.2px'
              }}
            />
          </ListItem>
        </Box>
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: theme.zIndex.drawer + 1,
        display: { xs: mobileOpen ? 'none' : 'block', md: 'block' }
      }}
    >
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

        {/* Desktop navigation and search */}
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

        {/* Responsive Search Bar */}
        {!isMobile && (
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
        )}

        {/* Mobile: show search icon, expand to search bar on click */}
        {isMobile && !showMobileSearch && (
          <IconButton
            color="inherit"
            aria-label="open search"
            onClick={() => setShowMobileSearch(true)}
            sx={{ ml: 'auto' }}
          >
            <SearchIcon />
          </IconButton>
        )}
        {isMobile && showMobileSearch && (
          <Box sx={{ flexGrow: 1, mx: 2, display: 'flex', alignItems: 'center' }}>
            <Search sx={{ width: '100%', height: '40px' }}>
              <SearchIconWrapper>
                <SearchIcon sx={{ fontSize: 20 }} />
              </SearchIconWrapper>
              <StyledInputBase
                autoFocus
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ width: '100%' }}
              />
            </Search>
            <IconButton color="inherit" onClick={() => setShowMobileSearch(false)}>
              {/* X icon to close search */}
              <svg width="20" height="20" viewBox="0 0 20 20"><path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </IconButton>
          </Box>
        )}

        {/* Auth Buttons (desktop only) */}
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
            Log In
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Sign Up
          </Button>
        </Box>

        {/* Mobile Menu */}
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              bgcolor: '#000',
              height: '100%',
              color: 'common.white',
            }
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.85)'
            },
            '& .MuiDrawer-paper': { 
              width: '100%',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
