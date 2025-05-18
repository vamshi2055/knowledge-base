import React, { useEffect, useState } from 'react';

const PlantUMLRemote = ({ diagram }) => {
  const [imgSrc, setImgSrc] = useState('');
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setImgSrc('');
    setSvg('');
    setError('');
    if (diagram && diagram.trim()) {
      fetch('http://localhost:8080/api/puml/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: diagram,
      })
        .then(async res => {
          if (!res.ok) throw new Error('Failed to generate diagram');
          const contentType = res.headers.get('Content-Type');
          if (contentType && contentType.includes('image/png')) {
            const blob = await res.blob();
            setImgSrc(URL.createObjectURL(blob));
          } else if (contentType && contentType.includes('image/svg+xml')) {
            const text = await res.text();
            setSvg(text);
          } else {
            throw new Error('Unknown response type: ' + contentType);
          }
        })
        .catch(e => setError(e.message));
    }
  }, [diagram]);

  if (error) return <pre style={{ color: 'red' }}>{error}</pre>;
  if (!imgSrc && !svg) return <div>Loading diagram...</div>;

  return imgSrc ? (
    <img src={imgSrc} alt="PlantUML Diagram" style={{ maxWidth: '100%' }} />
  ) : (
    <div
      style={{ overflowX: 'auto' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default PlantUMLRemote; 