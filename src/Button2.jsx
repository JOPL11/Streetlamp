import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Button2 = ({ onClick }) => {
  const buttonRef2 = useRef();
  const [isHovered2, setIsHovered2] = useState(false);

  // Load texture with useLoader
  const touchTexture2 = useLoader(THREE.TextureLoader, '/zone.png'); // Path to your texture

  // Handle click event
  const handleClick2 = () => {
   // window.open('https://www.jopl.de/2/Facility/index.html', '_self')
    console.log('clickA1');
 //   onClick();
    console.log('clickA2');
  };

  const handlePointerOver2 = () => {
    setIsHovered2(true);
    document.body.style.cursor = "pointer";
    console.log('overButton2');
  };

  const handlePointerOut2 = () => {
    setIsHovered2(false);
    document.body.style.cursor = "auto";
    console.log('outButton2');
  };

  // Use useFrame to update button appearance or position based on hover state
  useFrame(() => {
    const button2Mesh = buttonRef2.current;
    if (button2Mesh) {
      button2Mesh.material.color.set(isHovered2 ? 0xff0000 : 0xffffff); // Change color on hover
    }
  });

  return (
    <mesh 
      ref={buttonRef2} 
    //  onClick={handleClick2}
      onPointerEnter={handlePointerOver2}
      onPointerLeave={handlePointerOut2}
      position={[-0.023, 1.42, 0.07]} 
      rotation={[0, Math.PI / 0.538, 0]} 
    >
      <planeGeometry args={[0.25, 0.35]} />
      <meshStandardMaterial 
        transparent 
        map={touchTexture2} // Use the loaded texture
        opacity={1} 
      />
    </mesh>
  );
};

export default Button2;