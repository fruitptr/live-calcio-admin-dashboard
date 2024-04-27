import React from 'react';
import HandleStats from '../components/HandleStats';
import Box from '@mui/material/Box';

export default function Stats() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: '0 auto',
        padding: '0 16px'
      }}
    >
      <HandleStats />
    </Box>
  );
}
