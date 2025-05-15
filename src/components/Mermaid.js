import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

const Mermaid = ({ chart }) => {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  const idRef = useRef('mermaid-' + Math.random().toString(36).substr(2, 9));
  const hiddenDivRef = useRef(null);

  useEffect(() => {
    setError('');
    setSvg('');
    if (chart && chart.trim()) {
      try {
        // Validate the diagram
        mermaid.parse(chart);
        // Create a hidden div in the DOM for rendering
        if (hiddenDivRef.current) {
          mermaid.render(idRef.current, chart, (svgCode) => {
            setSvg(svgCode);
          }, hiddenDivRef.current);
        }
      } catch (e) {
        console.error('Mermaid render error:', e);
        let errorMsg = '';
        if (e && typeof e === 'object') {
          errorMsg = e.message || JSON.stringify(e, null, 2);
        } else {
          errorMsg = String(e);
        }
        setError(errorMsg);
      }
    }
  }, [chart]);

  if (error) {
    return <pre style={{ color: 'red' }}>Mermaid Error: {error}</pre>;
  }

  return (
    <>
      <div ref={hiddenDivRef} style={{ display: 'none' }} />
      <div
        style={{ overflowX: 'auto' }}
        dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
      />
    </>
  );
};

export default Mermaid; 