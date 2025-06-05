// Button4.jsx
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

const Button4 = ({ onClick }) => {
  const { scene, camera, raycaster, mouse } = useThree();
  const buttonRef4 = useRef();
  const [isHovered4, setIsHovered4] = useState(false); // State to track hover state


  // Handle click event
  const handleClick = () => {
    console.log('click4B');
    onClick();
    console.log('click4D');
  };

  // Create plane geometry for the button
  const touchTexture4 = new THREE.TextureLoader().load('./touch.png');
  const geometryButton4 = new THREE.PlaneGeometry(1.8, 1.8);
  const materialButton4 = new THREE.MeshStandardMaterial({ 
    color: 0xFFFFFF, 
    transparent: false, 
    map: touchTexture4, 
    opacity: 1,
    side: THREE.DoubleSide, 
});
  const button4 = new THREE.Mesh(geometryButton4, materialButton4);

  // Position the button
  button4.position.set(-0.5, 2.1, -25.2);
  button4.rotation.set(0, Math.PI / 0.460, 0); // Rotate the button 55 degrees around the y-axis (in radians)
 // button.rotation.set(0, Math.PI / -2 + THREE.MathUtils.degToRad(-15), 0);
 console.log("button4" , button4.position, "scale: ", button4.scale, "mouse: ", mouse.position);

  // Use useFrame to update button appearance or position based on hover state
  useFrame(() => {
    // Access the button mesh
    const buttonMesh4 = buttonRef4.current;
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
    <primitive object={Button4} onClick={handleClick} ref={buttonRef4}  onPointerEnter={() => setIsHovered4(true)}
      onPointerLeave={() => setIsHovered4(false)}
    
   />
  );
};

export default Button4;