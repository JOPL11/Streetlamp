import React, { useState } from 'react';

const CopyrightNotice = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        zIndex: 99999,
        color: 'white',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        opacity: isHovered ? 1 : 0.2,
        transition: 'opacity 0.3s ease',
        cursor: 'pointer',
        pointerEvents: 'auto',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
        MozUserSelect: 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        // Optional: Add click handler if needed
        console.log('Copyright notice clicked');
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div></div>
        <a 
          href="mailto: jan.peiro@protonmail.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            color: 'inherit',
            textDecoration: 'none',
            borderBottom: '0px solid rgba(255,255,255,0.5)',
            lineHeight: '1.2',
            marginTop: '4px'
          }}
        >
          © 2023 Jan Peiro
        </a>
        <div style={{ fontSize: '0.9em', opacity: 0.8, marginTop: '4px' }}></div>
      </div>
    </div>
  );
};

export default CopyrightNotice;
