import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Dashboard() {
  const [search, setSearch] = useState('');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 420, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" component="h1" fontWeight={700} gutterBottom align="center">
          Knowledge Base
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4, maxWidth: 600 }}>
          All the resources you need to get the most out of your platform, quickly and effectively!
        </Typography>
    {/* Sidebar for flow selection   <TextField
          fullWidth
          placeholder="Search .."
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            sx: { borderRadius: 3, background: '#fff' },
          }}
        /> */} 
      </Box>
      {search && (
        <Box sx={{ width: '100%', maxWidth: 600, mb: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography color="text.secondary">No results found.</Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default Dashboard; 