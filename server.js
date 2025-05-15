const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Mock Data
const mfes = [
  { id: 1, repository: 'github.com/org/trading-dashboard', name: 'Trading Dashboard', countries: ['US', 'UK'], commitIds: ['abc123', 'abc124'] },
  { id: 2, repository: 'github.com/org/portfolio-view', name: 'Portfolio View', countries: ['UK'], commitIds: ['def456'] },
  { id: 3, repository: 'github.com/org/order-management', name: 'Order Management', countries: ['US'], commitIds: ['ghi789', 'ghi790'] },
  { id: 4, repository: 'github.com/org/market-data', name: 'Market Data', countries: ['SG', 'US'], commitIds: ['jkl012'] },
];

const apis = [
  { id: 1, microserviceName: 'Order Service', name: 'Order API', apiUri: '/api/order', method: 'POST', country: ['US', 'UK'], repository: 'github.com/org/order-api', commitId: 'a1b2c3', consumedBy: ['Trading Dashboard', 'Order Management'], type: 'Internal', swagger: 'https://swagger.io/order-api' },
  { id: 2, microserviceName: 'Portfolio Service', name: 'Portfolio API', apiUri: '/api/portfolio', method: 'GET', country: ['UK'], repository: 'github.com/org/portfolio-api', commitId: 'd4e5f6', consumedBy: ['Portfolio View'], type: 'Internal', swagger: 'https://swagger.io/portfolio-api' },
  { id: 3, microserviceName: 'Market Data Service', name: 'Market Data API', apiUri: '/api/market-data', method: 'GET', country: ['SG', 'US'], repository: 'github.com/org/market-data-api', commitId: 'g7h8i9', consumedBy: ['Trading Dashboard', 'Market Data'], type: 'External', swagger: 'https://swagger.io/market-data-api' },
  { id: 4, microserviceName: 'Trading Service', name: 'Trading API', apiUri: '/api/trading', method: 'POST', country: ['US'], repository: 'github.com/org/trading-api', commitId: 'j1k2l3', consumedBy: ['Order Management'], type: 'Internal', swagger: 'https://swagger.io/trading-api' },
];

const repositories = [
  { id: 1, name: 'trading-dashboard', type: 'MFE', url: 'https://github.com/org/trading-dashboard' },
  { id: 2, name: 'portfolio-view', type: 'MFE', url: 'https://github.com/org/portfolio-view' },
  { id: 3, name: 'order-management', type: 'MFE', url: 'https://github.com/org/order-management' },
  { id: 4, name: 'market-data', type: 'MFE', url: 'https://github.com/org/market-data' },
  { id: 5, name: 'order-api', type: 'API', url: 'https://github.com/org/order-api' },
  { id: 6, name: 'portfolio-api', type: 'API', url: 'https://github.com/org/portfolio-api' },
  { id: 7, name: 'market-data-api', type: 'API', url: 'https://github.com/org/market-data-api' },
  { id: 8, name: 'trading-api', type: 'API', url: 'https://github.com/org/trading-api' },
];

let flows = [
  {
    id: 1,
    country: 'US',
    name: 'Order Execution',
    description: 'Order journey from user to downstream systems.',
    diagram: `@startuml\nactor User\nparticipant "Trading Dashboard (MFE)" as MFE1\nparticipant "Order API" as API1\nparticipant "Order Service (Downstream)" as Down1\nUser -> MFE1: initiates\nMFE1 -> API1: calls\nAPI1 -> Down1: forwards\n@enduml`
  },
  {
    id: 2,
    country: 'US',
    name: 'Portfolio Update',
    description: 'Portfolio update journey.',
    diagram: `@startuml\nactor User\nparticipant "Portfolio View (MFE)" as MFE\nparticipant "Portfolio API" as API\nparticipant "Portfolio Service (Downstream)" as Service\nUser -> MFE: initiates\nMFE -> API: calls\nAPI -> Service: forwards\n@enduml`
  },
  {
    id: 3,
    country: 'UK',
    name: 'Order Execution',
    description: 'Order journey in the UK (different downstream).',
    diagram: `@startuml\nactor User\nparticipant "Trading Dashboard (MFE)" as MFE1\nparticipant "Order API" as API1\nparticipant "Order Service UK" as Down1\nUser -> MFE1: initiates\nMFE1 -> API1: calls\nAPI1 -> Down1: forwards\n@enduml`
  },
  {
    id: 4,
    country: 'UK',
    name: 'Portfolio Update',
    description: 'Portfolio update journey in the UK.',
    diagram: `@startuml\nactor User\nparticipant "Portfolio View (MFE)" as MFE\nparticipant "Portfolio API" as API\nparticipant "Portfolio Service UK" as Service\nUser -> MFE: initiates\nMFE -> API: calls\nAPI -> Service: forwards\n@enduml`
  },
];

const dashboardStats = {
  stats: { mfes: mfes.length, apis: apis.length, repositories: repositories.length },
  updates: [
    'Added new Order Execution Flow documentation',
    'Updated Portfolio View MFE documentation',
    'Added new Market Data API endpoints'
  ]
};

// Endpoints
app.get('/api/mfes', (req, res) => res.json(mfes));
app.get('/api/apis', (req, res) => res.json(apis));
app.get('/api/repositories', (req, res) => res.json(repositories));
app.get('/api/flows', (req, res) => res.json(flows));
app.get('/api/dashboard-stats', (req, res) => res.json(dashboardStats));

// Add this endpoint for dynamic update
app.post('/api/flows/update', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Body must be an array of flows' });
  }
  flows = req.body;
  res.json({ status: 'ok', updated: flows.length });
});

// Add update endpoints for mfes, apis, repositories
app.post('/api/mfes/update', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Body must be an array of mfes' });
  }
  mfes.length = 0;
  req.body.forEach(item => mfes.push(item));
  res.json({ status: 'ok', updated: mfes.length });
});

app.post('/api/apis/update', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Body must be an array of apis' });
  }
  apis.length = 0;
  req.body.forEach(item => apis.push(item));
  res.json({ status: 'ok', updated: apis.length });
});

app.post('/api/repositories/update', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Body must be an array of repositories' });
  }
  repositories.length = 0;
  req.body.forEach(item => repositories.push(item));
  res.json({ status: 'ok', updated: repositories.length });
});

app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
