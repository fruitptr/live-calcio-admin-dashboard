import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 120, color: 'error.main' }} />
      <Typography variant="h2" color="textPrimary" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Oops! The page you're looking for could not be found.
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        The page may have been moved or doesn't exist.
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Go back to <Link to="/">Home</Link> or contact support if you believe
        this is an error.
      </Typography>
    </Box>
  );
};

export default NotFound;
