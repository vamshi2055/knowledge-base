import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
} from '@mui/material';

function MFEs() {
  const [mfeData, setMfeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/api/mfes')
      .then(res => res.json())
      .then(data => {
        setMfeData(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load MFEs');
        setLoading(false);
      });
  }, []);

  const countries = ['all', ...new Set(mfeData.map(mfe => mfe.country))];
  const statuses = ['all', ...new Set(mfeData.map(mfe => mfe.status))];

  const filteredMFEs = mfeData.filter(mfe => {
    const matchesSearch = mfe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mfe.commitId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = countryFilter === 'all' || mfe.country === countryFilter;
    const matchesStatus = statusFilter === 'all' || mfe.status === statusFilter;
    return matchesSearch && matchesCountry && matchesStatus;
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color='error'>{error}</Typography>;

  return (
    <Box sx={{ px: 4, py: 4, background: 'linear-gradient(90deg, #f5f7fa 0%, #e3eafc 100%)', minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Micro Frontends
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search MFEs"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              value={countryFilter}
              label="Country"
              onChange={(e) => setCountryFilter(e.target.value)}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country === 'all' ? 'All Countries' : country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>MFE Repo Name</TableCell>
              <TableCell>MFE Name</TableCell>
              <TableCell>Country's Used</TableCell>
              <TableCell>Commit IDs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMFEs.map((mfe) => (
              <TableRow key={mfe.id}>
                <TableCell>
                  <Typography
                    component="a"
                    href={`https://${mfe.repository}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                  >
                    {mfe.repository}
                  </Typography>
                </TableCell>
                <TableCell>{mfe.name}</TableCell>
                <TableCell>{Array.isArray(mfe.countries) ? mfe.countries.join(', ') : mfe.countries}</TableCell>
                <TableCell>{Array.isArray(mfe.commitIds) ? mfe.commitIds.join(', ') : mfe.commitIds}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MFEs; 