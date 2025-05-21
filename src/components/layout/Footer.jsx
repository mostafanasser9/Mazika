import { Box, Container, Typography } from '@mui/material';

const sidebarWidth = 240;

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'black',
        color: 'white',
        py: 6,
        mt: 0,
        ml: `${sidebarWidth}px`,  // push footer to the right to start after sidebar ends
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
