import { useState, useRef, useEffect, useMemo } from 'react';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import gsap from 'gsap';
import { OBJLoader } from 'three-stdlib';
import { MeshStandardMaterial } from 'three';


 // Models
  // Define the materials  f4b453
  const grey = new THREE.MeshPhysicalMaterial({     
    color: 0xACACAC,      // Metal color
    metalness: 0.2,       // Metalness factor (1 for metal)
    roughness: 0.5,       // Roughness factor (0 for perfectly smooth)
    reflectivity: 0.2,    // Reflectivity factor (1 for full reflectivity)
    clearcoat: 0.2,       // Clearcoat intensity (0 to 1)
    clearcoatRoughness: 0.2, // Roughness of the clearcoat layer
    transparent: true,
    opacity: 1,
}); 
const glass = new THREE.MeshPhysicalMaterial({     
  transparent: true,  
  opacity: 1,
  transmission: 1,     // Metal color
  metalness: 0,        // Metalness factor (1 for metal)
  roughness: 0.1,        // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,     // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,          // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.05, // Roughness of the clearcoat layer
  // envMapIntensity: 0.5,
  //roughnessMap: roughnessTexture
}); 
const black = new THREE.MeshPhysicalMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xECECEC,
  metalness: 0.8,         // Metalness factor (1 for metal)
  roughness: 0,         // Roughness factor (0 for perfectly smooth)
  reflectivity: 1,      // Reflectivity factor (1 for full reflectivity)
  clearcoat: 1,         // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.3 // Roughness of the clearcoat layer
}); 


const redlight = new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 0.8, 
  color: 0xe71212, 
  emissive: 0xe71212, // Match emissive color to the main color for a glowing effect
  emissiveIntensity: 1.5, 
  metalness: 0, 
  roughness: 0.5,
});
const blimpRed = new MeshStandardMaterial({ 
  color: 0xeff471a, 
  emissive: 0xe71212, 
  emissiveIntensity: 6, 
  metalness: 0, 
  roughness: 1, 
});
const yellowlight = new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xffff00, 
  emissive: 0xFFC000, 
  emissiveIntensity: 7, 
  metalness: 0, 
  roughness: 1, 
}); 
const white = new THREE.MeshPhysicalMaterial({ 
  color: 0xECECEC,
  metalness: 0.5,         // Metalness factor (1 for metal)
  roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const yellowlightsoft = new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xffff00, 
  emissive: 0xFFC000, 
  emissiveIntensity: 2, 
  metalness: 0, 
  roughness: 1, 
});

const bluelight2 = new MeshStandardMaterial({ 
  transparent: true, 
  opacity: 1, 
  color: 0xe1351e9, 
  emissive: 0xe1351e9, 
  emissiveIntensity: 9, 
  metalness: 0, 
  roughness: 1, 
});
const whitelight= new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xffffff, 
  emissive: 0xe6662e9, 
  emissiveIntensity: 2.5, 
  metalness: 0, 
  roughness: 1, 
});

const darkgrey = new THREE.MeshPhysicalMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xd1d1d1 , 
  metalness: 0.5,         // Metalness factor (1 for metal)
  roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const purplelight= new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0x670b76, 
  emissive: 0x880b9a, 
  emissiveIntensity: 11, 
  metalness: 0, 
  roughness: 1, 
});
const orangelight= new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xeb9d20,
  emissive: 0xeb9d20, 
  emissiveIntensity: 2.5, 
  metalness: 0, 
  roughness: 1, 
});
const orangelightsoft= new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xeb9d20,
  emissive: 0xeb9d20, 
  emissiveIntensity: 5, 
  metalness: 0, 
  roughness: 1, 
});

const greenlight= new MeshStandardMaterial({ 
  transparent: true,
  opacity: 1,  
  color: 0x46bd58,
  emissive: 0x46bd58, 
  emissiveIntensity: 3, 
  metalness: 0, 
  roughness: 1, 
});


  // Materials cycle for redlight
  //const redlightMaterials = [blimpRed, bluelight2, yellowlightsoft, greenlight, orangelight, orangelightsoft]; // Replace with your actual material names

  const Blimp = () => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
  
    const blimp = useMemo(() => useLoader(OBJLoader, './aircar_blimp.obj'), []);
    const BlimpRef = useRef();
    const redlightMeshRef = useRef();
    const lightImageMeshRef = useRef();
    const { camera } = useThree(); // Access camera from the R3F context

  
    // State to track the current material and image index
    const [materialIndex, setMaterialIndex] = useState(0);
  
    // Materials for redlight
    const redlightMaterials = [blimpRed, bluelight2, yellowlightsoft, greenlight, orangelight, purplelight];
  
    // Images to display on the blimp screen
    const screenImages = [
      useLoader(THREE.TextureLoader, './coke.png'),
      useLoader(THREE.TextureLoader, './coke2.png'),
      useLoader(THREE.TextureLoader, './coke3.png'),
      useLoader(THREE.TextureLoader, './coke.png'),
      useLoader(THREE.TextureLoader, './coke2.png'),
      useLoader(THREE.TextureLoader, './coke3.png'),
      useLoader(THREE.TextureLoader, './coke.png'),
      useLoader(THREE.TextureLoader, './coke2.png'),
      useLoader(THREE.TextureLoader, './coke3.png')
    ];
  
    // Ensure images are correctly centered
    screenImages.forEach(image => image.center.set(0.5, 0.5));
  
    // Function to handle raycasting on click
    const handleMouseClick = (event) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
      // Update the raycaster with the camera and mouse
      raycaster.setFromCamera(mouse, camera);
  
      // Raycast to see if the blimp is clicked
      const intersects = raycaster.intersectObject(BlimpRef.current, true);
  
      if (intersects.length > 0) {
        // If the blimp is clicked, cycle both the redlight materials and screen textures
        setMaterialIndex((prevIndex) => (prevIndex + 1) % redlightMaterials.length);
      }
    };
  
    // Automatically cycle materials and textures every 11 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setMaterialIndex((prevIndex) => (prevIndex + 1) % redlightMaterials.length);
      }, 11000);
  
      return () => clearInterval(interval); // Clean up on unmount
    }, []);
  
    // Update the redlight material and screen texture based on the current material index
    useEffect(() => {
      if (redlightMeshRef.current) {
        redlightMeshRef.current.material = redlightMaterials[materialIndex];
      }
      if (lightImageMeshRef.current) {
        lightImageMeshRef.current.material.map = screenImages[materialIndex % screenImages.length];
      }
    }, [materialIndex]);
  
    // Set up event listener for mouse clicks
    useEffect(() => {
      window.addEventListener('click', handleMouseClick);
      return () => window.removeEventListener('click', handleMouseClick);
    }, []);
  
    // Traverse the blimp object and assign refs to the relevant meshes
    useEffect(() => {
      blimp.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.name === "redlight") {
            redlightMeshRef.current = child; // Store the redlight mesh
            child.material = redlightMaterials[materialIndex]; // Apply initial material
          }
          if (child.name === 'lightImage') {
            lightImageMeshRef.current = child; // Store the lightImage mesh
            child.material = new THREE.MeshStandardMaterial({
              map: screenImages[materialIndex], // Apply the first texture initially
              transparent: true,
              opacity: 1,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
              side: THREE.DoubleSide,
              emissive: 0xFFFFFF,
              emissiveIntensity: 2,
              metalness: 0.5,
              roughness: 1,
            });
          }
          if (child.name === "grey") {
            child.material = black; 
          }
          if (child.name === "whitelight") {
            child.material = whitelight; 
          }
          if (child.name === "darkgrey") {
            child.material = darkgrey; 
          }
          if (child.name === "lightgrey") {
            child.material = white; 
          }
          if (child.name === "glass") {
            child.material = glass; 
          }
          if (child.name === "bluelight") {
            child.material = bluelight2; 
          }
          if (child.name === "orangelight") {
            child.material = orangelight; 
          }
        }
      });
  
      BlimpRef.current = blimp; // Assign the blimp object to the ref
    }, [blimp, materialIndex]);
  
    // Blimp GSAP animation (as per the original code)
    useEffect(() => {
      gsap.to(blimp.position, { x: -2.8, y: 5.9, z: 11, duration: 0 });
  
      const blimper = gsap.timeline({ repeat: -1, yoyo: false });
      blimper
        .to(blimp.rotation, { y: 1.10, duration: 60, ease: 'expo.inOut' })
        .to(blimp.position, { x: -2.8, y: 5.5, z: 11, duration: 60, ease: 'expo.inOut' }, "-=40")
        .to(blimp.position, { x: 2.8, y: 5.9, z: 11, duration: 60, ease: 'expo.inOut' }, "-=20")
        .to(blimp.rotation, { y: 2.50, duration: 80, ease: 'expo.inOut' }, "-=40")
        .to(blimp.position, { x: 2.8, y: 5.5, z: 11, duration: 60, ease: 'expo.inOut' }, "-=20")
        .to(blimp.position, { x: -2.8, y: 5.9, z: 11, duration: 60, ease: 'expo.inOut' }, "-=20");
  
      return () => blimper.kill();
    }, []);

  const handlePointerOver = (event) => {
    //  console.log('Pointer over blimp');
      event.stopPropagation();
      // Change the cursor style for the pointer over effect
      gsap.to({}, { 
        duration: 0, // No actual animation, just to trigger the onStart
        onStart: () => {
          document.body.style.cursor = 'pointer'; // Change the cursor
        }
      });
      document.body.style.cursor = 'pointer';
    };
    
    const handlePointerOut = (event) => {
    //  console.log('Pointer out of blimp');
      event.stopPropagation();
      // Reset the cursor style when pointer is out
      gsap.to({}, {
        duration: 0, // No animation needed, just triggering the cursor change
        onStart: () => {
          document.body.style.cursor = 'auto';
        }
      });
      document.body.style.cursor = 'auto';
      
    };

  return (
    <primitive
      object={blimp}
      ref={BlimpRef}
      scale={[0.0010, 0.0010, 0.0010]} 
      position={[-2.8, 5.9,  11]} 
      onClick={handleMouseClick}
      onPointerOver={handlePointerOver}  
      onPointerOut={handlePointerOut}    
    />
  );
};

export default Blimp;