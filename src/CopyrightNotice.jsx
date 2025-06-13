import React, { useState } from 'react';
import './CopyrightNotice.css';

const CopyrightNotice = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`copyright-notice ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        // Optional: Add click handler if needed
        console.log('Copyright notice clicked');
      }}
    >
      <div className="copyright-content">
        <a 
          href="mailto:jan.peiro@protonmail.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="copyright-link"
        >
          © 2025 Jan Peiro
        </a>
      </div>
    </div>
  );
};

export default CopyrightNotice;
