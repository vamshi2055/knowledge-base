import React from 'react';
import plantumlEncoder from 'plantuml-encoder';

const PlantUML = ({ diagram }) => {
  if (!diagram) return null;

  const encoded = plantumlEncoder.encode(diagram);
  const plantUMLUrl = `https://www.plantuml.com/plantuml/svg/${encoded}`;

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <img 
        src={plantUMLUrl} 
        alt="PlantUML Diagram" 
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default PlantUML; 