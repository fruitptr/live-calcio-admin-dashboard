import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Navigate } from 'react-router-dom';
import { FIREBASE_APP, FIREBASE_AUTH } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { login } from '../store/authUser/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const auth = FIREBASE_AUTH;
    if (email == 'admin-livecalcio@gmail.com') {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
          console.log('Signed in as:', user.email);
          dispatch(login());
          toast.success('Login successful');
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Error signing in:', errorCode, errorMessage);
        });
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        {isAuthenticated && <Navigate to="/User" replace={true} />}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 48, color: '#b40000' }} />
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <PersonOutlineIcon
                    sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                  />
                )
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <LockOutlinedIcon
                    sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                  />
                )
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color: 'white',
                backgroundColor: '#b40000',
                '&:hover': { backgroundColor: '#c50000' }
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignInPage;
