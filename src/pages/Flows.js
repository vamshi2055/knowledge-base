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
import PlantUML from '../components/PlantUML';

function Flows() {
  const [flows, setFlows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedFlow, setSelectedFlow] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/api/flows')
      .then(res => res.json())
      .then(data => {
        setFlows(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load flows');
        setLoading(false);
      });
  }, []);

  // Compute countries and countryFlows after hooks
  const countries = Array.from(new Set(flows.map(f => f.country)));
  const countryFlows = flows.filter(f => f.country === selectedCountry);

  useEffect(() => {
    setSelectedFlow(countryFlows[0]);
  }, [selectedCountry, flows]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color='error'>{error}</Typography>;

  return (
    <Box sx={{ px: 4, py: 4, background: 'linear-gradient(90deg, #f5f7fa 0%, #e3eafc 100%)', minHeight: '100vh' }}>
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
                  selected={selectedFlow?.id === flow.id}
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
            <div className="flows-header" style={{ fontSize: 32 }}>{selectedFlow?.name}</div>
            <div className="flows-description">{selectedFlow?.description}</div>
            <div className="flows-diagram-area">
              <PlantUML diagram={selectedFlow?.diagram} />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Flows; 