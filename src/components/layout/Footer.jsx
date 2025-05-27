import { Box, Container, Typography, Grid, Link, IconButton, useTheme } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const sidebarWidth = 240;

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'static',
        left: 'unset',
        bottom: 'unset',
        bgcolor: 'background.paper',
        zIndex: 1300,
        p: { xs: 0.5, md: 2 }, // Smaller padding on mobile
        borderTop: 1,
        borderColor: 'divider',
        boxSizing: 'border-box',
        minHeight: { xs: 36, md: 56 }, // Smaller height on mobile
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Useful Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Useful Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/playlist/top-hits" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                Today's Top Hits
              </Link>
              <Link href="/playlist/jazz" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                Jazz Collection
              </Link>
              <Link href="/playlist/rap" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                Rap Essentials
              </Link>
              <Link href="/playlist/rock" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                Rock Classics
              </Link>
              <Link href="/playlist/metal" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                Metal Masters
              </Link>
            </Box>
          </Grid>

          {/* Company */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                About Mazika
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                Team Mazika
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                Careers
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                Press
              </Link>
            </Box>
          </Grid>

          {/* Help */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Help
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                Help Center
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                Community Guidelines
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                Terms of Service
              </Link>
              <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Socialize with Mazika
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <IconButton 
                color="inherit" 
                aria-label="Instagram"
                sx={{ '&:hover': { color: 'text.primary' } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                aria-label="Facebook"
                sx={{ '&:hover': { color: 'text.primary' } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                aria-label="Twitter"
                sx={{ '&:hover': { color: 'text.primary' } }}
              >
                <TwitterIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Follow us for the latest updates, music news, and exclusive content.
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box 
          sx={{ 
            textAlign: 'center',
            mt: 4,
            pt: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            © {new Date().getFullYear()} All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
