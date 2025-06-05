import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Html } from '@react-three/drei';

const WelcomeDiv = ({ levelUpButtonVisible, triggerLevelUp }) => {
  const welcomeDivRef = useRef(null);
// Welcome Div styles
const welcomeDivStyles = {
  fontFamily: 'InterDisplay, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'left',
  position: 'relative',  // Absolute positioning, no 'left' for now
  top: '10vh',          // 20% of viewport height
  left: '-2vw',       // 50% of viewport width
  transform: 'translate(-50%, -50%)', // Starting centered
  fontSize: '25px',
  color: 'white',
  zIndex: 600,
  textAlign: 'left',
  width: '300px',
  maxWidth: '600px',
  padding: '5px',
  backgroundColor: 'rgba(0, 0, 0, 0.0)',
  opacity: 1, // Initially hidden
  willChange: 'transform, opacity',
};


useEffect(() => {
  if (levelUpButtonVisible) {
    // Use GSAP to animate both opacity and position
    gsap.to('.welcome', {
      opacity: 0.9,              // Fade in
      y: 40,                    // Move to its final position on the y-axis
      x: -150,                    // Adjust this for x positioning
      duration: 2,             // Duration of animation
      ease: 'power2.out',      // Smooth ease out
    });
  }
}, [levelUpButtonVisible]);

  return (
    <Html>
      <div className="welcome" ref={welcomeDivRef} style={welcomeDivStyles}> 
        <div style={{ textAlign: 'left', fontSize: '80px', fontFamily: 'Antonio, sans-serif', zIndex: 4999, opacity: 1 }}> 
          
        </div>
        <div>This is text.</div>
        <div>You can read it</div>
        <div>or not, up to you.</div>
        <div>Means nothing either way.</div>

        {levelUpButtonVisible && (
          <button
            className="levelup-button"
           // onClick={triggerLevelUp}
           // onClick={() => window.open('https://www.jopl.de/2/Facility2/index.html', '_self')}
            style={{
              zIndex: 3999,
              fontFamily: 'InterDisplay, sans-serif',
              top: '30px',
              height: '50px',
              width: '150px',
              padding: '5px',
              position: 'relative',
              backgroundColor: '#009933',
              fontSize: '20px',
              border: 'none',
              color: 'white',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            Next Scene
          </button>       
        )}

      <div style={{fontSize: '13px', letterSpacing: '0.1em', lineHeight: '5.8', marginTop: '30px'}}>yeah those are little sci-fi drones</div>
      <div style={{fontSize: '13px', letterSpacing: '0.1em',  lineHeight: '1.5', marginTop: '-30px' }}>they take care of that tree</div>
      </div>
    </Html>
  );
};

export default WelcomeDiv;