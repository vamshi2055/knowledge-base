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
  Link,
} from '@mui/material';

function APIs() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/api/apis')
      .then(res => res.json())
      .then(data => {
        setApiData(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load APIs');
        setLoading(false);
      });
  }, []);

  const countries = ['all', ...Array.from(new Set(apiData.flatMap(api => api.country)))];
  const types = ['all', ...new Set(apiData.map(api => api.type))];

  const filteredAPIs = apiData.filter(api => {
    const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.commitId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = countryFilter === 'all' || api.country.includes(countryFilter);
    const matchesType = typeFilter === 'all' || api.type === typeFilter;
    return matchesSearch && matchesCountry && matchesType;
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color='error'>{error}</Typography>;

  return (
    <Box sx={{ px: 4, py: 4, background: 'linear-gradient(90deg, #f5f7fa 0%, #e3eafc 100%)', minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Microservice APIs
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search APIs"
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
            <InputLabel>API Type</InputLabel>
            <Select
              value={typeFilter}
              label="API Type"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
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
              <TableCell>Microservice Name</TableCell>
              <TableCell>API Name</TableCell>
              <TableCell>API URI</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Countries Used</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Swagger Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAPIs.map((api) => (
              <TableRow key={api.id}>
                <TableCell>{api.microserviceName}</TableCell>
                <TableCell>{api.name}</TableCell>
                <TableCell>{api.apiUri}</TableCell>
                <TableCell>{api.method}</TableCell>
                <TableCell>
                  {api.country.map((c) => (
                    <Chip key={c} label={c} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                  ))}
                </TableCell>
                <TableCell>{api.type}</TableCell>
                <TableCell>
                  <Link href={api.swagger} target="_blank" rel="noopener noreferrer">
                    Swagger
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default APIs; 