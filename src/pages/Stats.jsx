import React from 'react';
import HandleStats from '../components/HandleStats';
import Box from '@mui/material/Box';

export default function Stats() {
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start', // Align items to the top
      margin: '0 auto',
      padding: '0 16px',
      height: '100%', // Set height to 100% to occupy the available space
    }}
    >
      <HandleStats />
    </Box>
  );
}
