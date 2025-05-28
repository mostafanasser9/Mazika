import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import { signupSchema } from '../../schemas/validation';
import { useNavigate } from 'react-router-dom';
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SocialButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  borderRadius: '50px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.divider}`,
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'scale(1.02)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'transparent',
    color: 'white',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.7)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: 'rgba(255, 255, 255, 0.9)',
    },
  },
  '& .MuiOutlinedInput-input': {
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
      opacity: 1,
    },
  },
}));

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate('/login'); // Navigate to login page after successful signup
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        padding: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 2,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Sign up for Mazika
      </Typography>

      <SocialButton 
        startIcon={<GoogleIcon />}
        sx={{ 
          backgroundColor: '#fff',
          color: '#000',
          '&:hover': {
            backgroundColor: '#f1f1f1',
          }
        }}
      >
        Continue with Google
      </SocialButton>

      <SocialButton 
        startIcon={<FacebookIcon />}
        sx={{ 
          backgroundColor: '#1877f2',
          color: '#fff',
          borderColor: '#1877f2',
          '&:hover': {
            backgroundColor: '#1864d4',
            borderColor: '#1864d4',
          }
        }}
      >
        Continue with Facebook
      </SocialButton>

      <SocialButton 
        startIcon={<AppleIcon />}
        sx={{ 
          backgroundColor: '#000',
          color: '#fff',
          borderColor: '#000',
          '&:hover': {
            backgroundColor: '#1a1a1a',
            borderColor: '#1a1a1a',
          }
        }}
      >
        Continue with Apple
      </SocialButton>

      <Divider sx={{ 
        my: 2, 
        '&::before, &::after': { 
          borderColor: 'rgba(255, 255, 255, 0.1)'
        },
        '& .MuiDivider-wrapper': {
          color: 'rgba(255, 255, 255, 0.7)',
          padding: '0 10px',
        },
        '&.MuiDivider-root': {
          '&::before, &::after': {
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }
        },
        backgroundColor: 'transparent'
      }}>
        or
      </Divider>

      <StyledTextField
        label="Username"
        fullWidth
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <StyledTextField
        label="Email"
        type="email"
        fullWidth
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <StyledTextField
        label="Password"
        type="password"
        fullWidth
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <StyledTextField
        label="Confirm Password"
        type="password"
        fullWidth
        {...register('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        sx={{
          mt: 2,
          py: 1.5,
          fontSize: '1rem',
          borderRadius: '50px',
          textTransform: 'none',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        Sign Up
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Already have an account?{' '}
          <Button
            color="primary"
            onClick={() => navigate('/login')}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              },
            }}
          >
            Log In
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupForm;