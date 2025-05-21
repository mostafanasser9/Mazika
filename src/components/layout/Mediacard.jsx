import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlayButton } from '../layout/Miniplayer';

// Reusable Card for Song/Artist/Podcast
const MediaCard = ({ item, type = 'song', layout = 'vertical', onPlay, isPlaying, isCurrentSong }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const title = type === 'artist' ? item.name : item.title;
  const subtitle =
    type === 'song' ? item.artist : type === 'podcast' ? item.host : null;

  const handleClick = () => {
    if (type === 'artist') {
      navigate(`/artist/${item.id}`);
    }
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        bgcolor: 'background.card',
        color: 'text.primary',
        position: 'relative',
        display: 'flex',
        flexDirection: layout === 'horizontal' ? 'row' : 'column',
        cursor: 'pointer',
        borderRadius: '12px',
        transition: theme.transitions.create(['transform', 'box-shadow', 'background-color'], {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeInOut,
        }),
        '&:hover': {
          transform: 'scale(1.04)',
          boxShadow: `0 8px 20px ${theme.palette.primary.main}40`,
          bgcolor: 'background.cardHover',
          '& .playButton': {
            opacity: 1,
          },
        },
        height: layout === 'horizontal' ? 135 : 280,
        width: layout === 'horizontal' ? 380 : 200,
        maxWidth: layout === 'horizontal' ? 380 : 200,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: layout === 'horizontal' ? 135 : '100%',
          height: layout === 'horizontal' ? 135 : 200,
          overflow: 'hidden',
          borderRadius: layout === 'horizontal' ? '12px 0 0 12px' : '12px 12px 0 0',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
              easing: theme.transitions.easing.easeInOut,
            }),
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
          image={item.img}
          alt={title}
        />

        {onPlay && (
          <Box
            className="playButton"
            sx={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              opacity: isCurrentSong ? 1 : 0,
              transition: theme.transitions.create('opacity', {
                duration: theme.transitions.duration.shorter,
                easing: theme.transitions.easing.easeInOut,
              }),
              cursor: 'pointer',
              zIndex: 10,
              '& .MuiIconButton-root': {
                bgcolor: 'primary.light',
                width: '56px',
                height: '56px',
                '&:hover': {
                  bgcolor: 'primary.hover',
                  transform: 'scale(1.1)',
                },
                '& .MuiSvgIcon-root': {
                  color: 'black',
                },
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              onPlay(item);
            }}
            aria-label={`Play ${title}`}
          >
            <PlayButton 
              size={56} 
              ariaLabel={`Play ${title}`} 
              isPlaying={isCurrentSong && isPlaying}
            />
          </Box>
        )}
      </Box>

      <CardContent 
        sx={{ 
          p: layout === 'horizontal' ? 1 : 1.5, 
          flexGrow: 1, 
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start',
          transition: theme.transitions.create('background-color', {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeInOut,
          }),
        }}
      >
        <Typography
          variant="h6"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: layout === 'horizontal' ? '1rem' : '0.9rem',
            marginBottom: 0.3,
            color: 'text.primary',
            transition: theme.transitions.create('color', {
              duration: theme.transitions.duration.shorter,
              easing: theme.transitions.easing.easeInOut,
            }),
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '0.8rem',
              color: 'text.secondary',
              transition: theme.transitions.create('color', {
                duration: theme.transitions.duration.shorter,
                easing: theme.transitions.easing.easeInOut,
              }),
            }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaCard;