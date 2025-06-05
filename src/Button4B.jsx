// Button4B.jsx
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

const Button4B = ({ onClick }) => {
  const { scene, camera, raycaster } = useThree();
  const buttonRef4 = useRef();
  const [isHovered4, setIsHovered4] = useState(false); // State to track hover state


  // Handle click event
  const handleClick = () => {
    console.log('click4B');
    onClick();
    console.log('click4B2');
  };

  // Create plane geometry for the button
  const touchTexture4B = new THREE.TextureLoader().load('./touch.png');
  const geometryButton4B = new THREE.PlaneGeometry(0.45, 0.58);
  const materialButton4B = new THREE.MeshStandardMaterial({ 
    color: 0xffffff, 
    transparent: false, 
   map: touchTexture4B, 
    opacity: 1,
    //side: THREE.DoubleSide 
});
  const button4b = new THREE.Mesh(geometryButton4B, materialButton4B);

  // Position the button
  button4b.position.set(-0.426, 1.4, -25.45);
  button4b.rotation.set(0, Math.PI / 0.455, 0); // Rotate the button 55 degrees around the y-axis (in radians)
 // button.rotation.set(0, Math.PI / -2 + THREE.MathUtils.degToRad(-15), 0);

  // Use useFrame to update button appearance or position based on hover state
  useFrame(() => {
    // Access the button mesh
    const buttonMesh = buttonRef4.current;
    if (isHovered4) {
      //buttonMesh.material.color.set(0xff0000);
      document.body.style.cursor = "pointer";
    } else {
      //buttonMesh.material.color.set(0xffffff);
      document.body.style.cursor = "auto";
    }
  });

  // Add the button to the scene
  return (
    <primitive object={button4b} onClick={handleClick} ref={buttonRef4}  onPointerEnter={() => setIsHovered4(true)}
      onPointerLeave={() => setIsHovered4(false)}
    
   />
  );
};

export default Button4B;