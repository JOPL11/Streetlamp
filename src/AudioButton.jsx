import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

function ButtonComponent() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // Hide the button when the window width is less than 500 pixels
      setVisible(window.innerWidth >= 500);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Canvas>
        {/* Your 3D scene */}
      </Canvas>
      {visible && (
        <button
          style={{
            position: 'absolute',
            top: '20%', // Adjust positioning as needed
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1 // Ensure it is above the canvas
          }}
          onClick={() => console.log('Button clicked')}
        >
          Click me!
        </button>
      )}
    </div>
  );
}

export default ButtonComponent;