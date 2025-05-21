import { Box, Container, Typography, useTheme } from '@mui/material';

const sidebarWidth = 240;

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        py: 6,
        mt: 0,
        ml: `${sidebarWidth}px`,
        borderTop: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        zIndex: 1000,
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
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
            © {new Date().getFullYear()} Mazika. All rights reserved.
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              fontSize: '0.75rem',
              opacity: 0.7,
            }}
          >
            Made with ❤️ for music lovers
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
