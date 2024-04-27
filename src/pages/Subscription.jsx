import React from 'react';
import SubscriptionCrud from '../components/SubscriptionCrud';
import Box from '@mui/material/Box';

export default function Subscription() {
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
      <SubscriptionCrud />
    </Box>
  );
}
