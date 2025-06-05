import React, { useRef, useEffect } from 'react';
import Scrollbar from 'smooth-scrollbar';
import { Html } from '@react-three/drei';

const ScrollComponent = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollbar = Scrollbar.init(scrollRef.current, { damping: 0.1 });

      return () => {
        scrollbar.destroy();
      };
    }
  }, []);

  return (
    <>
    <Html>
    <div
      ref={scrollRef}
      style={{
        position: 'fixed', // Use fixed to stay in place during scroll
        top: 0,
        left: 0,
        width: '100%',
        height: '100%', // Full viewport height
        overflow: 'hidden', // Prevent overflow
        zIndex: 10, // Keep it on top of the canvas
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional background
      }}
    >
      <div style={{ padding: '20px', color: 'white', overflowY: 'scroll', height: '100%' }}>
        <h1>DO ANDROIDS</h1>
        <h2>DREAM OF</h2>
        <h1>SIMULATIONS</h1>


        {/* Add more content as necessary */}
      </div>
    </div>
    </Html>
    </>
  );
};

export default ScrollComponent;