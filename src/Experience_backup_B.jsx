import React, { useEffect, useRef, Suspense, useState, useMemo, useCallback } from 'react';
import { useThree, useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three-stdlib';
import { MeshStandardMaterial, MeshBasicMaterial, PlaneGeometry, Mesh } from 'three'; 
import * as THREE from 'three';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Clock } from 'three'; 
import { easing } from "maath"; // Assuming "maath" is installed properly
import Button from './Button.jsx';
import Button2 from './Button2.jsx';
import Button3 from './Button3.jsx';
//import Button4B from './Button4B.jsx';
import UseSwivelTV from './UseSwivelTV';
import { gsap } from "gsap";
import { CSSPlugin  } from '../public/resources/gsap/CSSPlugin.js';
import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader';
// import ScrollComponent from './ScrollComponent'; // Import the scroll component             <ScrollComponent />
//import Traffic from './TrafficLight.jsx'
//import Blitz from './Blitz2.jsx'
//import City from './City_holodeck.jsx'
//import Car1 from './City_trails.jsx'
//import Car2 from './City_trails2.jsx'
import Decker from './Decker.jsx'

import { Html } from '@react-three/drei';

const Traffic = React.lazy(() => import('./TrafficLight.jsx'));
//const Blitz2 = React.lazy(() => import('./Blitz3.jsx'));
const City = React.lazy(() => import('./City_holodeck.jsx'));
const Car1 = React.lazy(() => import('./City_trails.jsx'));
const Car2 = React.lazy(() => import('./City_trails2.jsx'));
const Car3 = React.lazy(() => import('./City_trails3.jsx'));
const Blimp = React.lazy(() => import('./Blimp.jsx'));


//import { Expo, Sine } from '../public/resources/gsap/EasePack.js';
//gsap.registerPlugin(CSSPlugin);

const initializeMaterials = () => { 
  const envMap = new CubeTextureLoader().load([
    './px.jpg', // Positive X
    './nx.jpg', // Negative X
    './py.jpg', // Positive Y
    './ny.jpg', // Negative Y
    './pz.jpg', // Positive Z
    './nz.jpg', // Negative Z
  ]);
  // Define the materials

  /*
      <Button 
      onClick={animateGroups} />
      <Button2 
      onClick={animateGroups} />
      <Button3 
      onClick={animateGroups2}  />
      <Button4B 
      position={[0, 1.2, -13]} 
      onClick={animateGroups3} 
      />
  */
  
  //const glassTexture = useLoader(TextureLoader, 'path_to_your_texture/roughness_map.png'); // Optional roughness map
  const grey = new THREE.MeshPhysicalMaterial({     
    color: 0xACACAC,      // Metal color
    metalness: 0.5,       // Metalness factor (1 for metal)
    roughness: 0.9,       // Roughness factor (0 for perfectly smooth)
    reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
    clearcoat: 0.1,       // Clearcoat intensity (0 to 1)
    clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
  }); 
  const yellowlight = new MeshStandardMaterial({ 
    color: 0xffff00, emissive: 0xFFC000, emissiveIntensity: 11,  metalness: 0, roughness: 1, 
  });
  const matteblack = new THREE.MeshPhysicalMaterial({ 
  color: 0x000000, metalness: 0.8, roughness: 0.9, reflectivity: 0.5, clearcoat: 0.1, clearcoatRoughness: 0.2 
  }); 
  const chrome = new THREE.MeshPhysicalMaterial({ 
  color: 0xc6c6c6, metalness:0.5, roughness: 0,  reflectivity: 0.5, clearcoat: 0.5, clearcoatRoughness: 0.5,
  }); 
  const darkgrey = new THREE.MeshPhysicalMaterial({     
    color: 0xACACAC,  metalness: 0.7, roughness: 0.9, reflectivity: 0.5, clearcoat: 0.1, clearcoatRoughness: 0.2
  }); 
  const green = new THREE.MeshPhysicalMaterial({     
    color: 0x6c8f4e, metalness: 0.5, roughness: 0.1, reflectivity: 0.5, clearcoat: 0.0, clearcoatRoughness: 0.2 
  }); 
  const glass = new THREE.MeshPhysicalMaterial({     
    transmission: 1, metalness: 0.1, roughness: 0.1, reflectivity: 0.8, clearcoat: 0.1, clearcoatRoughness: 0.05, envMapIntensity: 0.8,
  }); 
  const redlight2 = new MeshStandardMaterial({ 
    color: 0xe71212,  emissive: 0xe71212, emissiveIntensity: 5,  metalness: 0,  roughness: 1, 
  });
  const bluelight = new MeshStandardMaterial({ 
    color: 0xe1351e9, emissive: 0xe1351e9,  emissiveIntensity: 1,  metalness: 0,  roughness: 1, 
  });
  const bluelight3 = new MeshStandardMaterial({ 
    color: 0xe1351e9,  emissive: 0xe1351e9,  emissiveIntensity: 31,  metalness: 0,  roughness: 1, 
  }); 
  const purplelight= new MeshStandardMaterial({ 
    color: 0x670b76,  emissive: 0x880b9a,  emissiveIntensity: 2.5,  metalness: 0,  roughness: 1, 
  });
  const orangelight= new MeshStandardMaterial({ 
    color: 0xeb9d20, emissive: 0xeb9d20,  emissiveIntensity: 2.5,  metalness: 0,  roughness: 1, 
  });
  const whitelightC= new MeshStandardMaterial({ 
    color: 0xffffff,  emissive: 0xe6662e9,  emissiveIntensity: 5.5,  metalness: 0,  roughness: 1, 
  });
  const white= new MeshStandardMaterial({ 
    color: 0xffffff, metalness: 0,  roughness: 1, 
  });
  const bluelight2 = new MeshStandardMaterial({ 
    color: 0xe1351e9, emissive: 0xe1351e9,  emissiveIntensity: 5,  metalness: 0,  roughness: 1, 
  }); 
  const greenlight= new MeshStandardMaterial({ 
    color: 0x2d5f3b, emissive: 0xa5ce6c, emissiveIntensity: 2.5, metalness: 0, roughness: 1, 
  });
  const black = new THREE.MeshPhysicalMaterial({ 
    color: 0x000000,
    metalness: 0.6,         // Metalness factor (1 for metal)
    roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
    reflectivity: 0.7,      // Reflectivity factor (1 for full reflectivity)
    clearcoat: 0.2,         // Clearcoat intensity (0 to 1)
    clearcoatRoughness: 0.2, // Roughness of the clearcoat layer
  }); 
  const lightgrey = new THREE.MeshPhysicalMaterial({ 
    color: 0xd1d1d1 , 
    metalness: 0.5,         // Metalness factor (1 for metal)
    roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
    reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
    clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
    clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
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

  return { matteblack, whitelight, black, blue, greenlight, yellowlight, yellow, white, redlight2, bluelight3, glass, grey, lightgrey, darkgrey, chrome, red };
}


//console.log(gsap)

  const targetPosition = [-33, 2, -33];

  
  // Delay import function
  /*
  const delayImport = (importFunction, delay) => {
    return new Promise(resolve => {
      setTimeout(() => {
        importFunction().then(resolve);
      }, delay);
    });
  };
  
  
  // Use the delay import with React.lazy for Blitz3
  const LazyBlitz = React.lazy(() => delayImport(() => import('./Blitz3.jsx'), 12000));

*/
  
//extend({ EffectComposer, RenderPass, UnrealBloomPass });
  // ---------------------------------------------------------------------------------------------------- Experience ----------------------------------->
  const Experience = ( { paused } ) => {
   const { scene, camera, gl } = useThree();
   const [materials, setMaterials] = useState(null);
   const [hasInteracted, setHasInteracted] = useState(false);
   //const [showBlitz, setShowBlitz] = useState(true);
   const controlsRef = useRef();
   const spotLightRef = useRef();
   const [target, setTarget] = useState([-0.1, 2, 0.8]);
   
   // Toggle Blitz visibility every minute
   /*useEffect(() => {
     const interval = setInterval(() => {
       setShowBlitz(prev => !prev);
     }, 300); // Toggle every minute (30000ms = 30 seconds)
     
     return () => clearInterval(interval);
   }, []); */
   
   // Handle first interaction
   const handleFirstInteraction = useCallback(() => {
     if (!hasInteracted) {
       setHasInteracted(true);
       // Request fullscreen on the document element to keep all UI elements
       const element = document.documentElement;
       if (element.requestFullscreen) {
         element.requestFullscreen().catch(err => {
           console.log(`Error attempting to enable fullscreen: ${err.message}`);
         });
       } else if (element.webkitRequestFullscreen) { // Safari
         element.webkitRequestFullscreen();
       } else if (element.msRequestFullscreen) { // IE11
         element.msRequestFullscreen();
       }
     }
   }, [hasInteracted]);
   
   // Add spotlight helper (commented out to avoid errors)
   // useHelper(spotLightRef, SpotLightHelper, 'white');
   
   // Initialize materials and destructure the result
   const { matteblack, black, greenlight, blue, yellowlight, whitelight, white, yellow, redlight2, bluelight3, glass, chrome, grey, lightgrey, darkgrey, red } = useMemo(() => initializeMaterials(), []);

   useEffect(() => {
    const loadedMaterials = initializeMaterials();
    setMaterials(loadedMaterials);
  }, []); // Run once on component mount

    // Initialize clock
    const clock = new Clock();

    // Create refs for the groups
    const group1Ref = useRef(null);
    const group2Ref = useRef(null);
    const screenerRef = useRef();
    
    // Use the hook at the top level
    UseSwivelTV(screenerRef, camera);
    
    // Keep the camera ref updated for other uses
    const cameraRef = useRef(camera);
    useFrame(() => {
      cameraRef.current = camera;
    });

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
    
    const animateGroups2 = () => {
      handleClick(); // Assuming handleClick is defined elsewhere
    
      // Check if targetPosition is defined and contains coordinates
      if (targetPosition && targetPosition.length === 3) {
        // Animate group1
        gsap.to(group1Ref.current.position, {
          x: 0 ,
          y: 2.2 , // Adjust as needed
          z: 25, // Adjust as needed
          duration: 4, // Duration of the animation in seconds
          ease: "power4.InOut" // Easing function, adjust as needed
        });

    
        // Animate group2
        
        gsap.to(group2Ref.current.position, {
          x: 0.1, // New X position
          y: 1.2, // New Y position
          z: 12, // New Z position
          duration: 4, // Duration of the animation in seconds
          ease: "power4.InOut", // Easing function, adjust as needed    
        });
      } else {
        console.error('targetPosition is not defined or does not contain coordinates.');
      }
    };

    const animateGroups3 = () => {
     // handleClick(); // Assuming handleClick is defined elsewhere
    
      // Check if targetPosition is defined and contains coordinates lookAt-0.1, 2.9, 0.8
      if (targetPosition && targetPosition.length === 3) {
        // Animate group1
        gsap.to(group1Ref.current.position, {
          x:  -0.05,
          y:  0.85 , // Adjust as needed
          z:  0, // Adjust as needed
          duration: 4, // Duration of the animation in seconds
          ease: "power4.InOut" // Easing function, adjust as needed
        });
    
        // Animate group2
        
        gsap.to(group2Ref.current.position, {
          x: 0, // New X position
          y: 0.85, // New Y position
          z: -11.5, // New Z position
          duration: 4, // Duration of the animation in seconds
          ease: "power4.InOut", // Easing function, adjust as needed

        });
      } else {
        console.error('targetPosition is not defined or does not contain coordinates.');
      }
    };

     // Camera and controls setup
    useFrame(() => {
      // This is where you can add any custom camera behavior if needed
      // The OrbitControls will handle most of the camera movement
    });


  
    // Handle video playback
    const handleClick = () => {
    };

    const obj3 = useLoader(OBJLoader, './wires.obj');
    const wiresRef = useRef();

    obj3.traverse((child) => {
      const mesh = child;
      // Check if the mesh has geometry
      if (mesh.geometry) {
        // Assign custom materials based on mesh names
        if (mesh.name === "black") {
          // Assign a custom material to mesh white
          mesh.material = matteblack; // Assign the first material from your array of materials
        }     
      }
    });
    const clonedWires = obj3.clone();
    const clonedWires2 = obj3.clone();
    const clonedWires3 = obj3.clone();
          
    const objA = useLoader(OBJLoader, './white.obj');
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
      };});
    const objB = useLoader(OBJLoader, './grey.obj');
    objB.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child;
        if (mesh.geometry) {
          if (mesh.name === "grey") {
            mesh.material = grey; 
          } 
      }
    };});
    const objC = useLoader(OBJLoader, './lightgrey.obj');
    objC.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child;
        if (mesh.geometry) {
          if (mesh.name === "lightgrey") {
            mesh.material = lightgrey;
          } 
      }
    };});
    const objD = useLoader(OBJLoader, './black.obj');
    objD.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child;
        if (mesh.geometry) {
          if (mesh.name === "black") {
            mesh.material = black; 
          } 
      }
    };});
    
    const obj2 = useLoader(OBJLoader, './streetlamper2lights.obj');
    const material2 = new MeshStandardMaterial({ 
      color: 0xffff00, 
      emissive: 0xFFC000, 
      emissiveIntensity: 3, 
      metalness: 0, 
      roughness: 1, 
    });
    obj2.traverse((child) => {
      if (child.isMesh) {
        child.material = material2;
      }
    });

    const cam1 = useLoader(OBJLoader, './camera1.obj');
    const meshRef = useRef();
    let time = 0;
    let direction = 1; 
    cam1.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Access the mesh
        const mesh = child;
        // Check if the mesh has geometry
        if (mesh.geometry) {
          // Assign custom materials based on mesh names
          if (mesh.name === "black") {
            // Assign a custom material to mesh white
            mesh.material = black; // Assign the first material from your array of materials
          } 
          if (mesh.name === "grey") {
            // Assign a custom material to mesh white
            mesh.material = lightgrey; // Assign the first material from your array of materials
          } 
          if (mesh.name === "red") {
            // Assign a custom material to mesh white
            mesh.material = red; // Assign the first material from your array of materials
          } 
      }
    };});

    const walk = useLoader(OBJLoader, './walk.obj');
    walk.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Access the mesh
          const mesh = child;
          // Check if the mesh has geometry
          if (mesh.geometry) {
            // Assign custom materials based on mesh names
            if (mesh.name === "black") {
              // Assign a custom material to mesh white
              mesh.material = black; // Assign the first material from your array of materials
            } 
            if (mesh.name === "grey") {
              // Assign a custom material to mesh white
              mesh.material = grey; // Assign the first material from your array of materials
            }  
            if (mesh.name === "yellow") {
              // Assign a custom material to mesh white
              mesh.material = yellow; // Assign the first material from your array of materials
            } 
            if (mesh.name === "redlight") {
              // Assign a custom material to mesh white
              mesh.material = redlight2; // Assign the first material from your array of materials
            } 
            if (mesh.name === "bluelight") {
              // Assign a custom material to mesh white
              mesh.material = greenlight; // Assign the first material from your array of materials
            } 
        }
      };});

    const cam2 = useLoader(OBJLoader, './camera2.obj');
    const meshRef2 = useRef();
    let time2 = 0;
    let direction2 = 1; 
    cam2.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Access the mesh
          const mesh = child;
          // Check if the mesh has geometry
          if (mesh.geometry) {
            // Assign custom materials based on mesh names
            if (mesh.name === "black") {
              // Assign a custom material to mesh white
              mesh.material = black; // Assign the first material from your array of materials
            } 
            if (mesh.name === "grey") {
              // Assign a custom material to mesh white
              mesh.material = lightgrey; // Assign the first material from your array of materials
            } 
            if (mesh.name === "red") {
              // Assign a custom material to mesh white
              mesh.material = red; // Assign the first material from your array of materials
            } 
        }
    };});

    const pole3 = useLoader(OBJLoader, './pole3.obj');
    const poleRef = useRef(); 
    pole3.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Access the mesh
          const mesh = child;
          // Check if the mesh has geometry
          if (mesh.geometry) {
            // Assign custom materials based on mesh names
            if (mesh.name === "grey") {
              // Assign a custom material to mesh white
              mesh.material = grey; // Assign the first material from your array of materials
            } 
            if (mesh.name === "darkgrey") {
              // Assign a custom material to mesh white
              mesh.material = darkgrey; // Assign the first material from your array of materials
            } 
            if (mesh.name === "yellowlight") {
              // Assign a custom material to mesh white
              mesh.material = yellowlight; // Assign the first material from your array of materials
            } 
        }
      };});
      const clonedPole3 = pole3.clone();
      const clonedPole3B = pole3.clone();

      const sneaks = useLoader(OBJLoader, './sneakers.obj');
      const sneaksRef = useRef();
      sneaks.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const mesh = child;
            if (mesh.geometry) {
              if (mesh.name === "grey") {
                mesh.material = white; 
              } 
              if (mesh.name === "black") {
                mesh.material = darkgrey; 
              } 
          }
        };});

  
   /*    TwirlyThing   */
   const screenImage = useLoader(THREE.TextureLoader, './screenerpic.jpg');
         screenImage.center.set(0.5, 0.5);
         screenImage.rotation = Math.PI;
         const screener = useLoader(OBJLoader, './screen.obj');
         // console.log(screener);     
         screener.traverse((child) => {
           if (child instanceof THREE.Mesh) {
            // Access the mesh
            const mesh = child;
            // Check if the mesh has geometry
            if (mesh.geometry) {
              // Assign custom materials based on mesh names
              if (mesh.name === "grey") {
                mesh.material = grey; 
              } 
              if (mesh.name === "black") {              
                mesh.material = black;
              } 
              if (mesh.name === "glass") {          
                mesh.material = glass; 
              } 
              if (mesh.name === "green") { 
                mesh.material = yellow; 
              } 
              if (mesh.name === "redlight") {             
                mesh.material = redlight2; 
              } 
              if (child.isMesh && child.name === 'image') {
                mesh.material = new THREE.MeshStandardMaterial({
                  map: screenImage,
                  depthWrite: false,
                  emissive: 0xFFFFFF, 
                  emissiveMap: screenImage,
                  emissiveIntensity:0.60,                            
                  metalness: 0, 
                  roughness: 1, 
                });
              }
            }
          }
        });

          useEffect(() => {
    // Rotate the object on its y-axis very slowly
    time += 0.001; // Adjust the speed of the animation
    const angle = Math.PI / -4 + Math.sin(time) * Math.PI / 2.5 + Math.PI / -1.5; // Calculate the rotation angle between 55 and 90 degrees
    const angle2 = Math.PI / 4 + Math.sin(time) * Math.PI / -2.5 + Math.PI / 1.5; // Calculate the rotation angle between 55 and 90 degrees
    if (meshRef.current) {
      meshRef.current.rotation.y = angle;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.y = angle2;
    }
  });
  /* */
  useEffect(() => {
     const tsneaks = gsap.timeline({ repeat: -1 });
     tsneaks.to(sneaksRef.current.rotation, { x: 0, y: 1.45, z: 0, duration: 6, ease: 'power4.in'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: 0, duration: 5, ease: 'power4.out'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 1.45, z: 0, duration: 6, ease: 'power4.in'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: -0.05, z: 0, duration: 7, ease: 'power4.out'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: 0, duration: 5, ease: 'power4.in'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: 0.025, duration: 3, ease: 'power4.out'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: -0.045, duration: 2.5, ease: 'power4.in'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: 0.045, duration: 4, ease: 'power4.out'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: -0.065, duration: 2.2, ease: 'power4.in'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: 0.070, duration: 1, ease: 'power4.out'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: -0.005, duration: 1.8, ease: 'power4.in'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: 0.009, duration: 1.8, ease: 'power4.out'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: -0.005, duration: 1.2, ease: 'power4.in'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: 0.070, duration: 1.5, ease: 'power4.out'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: -0.055, duration: 1.5, ease: 'power4.in'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: 0.040, duration: 1.2, ease: 'power4.out'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: -0.035, duration: 1.2, ease: 'power4.in'  }  )
           .to(sneaksRef.current.rotation, { x: 0, y: 0, z: 0, duration: 6, ease: 'power4.out'  }  )
           ;
           },    
        []);

        // Create a directional light     
        const DL = new THREE.DirectionalLight(0xffffff, 2); // Color: white, Intensity: 1
        const DLRef = useRef();
        DL.position.set(13, 42, 32); // Position of the light
        DL.scale.setY(5);

      


     // Inside your Experience component
     const plane = new PlaneGeometry(30, 30); // Adjust the size as needed
     const planeMaterial = new MeshBasicMaterial({ color: matteblack }); // Adjust the color as needed
     const floor = new Mesh(plane, planeMaterial);
     floor.rotation.x = -Math.PI / 2; // Rotate the floor to be horizontal
     floor.position.y = -0.5; // Adjust the position to be just below the objects

       // Ref for the drone object
       const droneRef = useRef();

       // Create the video element
       const video = document.createElement('video');
       video.src = './plansB.mp4';
       video.crossOrigin = 'Anonymous';
       video.loop = true;
       video.muted = true;
     
       // Create the video texture
       const videoTextureV = new THREE.VideoTexture(video);
     
       // Load drone model
       const drone = useLoader(OBJLoader, './drone.obj');
     
       let videoPlaneGeometry;
       drone.traverse((child) => {
         if (child instanceof THREE.Mesh) {
           if (child.geometry) {
             // Assign custom materials based on mesh names
             if (child.name === 'whitelight') child.material = whitelight;
             if (child.name === 'glass') child.material = glass;
             if (child.name === 'black') child.material = black;
             if (child.name === 'yellowlight') child.material = glass;
             if (child.name === 'blue') child.material = blue;
             if (child.name === 'chrome') child.material = chrome;
     
             // Detect the videoplane mesh and set up the video material
             if (child.name === 'videoplane') {
               videoPlaneGeometry = child;
               videoPlaneGeometry.visible = false; // Hide by default
               child.material = new THREE.MeshPhysicalMaterial({
                 map: videoTextureV,
                 transparent: true,
                 opacity: 0.65,
                 blending: THREE.AdditiveBlending,
                 depthWrite: false,
                 side: THREE.DoubleSide,
                 emissive: 0xFFFFFF,
                 emissiveIntensity: 0.15,
               });
             }
           }
         }
       });
     
       // Handle drone click event
       const handleDroneClick = () => {
         console.log('droneClick');
         // Toggle the visibility of the video plane
         if (videoPlaneGeometry) {
           videoPlaneGeometry.visible = !videoPlaneGeometry.visible;
           console.log('videoPlaneGeometry.visible: ', videoPlaneGeometry.visible);
           // Start or stop video playback based on visibility
           if (videoPlaneGeometry.visible) {
             video.play();
           } else {
             video.pause();
           }
         }
       };
     
       // Add event listeners for hover and click on the whole drone
       useEffect(() => {
         if (droneRef.current) {
           droneRef.current.addEventListener('click', handleDroneClick);
         }
         return () => {
           if (droneRef.current) {
             droneRef.current.removeEventListener('click', handleDroneClick);
           }
         };
       }, [droneRef]);
     
       // Animate the drone's position
       useEffect(() => {
         const updatePosition = () => {
           droneRef.current.position.y = Math.sin(Date.now() * 0.0011) * 0.120;
           droneRef.current.position.z = Math.sin(Date.now() * 0.002) * 0.050;
           droneRef.current.position.x = Math.sin(Date.now() * 0.001) * 0.050;
         };
     
         const animation = gsap.to(droneRef.current.position, {
           x: 0.5,
           y: 2.7,
           z: 11,
           duration: 1,
         });
     
         const interval = setInterval(updatePosition, 1000 / 60); // Run at ~60FPS
     
         return () => {
           clearInterval(interval); // Cleanup interval on unmount
           animation.kill(); // Kill the gsap animation on unmount
         };
       }, []);
     
       // Hover effect handlers for the entire drone
       const handlePointerOver3 = () => {
         document.body.style.cursor = 'pointer';
         console.log('overDrone');
       };
     
       const handlePointerOut3 = () => {
         document.body.style.cursor = 'auto';
         console.log('outDrone');
       };
      /**
      * HOLOGRAM -----------------------------------------------------------------------------UNICORN
      */

      const random2D = `
      float random2D(vec2 value)
      {
          return fract(sin(dot(value.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      `;
      const holographicVertexShader = `
      uniform float uTime;
      uniform float uHover;
      
      varying vec3 vPosition;
      varying vec3 vNormal;
      
      float random2D(vec2 value) {
        return fract(sin(dot(value.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      
      void main() {
        // Position
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        
        // Glitch
        float glitchTime = uTime - modelPosition.y;
        float glitchStrength = sin(glitchTime) + sin(glitchTime * 5.45) + sin(glitchTime * 0.76);
        glitchStrength /= 1.5;
        glitchStrength = smoothstep(0.4, 1.0, glitchStrength);
        glitchStrength *= 0.025 + 0.1 * uHover; // Base glitch effect + intensified by hover
        modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength;
        modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrength;
        
        // Final position
        gl_Position = projectionMatrix * viewMatrix * modelPosition;
        
        // Model normal
        vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
        
        // Varyings
        vPosition = modelPosition.xyz;
        vNormal = modelNormal.xyz;
      }
    `;
              // ${effects}
              const holographicFragmentShader = `
              uniform float uTime;
              uniform vec3 uColor;
              
              varying vec3 vPosition;
              varying vec3 vNormal;
              
              void main()
              {
                  // Normal
                  vec3 normal = normalize(vNormal);
                  if (!gl_FrontFacing) {
                      normal *= -1.0;
                  }
              
                  // Stripes
                  float stripes = mod((vPosition.y - uTime * 0.04) * 60.0, 2.0);
                  stripes = pow(stripes, 1.2);
              
                  // Fresnel
                  vec3 viewDirection = normalize(vPosition - cameraPosition);
                  float fresnel = dot(viewDirection, normal) + 1.1;
                  fresnel = pow(fresnel, 0.9);
              
                  // Falloff
                  float falloff = smoothstep(0.1, 0.1, fresnel);
              
                  // Holographic
                  float holographic = stripes * fresnel;
                  holographic += fresnel * 2.15;
                  holographic *= falloff;
              
                  // Adjust brightness
                  float brightness = 0.30; // Adjust this value to reduce brightness
              
                  // Final color
                  vec3 finalColor = uColor * brightness * holographic;
              
                  gl_FragColor = vec4(finalColor, 0.2);
              
                  // Commented out tonemapping and colorspace fragments to simplify
                  // #include <tonemapping_fragment>
                  // #include <colorspace_fragment>
              }
            `;

      const materialParameters = {}
      //materialParameters.color = '#0f81bd'
      const hologram = new THREE.ShaderMaterial({
            vertexShader: holographicVertexShader,
            fragmentShader: holographicFragmentShader,
            uniforms:
            {
                uTime: new THREE.Uniform(0),
                uColor: new THREE.Uniform(new THREE.Color(0.2, 1.4, 4.0)),
                uEmissiveColor: new THREE.Uniform(new THREE.Color(0x0f81bd)), // Red emissive color
                uEmissiveStrength: { value: 33.0 }, // Emissive strength
            },
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
           // specular: 0x000000, // Disable specular reflection
            blending: THREE.AdditiveBlending
      })

      const materialParameters2 = {}
      materialParameters.color = '#FFC000'
      const hologram2 = new THREE.ShaderMaterial({
            vertexShader: holographicVertexShader,
            fragmentShader: holographicFragmentShader,
            uniforms:
            {
                uTime: new THREE.Uniform(0),
                uColor: new THREE.Uniform(new THREE.Color(3.0, 0.2, 0.7)),
                uEmissiveColor: new THREE.Uniform(new THREE.Color(0xFFC000)), // Red emissive color
                uEmissiveStrength: { value: 33.0 }, // Emissive strength
            },
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
        //    specular: 0x000000, // Disable specular reflection
            blending: THREE.AdditiveBlending
      })

      const materialParameters3 = {}
      materialParameters.color = '#FFC000'
      const hologram3 = new THREE.ShaderMaterial({
            vertexShader: holographicVertexShader,
            fragmentShader: holographicFragmentShader,
            uniforms:
            {
                uTime: new THREE.Uniform(0),
                uColor: new THREE.Uniform(new THREE.Color(3.0, 2.0, 1.0)),
               // uColor: new THREE.Uniform(new THREE.Color(materialParameters3.color)),
                uEmissiveColor: new THREE.Uniform(new THREE.Color(0xFFC000)), // Red emissive color
                uEmissiveStrength: { value: 33.0 }, // Emissive strength
            },
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
         //   specular: 0x000000, // Disable specular reflection
            blending: THREE.AdditiveBlending
      })

      const unicorn = useLoader(OBJLoader, './unicorn.obj');
      const unicornRef = useRef();
      unicorn.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name === "unicorn") {
          child.material = hologram; 
        }
        if (child instanceof THREE.Mesh && child.name === "red") {
          child.material = hologram2; 
        }
        if (child instanceof THREE.Mesh && child.name === "yellow") {
          child.material = hologram3; 
        }
      });
        // Update the shader uniform each frame  
      useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        hologram.uniforms.uTime.value = elapsedTime;
        hologram2.uniforms.uTime.value = elapsedTime + 1.01;
        hologram3.uniforms.uTime.value = elapsedTime + 3.04;
        
      });
      useEffect(() => {
      //  gsap.to(unicornRef.current.rotation,{ y: 1, duration: 20, repeat: -1, yoyo: true});
        gsap.fromTo(unicornRef.current.rotation, { rotation: 4.9 }, {
          y: +.8,
          duration: 9,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1
        }); 
      // Add event listeners for mouse events 
      });

     
   


   
    // Add event listeners for first interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        handleFirstInteraction();
      }
    };
    
    const canvas = gl.domElement;
    canvas.addEventListener('click', handleInteraction);
    canvas.addEventListener('touchstart', handleInteraction);
    
    return () => {
      canvas.removeEventListener('click', handleInteraction);
      canvas.removeEventListener('touchstart', handleInteraction);
    };
  }, [gl.domElement, hasInteracted, handleFirstInteraction]);

  return (
    <>
    <PerspectiveCamera 
      makeDefault 
      position={[0, 4, 2.7]} 
      fov={75} 
      near={0.1} 
      far={1000}
    />
    <OrbitControls
      ref={controlsRef}
      target={target}
     
      enableZoom={true}
      enablePan={true}
      minPolarAngle={Math.PI / 1.3} // ~60 degrees (reduced from 30)
      maxPolarAngle={Math.PI / 1.8} // ~100 degrees (reduced from ~120)
      minAzimuthAngle={-Math.PI / 3.5} // -45 degrees
      maxAzimuthAngle={Math.PI / 5} // 45 degrees
      enableDamping={true}
      dampingFactor={0.01}
      screenSpacePanning={true}
      panSpeed={0.5}
      maxDistance={1}
      minDistance={-0.1}
      onChange={(e) => {
        // Limit vertical panning (Y-axis)
        const minY = 1.0;  // Lower minimum Y for more downward movement
        const maxY = 6.0;  // Higher maximum Y for more upward movement
        
        // Get current camera position
        const position = e.target.object.position;
        
        // Clamp Y position between minY and maxY
        position.y = Math.max(minY, Math.min(maxY, position.y));
        
        // Update camera position
        e.target.object.position.copy(position);
      }}
    />
    <primitive object={floor} material={matteblack}/>

    {/* Spotlight for objA */}
    <spotLight
      ref={spotLightRef}
      position={[0, 9, 11]}
      angle={0.8}
      penumbra={0.2}
      intensity={220}
      distance={25}
      castShadow
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-bias={-0.0001}
      color="#ffffff"
    />

    <group ref={group1Ref} position= {[ 0, 0.9, 0 ]}>    
    <Button onClick={animateGroups} />
    <Button2 />
    <Button3 onClick={animateGroups} />

    <primitive 
      object={objA} 
      scale={[0.0025, 0.0025, 0.0025]}
      position={[0, 1.8 , 0]} 
      rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
      castShadow 
    />      
    <primitive 
      object={walk} 
      scale={[0.0015, 0.0015, 0.0015]} 
      position={[-0.24, 1.8, -0]} 
      rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(80), 0]} 
      castShadow 
    />   
    <primitive 
      object={objB} 
      scale={[0.0025, 0.0025, 0.0025]}
      position={[0, 1.8 , 0]} 
      rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
      castShadow 
    />
    <primitive 
      object={objC} 
      scale={[0.0025, 0.0025, 0.0025]}
      position={[0, 1.8 , 0]} 
      rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
      castShadow 
    />
    <primitive 
      object={objD} 
      scale={[0.0025, 0.0025, 0.0025]}
      position={[0, 1.8 , 0]} 
      rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
      castShadow 
    />
    <primitive 
      object={obj2} 
      scale={[0.0025, 0.0025, 0.0025]} 
      position={[0, 1.8, 0]} 
      rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
      castShadow 
    />
    <primitive 
      object={obj3} 
      scale={[0.0025, 0.0025, 0.0025]} 
      position={[0, 1.8, 0]} 
      rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
      castShadow 
    />
    <primitive 
      object={clonedWires} 
      scale={[0.0025, 0.0025, 0.0025]} 
      position={[-2.15, 1.8, -12.7]} 
      rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
      ref={wiresRef}
      castShadow 
    />
    <mesh 
      position={[-2.15, 1.6, -12.6]}   
      rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]}
      onClick={animateGroups2}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'auto';
      }}
      onPointerMissed={() => document.body.style.cursor = 'auto'}
      raycast={THREE.Mesh.raycast}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="red" side={THREE.DoubleSide} transparent opacity={0.0} />
    </mesh>
      <primitive 
        object={objA} 
        scale={[0.0025, 0.0025, 0.0025]}
        position={[0, 1.8 , 0]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
        castShadow 
      />      
      <primitive 
        object={walk} 
        scale={[0.0015, 0.0015, 0.0015]} 
        position={[-0.24, 1.8, -0]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(80), 0]} 
        castShadow 
      />   
      <primitive 
        object={objB} 
        scale={[0.0025, 0.0025, 0.0025]}
        position={[0, 1.8 , 0]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
        castShadow 
      />
      <primitive 
        object={objC} 
        scale={[0.0025, 0.0025, 0.0025]}
        position={[0, 1.8 , 0]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
        castShadow 
      />
      <primitive 
        object={objD} 
        scale={[0.0025, 0.0025, 0.0025]}
        position={[0, 1.8 , 0]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
        castShadow 
      />
      <primitive 
        object={obj2} 
        scale={[0.0025, 0.0025, 0.0025]} 
        position={[0, 1.8, 0]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
        castShadow 
      />
      <primitive 
        object={obj3} 
        scale={[0.0025, 0.0025, 0.0025]} 
        position={[0, 1.8, 0]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
        castShadow 
      />
      <primitive 
        object={clonedWires} 
        scale={[0.0025, 0.0025, 0.0025]} 
        position={[-2.15, 1.8, -12.7]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
        ref={wiresRef}
        castShadow 
      />
        
        <primitive 
        object={sneaks} 
        scale={[0.0032, 0.0032, 0.0032]} 
        position={[0.8, 2.4, 0.27]} 
        //rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} <Blitz /> 
        ref={sneaksRef}
        castShadow 
      />
      <primitive 
        object={pole3} 
        scale={[0.0025, 0.0025, 0.0025]} 
        position={[-2.15, 1.8, -12.7]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
        castShadow 
      />
      <primitive 
        object={clonedPole3} 
        scale={[0.0025, 0.0025, 0.0025]} 
        position={[-0.5, 1.8, -25.5]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
        castShadow 
      />
      <primitive 
        object={clonedWires3} 
        scale={[0.0025, 0.0025, 0.0025]} 
        position={[-0.55, 1.8, -25.5]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
        ref={wiresRef}
        castShadow 
      />
      <primitive 
        object={clonedPole3B} 
        scale={[0.0025, 0.0025, 0.0025]} 
        position={[1.55, 1.8, -13.1]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
        castShadow 
      />
      <primitive 
        object={clonedWires2} 
        scale={[0.0025, 0.0025, 0.0025]} 
        position={[-2.68, 1.8, -37.8]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
        ref={wiresRef}
        castShadow 
      />
      <primitive 
        object={cam1} 
        scale={[0.0025, 0.0025, 0.0025]} 
        position={[0.20, 2.64, 0.12]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-55), 0]} 
        castShadow 
        ref={meshRef}
      />     
      <primitive 
        object={cam2} 
        scale={[0.0025, 0.0025, 0.0025]} 
        position={[-0.169, 2.87, 0.18]} 
        rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-125), 0]} 
        castShadow 
        ref={meshRef2}
      />
      <primitive
           object={screener}
           scale={[0.0025, 0.0025, 0.0025]}
           position={[0.42, 1.185, 0.085]} // Adjust position based on your scene
           rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-130), 0]} // Adjust rotation if needed
           castShadow
           ref={screenerRef}
      />
      <primitive 
          object={drone} 
          ref={droneRef}
          scale={[0.0175, 0.0175, 0.0175]}
          position={[-0.42, 2.7, 0.085]} 
          rotation={[0, -1, 0]} 
          onClick={handleDroneClick}
          onPointerEnter={handlePointerOver3}
          onPointerLeave={handlePointerOut3}
      />
      <primitive 
          object={unicorn} 
          ref={unicornRef}
          scale={[0.0040, 0.0040, 0.0030]}
          position={[0.03, 2.1, 0.31]} 
          rotation={[0, 0.15, 0]} 
      /> 

      </group>
  
      <group ref={group2Ref} position={[0.9, 0.6, 0.6]}>
        <Html
        scale={[0.11, 0.11, 0.11]}
          position={[-1, 1.5, 0]}
          transform
          occlude={false}
          distanceFactor={10}
          zIndexRange={[10, 0]}
          style={{
            transform: 'scale(2)',
            transformOrigin: 'center',
            pointerEvents: 'none',
            width: '500px',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            imageRendering: 'crisp-edges',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            willChange: 'transform'
          }}
        >
          <img 
            src="/textures/logo.svg" 
            alt="Logo" 
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'contain',
              imageRendering: 'crisp-edges',
              filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.3))',
              transform: 'translateZ(0)'
            }} 
          />
        </Html>
        </group>
        <group ref={group2Ref} position={[0, 1, -13]}>
          <Blimp />
          <group scale={[1.99, 1.6, 1.6]} position={[0, 2.5, 0]}>
            <City />
          </group>
          <Car1 />
          <Car2 />
          <Car3 />
          <Decker />
        </group>
       <group rotation={[0, Math.PI / 0.455, 0]} position={[-0.426, 1.4, -12]}   onClick={animateGroups3}>
   
          <planeGeometry   args={[0.5, 0.7]}    
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
          }}
   />
          <meshBasicMaterial color="green" side={THREE.DoubleSide}  transparent opacity={0.5} />
      
        {/* targetPosition={targetPosition} <Blitz2 /> <Blitz /> <Traffic /> */}
      </group>
    
    </>
    );
  };

export default Experience;