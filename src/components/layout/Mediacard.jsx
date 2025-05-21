import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  useTheme,
} from '@mui/material';
import { PlayButton } from '../layout/Miniplayer'; // Adjust the import path if needed

// Reusable Card for Song/Artist/Podcast
const MediaCard = ({ item, type = 'song', layout = 'vertical', onPlay }) => {
  const theme = useTheme();
  const title = type === 'artist' ? item.name : item.title;
  const subtitle =
    type === 'song' ? item.artist : type === 'podcast' ? item.host : null;

  const cardHeightHorizontal = 135;
  const cardWidthHorizontal = 380;
  const verticalImageHeight = 210;
  const cardHeightVertical = 300; // Fixed height for vertical cards (adjust as needed)

  return (
    <Card
      sx={{
        bgcolor: '#222',
        color: 'white',
        position: 'relative',
        display: 'flex', // Use flex for vertical layout
        flexDirection: layout === 'horizontal' ? 'row' : 'column', // Column for vertical
        cursor: 'pointer',
        borderRadius: 1,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.04)',
          boxShadow: `0 8px 20px ${theme.palette.primary.main}80`,
        },
        '&:hover .playButton': {
          opacity: 1,
        },
        height: layout === 'horizontal' ? cardHeightHorizontal : cardHeightVertical, // Fixed height for vertical
        width: layout === 'horizontal' ? cardWidthHorizontal : 210,
        maxWidth: layout === 'horizontal' ? cardWidthHorizontal : 'none',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: layout === 'horizontal' ? cardHeightHorizontal : '100%',
          height: layout === 'horizontal' ? cardHeightHorizontal : verticalImageHeight, // Set desired image height for vertical
          overflow: 'hidden',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          image={item.img}
          alt={title}
        />

        {onPlay && (
          <Box
            className="playButton"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0,
              transition: 'opacity 0.3s',
              cursor: 'pointer',
              zIndex: 10,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onPlay(item);
            }}
            aria-label={`Play ${title}`}
          >
            <PlayButton size={40} ariaLabel={`Play ${title}`} />
          </Box>
        )}
      </Box>

      <CardContent sx={layout === 'horizontal' ? { p: 1, flexGrow: 1 } : { p: '1.5', flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Typography
          variant="h6"
          sx={{
            whiteSpace: 'nowrap', // Prevent title from wrapping to maintain consistent height
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: layout === 'horizontal' ? '1rem' : '0.9rem',
            marginBottom: 0.3,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            color="grey.400"
            sx={{
              whiteSpace: 'nowrap', // Prevent subtitle from wrapping
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '0.8rem',
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