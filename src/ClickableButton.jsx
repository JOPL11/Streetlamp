import React, { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ClickableButton = ({ onClick }) => {
  const { scene, camera, raycaster } = useThree();
  const buttonRef = useRef();

  const handleButtonClick = () => {
    // Define a raycaster
    const { size } = useThree();
    const canvasWidth = size.width;
    const canvasHeight = size.height;

    // Calculate the mouse coordinates relative to the canvas
    const canvasMouseX = (event.clientX / canvasWidth) * 2 - 1;
    const canvasMouseY = -(event.clientY / canvasHeight) * 2 + 1;

    raycaster.setFromCamera({ x: canvasMouseX, y: canvasMouseY }, camera);

    // Check for intersections with the button
    const intersects = raycaster.intersectObject(buttonRef.current);

    // If there is an intersection, call the onClick callback
    if (intersects.length > 0) {
      onClick();
    }
  };

  // Create plane geometry for the button
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
  const button = new THREE.Mesh(geometry, material);
  button.position.set(-2, 2, 0);
  buttonRef.current = button;

  // Add the button to the scene
  scene.add(button);

  return null; // The component doesn't need to render anything in the DOM
};

export default ClickableButton;