import React from 'react';
import UserCrud from './../components/UserCrud';
import Box from '@mui/material/Box';

export default function User() {
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      margin: '0 auto',
      padding: '0 16px',
      height: '100%',
    }}
    >
      <UserCrud />
    </Box>
  );
}
