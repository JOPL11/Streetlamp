import React, { useEffect, useMemo, useRef, useState, useContext , Suspense } from 'react';
import { useThree, useLoader, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, MeshReflectorMaterial, BakeShadows, useHelper, Html } from '@react-three/drei';


//import { EffectComposer } from '@react-three/postprocessing';


import { OBJLoader } from 'three-stdlib';
import { MeshStandardMaterial, MeshBasicMaterial, PlaneGeometry, Mesh } from 'three'; 
import * as THREE from 'three';
import { Clock } from 'three'; 
import { SpotLight, SpotLightHelper } from 'three';
import { easing } from "maath"; // Assuming "maath" is installed properly
import Button from './Button.jsx';
import Button2 from './Button2.jsx';
import Button3 from './Button3.jsx';
import Button4B from './Button4B.jsx';

import UseSwivelTV from './UseSwivelTV';
import gsap from '../public/resources/gsap/gsap-core.js';
import { CSSPlugin  } from '../public/resources/gsap/CSSPlugin.js';





//import { Expo, Sine } from '../public/resources/gsap/EasePack.js';
gsap.registerPlugin(CSSPlugin);


    // Define the materials
    const glassRef = useRef(); // Create a ref for the material
    //const glassTexture = useLoader(TextureLoader, 'path_to_your_texture/roughness_map.png'); // Optional roughness map
    const grey = new THREE.MeshPhysicalMaterial({     
        color: 0xACACAC,      // Metal color
        metalness: 0.5,       // Metalness factor (1 for metal)
        roughness: 0.9,       // Roughness factor (0 for perfectly smooth)
        reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
        clearcoat: 0.1,       // Clearcoat intensity (0 to 1)
        clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
      }); 
    const lightgrey = new THREE.MeshPhysicalMaterial({ 
      color: 0xd1d1d1 , 
      metalness: 0.5,         // Metalness factor (1 for metal)
      roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
      reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
      clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
      clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
    }); 
    const white = new THREE.MeshPhysicalMaterial({ 
      color: 0xFFFFFF,
      metalness: 0.5,         // Metalness factor (1 for metal)
      roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
      reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
      clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
      clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
    }); 
    const black = new THREE.MeshPhysicalMaterial({ 
      color: 0x000000,
      metalness: 0.2,         // Metalness factor (1 for metal)
      roughness: 0.2,         // Roughness factor (0 for perfectly smooth)
      reflectivity: 0.1,      // Reflectivity factor (1 for full reflectivity)
      clearcoat: 0.5,         // Clearcoat intensity (0 to 1)
      clearcoatRoughness: 0.7 // Roughness of the clearcoat layer
    }); 
    const red = new MeshStandardMaterial({ 
      color: 0xe71212, 
      emissive: 0xe71212, 
      emissiveIntensity: 3, 
      metalness: 0, 
      roughness: 1, 
    });
    const yellow = new THREE.MeshPhysicalMaterial({     
      color: 0xf4b453,      // Metal color
      metalness: 0.5,       // Metalness factor (1 for metal)
      roughness: 0.9,       // Roughness factor (0 for perfectly smooth)
      reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
      clearcoat: 0.1,       // Clearcoat intensity (0 to 1)
      clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
  }); 
    const yellowlight = new MeshStandardMaterial({ 
      color: 0xffff00, 
      emissive: 0xFFC000, 
      emissiveIntensity: 11, 
      metalness: 0, 
      roughness: 1, 
    });

    const yellowlightsoft = new MeshStandardMaterial({ 
      color: 0xffff00, 
      emissive: 0xFFC000, 
      emissiveIntensity: 11, 
      metalness: 0, 
      roughness: 1, 
    });

    
    const whitelight= new MeshStandardMaterial({ 
      color: 0xffffff, 
      emissive: 0xe6662e9, 
      emissiveIntensity: 2.5, 
      metalness: 0, 
      roughness: 1, 
    });
    

  const blue = new THREE.MeshPhysicalMaterial({ 
    color: 0x8eb5e2,
    metalness: 0.5,         // Metalness factor (1 for metal)
    roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
    reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
    clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
    clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
    }); 
    
    const matteblack = new THREE.MeshPhysicalMaterial({ 
    color: 0x000000,
    metalness: 0.5,         // Metalness factor (1 for metal)
    roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
    reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
    clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
    clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
    }); 



    const chrome = new THREE.MeshPhysicalMaterial({ 
    color: 0xc6c6c6,
    metalness:0.5,         // Metalness factor (1 for metal)
    roughness: 0,         // Roughness factor (0 for perfectly smooth)
    reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
    clearcoat: 0.5,         // Clearcoat intensity (0 to 1)
    clearcoatRoughness: 0.5,

    }); 
    
    const darkgrey = new THREE.MeshPhysicalMaterial({     
      color: 0xACACAC,      // Metal color
      metalness: 0.5,       // Metalness factor (1 for metal)
      roughness: 0.9,       // Roughness factor (0 for perfectly smooth)
      reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
      clearcoat: 0.1,       // Clearcoat intensity (0 to 1)
      clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
    }); 

    const green = new THREE.MeshPhysicalMaterial({     
      color: 0x6c8f4e,      // Metal color
      metalness: 0.5,       // Metalness factor (1 for metal)
      roughness: 0.1,       // Roughness factor (0 for perfectly smooth)
      reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
      clearcoat: 0.0,       // Clearcoat intensity (0 to 1)
      clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
    }); 

    const glass = new THREE.MeshPhysicalMaterial({     
      transmission: 1,     // Metal color
      metalness: 0.1,        // Metalness factor (1 for metal)
      roughness: 0.1,        // Roughness factor (0 for perfectly smooth)
      reflectivity: 0.8,     // Reflectivity factor (1 for full reflectivity)
      clearcoat: 0.1,          // Clearcoat intensity (0 to 1)
      clearcoatRoughness: 0.05, // Roughness of the clearcoat layer
      envMapIntensity: 0.8,
      //roughnessMap: roughnessTexture
    }); 
    
    const redlight2 = new MeshStandardMaterial({ 
      color: 0xe71212, 
      emissive: 0xe71212, 
      emissiveIntensity: 5, 
      metalness: 0, 
      roughness: 1, 
    });

    const bluelight = new MeshStandardMaterial({ 
      color: 0xe1351e9, 
      emissive: 0xe1351e9, 
      emissiveIntensity: 1, 
      metalness: 0, 
      roughness: 1, 
    });

    
    const bluelight3 = new MeshStandardMaterial({ 
      color: 0xe1351e9, 
      emissive: 0xe1351e9, 
      emissiveIntensity: 31, 
      metalness: 0, 
      roughness: 1, 
    });

    
    const purplelight= new MeshStandardMaterial({ 
      color: 0x670b76, 
      emissive: 0x880b9a, 
      emissiveIntensity: 2.5, 
      metalness: 0, 
      roughness: 1, 
    });

    const orangelight= new MeshStandardMaterial({ 
      color: 0xeb9d20,
      emissive: 0xeb9d20, 
      emissiveIntensity: 2.5, 
      metalness: 0, 
      roughness: 1, 
    });
    const whitelightC= new MeshStandardMaterial({ 
      color: 0xffffff, 
      emissive: 0xe6662e9, 
      emissiveIntensity: 5.5, 
      metalness: 0, 
      roughness: 1, 
    });
    
    const bluelight2 = new MeshStandardMaterial({ 
      color: 0xe1351e9, 
      emissive: 0xe1351e9, 
      emissiveIntensity: 5, 
      metalness: 0, 
      roughness: 1, 
    });

      
    const greenlight= new MeshStandardMaterial({ 
      color: 0x2d5f3b,
      emissive: 0xa5ce6c, 
      emissiveIntensity: 2.5, 
      metalness: 0, 
      roughness: 1, 
    });
  
//extend({ EffectComposer, RenderPass, UnrealBloomPass });
  // ---------------------------------------------------------------------------------------------------- Experience ----------------------------------->
  const Experience = ( { paused }) => {
   //const { camera, mouse } = useThree();  // Accessing the camera object
   const {  scene, gl, camera } = useThree();
   const { camera: threeCamera } = useThree();
   //const renderer = useContext(RendererContext);

    // Initialize clock
    const clock = new Clock();

   
    const animateGroups = (  ) => {

      handleClick(); // Assuming handleClick is defined elsewhere ------------------------------------   LOGIC ------------------------------------------>
      // Check if targetPosition is defined and contains coordinates
      if (targetPosition && targetPosition.length === 3) {
        // Animate group1
      
        gsap.to(group1Ref.current.position, {
          x:  1.3,
          y:  1.4 , // Adjust as needed
          z:  12, // Adjust as needed
          duration: 4, // Duration of the animation in seconds
          ease: "power4.InOut" // Easing function, adjust as needed
        });
  

        // Animate group2  
        gsap.to(group2Ref.current.position, {
          x: 2, // New X position
          y: 0.8, // New Y position
          z: -0.8, // New Z position
          duration: 4, // Duration of the animation in seconds
          ease: "power4.InOut", // Easing function, adjust as needed
        });
      } else {
        console.error('targetPosition is not defined or does not contain coordinates.');
      }
    };
    

      // Rig it up
    function Rig() {
      const { camera, mouse } = useThree();
      useFrame((state, delta) => {
        // Calculate the scaled vertical mouse movement
        const scaledMouseY = state.mouse.y * 0.5; // Adjust the scaling factor as needed
        // Update the camera rotation based on the scaled vertical mouse movement
        camera.rotation.x = -scaledMouseY * Math.PI / 2;
        // Calculate the scaled horizontal mouse movement
        const scaledMouseX = state.mouse.x * 0.15; // Adjust the scaling factor as needed
        // Update the camera position based on scaled mouse coordinates
        const newPositionX = Math.sin(scaledMouseX / 4) * 2.5;
        const newPositionY = 1.45 + scaledMouseY;
        const newPositionZ = Math.cos(scaledMouseX / 2.5) * 1.7; 

        // Apply additional leftward movement when the mouse is on the left side of the screen
        let cameraX = newPositionX;
        if (state.mouse.x < 0) {
          cameraX -= 0.3; // Adjust the value to move the camera further to the left
        }
        if (state.mouse.x > 0) {
          cameraX += 0.3; // Adjust the value to move the camera further to the right
        }
        // Update the camera position
        easing.damp3(camera.position, [cameraX, newPositionY, newPositionZ], 1.5, delta);
        // Keep the camera looking at the same point
        camera.lookAt(-0.1, 2.9, 0.8);
      });
      
      return null; // Since this is a utility component, it doesn't render anything
    }



    // Handle video playback
    const handleClick = () => {
    };

/*
          
    const objA = useLoader(OBJLoader, './22.obj');
    objA.traverse((child) => {
         if (child instanceof THREE.Mesh) {
         // Access the mesh
          const mesh = child;
         if (mesh.geometry) {
            if (mesh.name === "white") {
              mesh.material = white; 
            } 
            if (mesh.name === "bluelight") {
              mesh.material = bluelight3; 
            } 
        }
      };
    });

*/

     // Inside your Experience component
     const plane = new PlaneGeometry(30, 30); // Adjust the size as needed
     const planeMaterial = new MeshBasicMaterial({ color: matteblack }); // Adjust the color as needed
     const floor = new Mesh(plane, planeMaterial);
     floor.rotation.x = -Math.PI / 2; // Rotate the floor to be horizontal
     floor.position.y = 5; // Adjust the position to be just below the objects

     
   


   
    return (
    <>
      <color args={ [ '#594A40' ] } attach="background" />
      <fog attach="fog" color='#594A40' near={1} far={7.5}  />
      <group>
      <ambientLight color={0xFFFFFF} intensity={1} />
     
      </group>     
  
      <primitive object={floor} material={matteblack} position={ [ 0,4,0 ] } />

      
     
     
   
    <group>
  {/* targetPosition={targetPosition}   <Rig fov={20} aspect={window.innerWidth / window.innerHeight} near={0.1} far={1000} />    <OrbitControls enableDamping={true} dampingFactor={0.05}/> <OrbitControls enableDamping={true} dampingFactor={0.05}/>   */}

    <Rig fov={20} aspect={window.innerWidth / window.innerHeight} near={0.1} far={1000} />
     

    </group>
    
    </>
    );
  };

export default Experience;