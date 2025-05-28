import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
  Fade,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  MusicNote as MusicNoteIcon,
  Download as DownloadIcon,
  Devices as DevicesIcon,
  Headphones as HeadphonesIcon,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, rgba(3,26,68,0.95) 0%, rgba(18,18,18,0.95) 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/images/dj.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.4,
    zIndex: 1,
  },
}));

const FloatingCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  width: 200,
  height: 200,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[10],
  cursor: 'pointer',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
    transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&:hover': {
    '& img': {
      transform: 'scale(1.1)',
    },
    '&::after': {
      opacity: 0.5,
    },
  },
}));

const Separator = styled(Box)(({ theme }) => ({
  height: 4,
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  margin: theme.spacing(8, 0),
  borderRadius: 2,
}));

const Logo = styled(Typography)({
  color: '#FFFFFF',
  fontWeight: 'bold',
  letterSpacing: 4,
});

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '400px',
  width: '320px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.card,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    backgroundColor: theme.palette.background.cardHover,
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  width: '100%',
  padding: '0 8px',
  lineHeight: 1.2,
}));

const CardDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  width: '100%',
  padding: '0 8px',
  lineHeight: 1.4,
}));

const AuthButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
  backgroundColor: 'transparent',
  transition: 'color 0.2s ease-in-out',
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
  },
}));


const AuthContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 10,
  display: 'flex',
  gap: theme.spacing(2),
}));

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [showSplash, setShowSplash] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handlePlayMusic = () => {
    navigate('/home');
  };

  const floatingCards = [
    {
      image: '/images/scorpion.jpeg',
      position: 'left',
    },
    {
      image: '/images/pablo.jpeg',
      position: 'right',
    },
    {
      image: '/images/bohemian.jpeg',
      position: 'left',
    },
    {
      image: '/images/amrdiab.jpeg',
      position: 'right',
    },
  ];

  return (
    <Box>
      <Fade in={showSplash} timeout={500}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            zIndex: 9999,
            background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(240,240,240,1) 100%)',
          }}
        >
          <Logo variant="h1" sx={{ color: '#000000' }}>MAZIKA</Logo>
        </Box>
      </Fade>

      {/* Hero Section */}
      <HeroSection>
        <AuthContainer>
          <AuthButton onClick={() => navigate('/login')}>Log In</AuthButton>
          <AuthButton onClick={() => navigate('/signup')}>Sign Up</AuthButton>
        </AuthContainer>
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Logo variant="h1">MAZIKA</Logo>
          </Box>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    color: 'white',
                    fontWeight: 700,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  All the music you love, all the freedom you need
                </Typography>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{ 
                    color: 'white',
                    mb: 4,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  Arabic and International in one place
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handlePlayMusic}
                  startIcon={<PlayIcon />}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.2rem',
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Start Playing
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', height: 400 }}>
                {floatingCards.map((card, index) => (
                  <FloatingCard
                    key={index}
                    initial={{ opacity: 0, x: card.position === 'left' ? -100 : 100 }}
                    animate={{ 
                      opacity: 1, 
                      x: hoveredCard === index 
                        ? (card.position === 'left' ? -150 : 150) 
                        : (card.position === 'left' ? 0 : 0),
                    }}
                    transition={{ 
                      duration: 0.5,
                      delay: card.delay,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{
                      position: 'absolute',
                      left: card.position === 'left' ? '10%' : '60%',
                      top: `${index * 25}%`,
                      animation: `${float} ${3 + index}s ease-in-out infinite`,
                    }}
                    onHoverStart={() => setHoveredCard(index)}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <img src={card.image} alt={`Album ${index + 1}`} />
                  </FloatingCard>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Separator />

      {/* Features Section */}
      <Box sx={{ 
        py: 12,
        background: theme.palette.background.gradient.content,
      }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              textAlign="center" 
              gutterBottom
              sx={{ 
                color: theme.palette.primary.light,
                fontWeight: 700,
                mb: 8,
              }}
            >
              That sounds great
            </Typography>
          </motion.div>
          <Grid 
            container 
            spacing={6} 
            justifyContent="center"
            sx={{
              '& .MuiGrid-item': {
                display: 'flex',
                justifyContent: 'center',
              }
            }}
          >
            {[
              {
                title: 'Unlimited. Downloads.',
                description: 'Download any song. Play it offline. Save Data.',
                icon: <DownloadIcon sx={{ fontSize: 70 }} />,
              },
              {
                title: 'Exclusive music',
                description: 'Access exclusive content from your favorite artists.',
                icon: <MusicNoteIcon sx={{ fontSize: 70 }} />,
              },
              {
                title: 'High quality music',
                description: 'Play music in high-definition sound with Dolby 320 Kbps.',
                icon: <HeadphonesIcon sx={{ fontSize: 70 }} />,
              },
              {
                title: 'Connect Phones. Control Music.',
                description: 'Connect phones remotely without bluetooth and control your music.',
                icon: <DevicesIcon sx={{ fontSize: 70 }} />,
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <FeatureCard>
                    <CardContent sx={{ 
                      textAlign: 'center', 
                      py: 5,
                      px: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: '100%',
                    }}>
                      <Box sx={{ 
                        color: theme.palette.primary.light, 
                        mb: 4,
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {feature.icon}
                      </Box>
                      <CardTitle variant="h5" component="h3">
                        {feature.title}
                      </CardTitle>
                      <CardDescription variant="body1">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </FeatureCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ 
        '& .MuiContainer-root': {
          ml: 0,
          maxWidth: '100% !important',
        },
        '& .MuiBox-root': {
          ml: 0,
        },
      }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default LandingPage; 