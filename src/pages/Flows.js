import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import PlantUMLRemote from '../components/PlantUMLRemote';

function Flows() {
  const [flows, setFlows] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/api/flows')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch flows');
        return res.json();
      })
      .then(data => {
        setFlows(data);
        const countryList = Array.from(new Set(data.map(f => f.country)));
        setCountries(countryList);
        setSelectedCountry(countryList[0] || '');
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const countryFlows = flows.filter(f => f.country === selectedCountry);

  useEffect(() => {
    setSelectedFlow(countryFlows[0] || null);
  }, [selectedCountry, flows]);

  if (loading) return <Typography>Loading flows...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!selectedFlow) return <Typography>No flows available for this country.</Typography>;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Customer Journey Flows
      </Typography>
      <Box sx={{ mb: 3, width: 220 }}>
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select
            value={selectedCountry}
            label="Country"
            onChange={e => setSelectedCountry(e.target.value)}
          >
            {countries.map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        {/* Sidebar for flow selection */}
        <Grid item xs={2}>
          <Paper className="flows-sidebar">
            <Typography variant="h6" gutterBottom>
              Available Flows
            </Typography>
            <List>
              {countryFlows.map((flow) => (
                <ListItem
                  button
                  key={flow.id}
                  selected={selectedFlow && selectedFlow.id === flow.id}
                  onClick={() => setSelectedFlow(flow)}
                >
                  <ListItemText primary={flow.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        {/* Main diagram area */}
        <Grid item xs={10} sx={{ pl: 0 }}>
          <Paper className="flows-main-paper" style={{ padding: 32, height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100vw' }}>
            <div className="flows-header" style={{ fontSize: 32 }}>{selectedFlow.name}</div>
            <div className="flows-description">{selectedFlow.description}</div>
            <div className="flows-diagram-area">
              <PlantUMLRemote diagram={selectedFlow.diagram} />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Flows; 