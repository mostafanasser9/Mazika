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
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 500,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  transition: 'background-color 0.3s ease',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const goToHome = () => {
    navigate('/');
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
          <IconButton color="inherit" sx={{ ml: 3 }} onClick={goToHome}>
            <HomeIcon />
          </IconButton>
        )}

        {/* Search Bar */}
        <Search sx={{ flexGrow: 1, maxWidth: { xs: '100%', md: '400px' }, mx: 'auto' }}>
          <SearchIconWrapper>
            <SearchIcon />
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
<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
  <Button
    variant="contained"
    sx={{
      backgroundColor: 'inherit',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#222',
      },
    }}
  >
    Login
  </Button>
  <Button variant="contained" color="primary" sx={{ ml: 2 }}>
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
