import React from 'react';
import HandleStats from '../components/HandleStats';
import Box from '@mui/material/Box';
import IntegratedMenuDrawer from './../components/IntegratedMenuDrawer';

export default function Stats() {
  return (
    <>
      <IntegratedMenuDrawer />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          margin: '0 auto',
          padding: '0 16px',
          height: '100%'
        }}
      >
        <HandleStats />
      </Box>
    </>
  );
}
