import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

const elements = [
  { data: { id: 'user', label: 'User' } },
  { data: { id: 'mfe1', label: 'Trading Dashboard (MFE)' } },
  { data: { id: 'api1', label: 'Order API' } },
  { data: { id: 'down1', label: 'Order Service (Downstream)' } },
  { data: { id: 'mfe2', label: 'Order Management (MFE)' } },
  { data: { id: 'api2', label: 'Trading API' } },
  { data: { id: 'down2', label: 'Trading Engine (Downstream)' } },
  // Edges
  { data: { source: 'user', target: 'mfe1', label: 'initiates' } },
  { data: { source: 'mfe1', target: 'api1', label: 'calls' } },
  { data: { source: 'api1', target: 'down1', label: 'forwards' } },
  { data: { source: 'user', target: 'mfe2', label: 'initiates' } },
  { data: { source: 'mfe2', target: 'api2', label: 'calls' } },
  { data: { source: 'api2', target: 'down2', label: 'forwards' } },
];

const CytoscapeDemo = () => {
  const cyRef = useRef(null);

  useEffect(() => {
    const cy = cytoscape({
      container: cyRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#1976d2',
            'label': 'data(label)',
            'color': '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': 12,
            'width': 80,
            'height': 40,
            'shape': 'roundrectangle'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#888',
            'target-arrow-color': '#888',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-size': 10,
            'text-background-color': '#fff',
            'text-background-opacity': 1,
            'text-background-padding': 2
          }
        }
      ],
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 10
      }
    });

    return () => cy.destroy();
  }, []);

  return (
    <div>
      <h3>Cytoscape.js Demo</h3>
      <div ref={cyRef} style={{ width: '100%', height: 400, border: '1px solid #ccc' }} />
    </div>
  );
};

export default CytoscapeDemo; 