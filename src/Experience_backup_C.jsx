import React, { useEffect, useRef, Suspense, useState, } from 'react';
import { useThree, useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three-stdlib';
import { MeshStandardMaterial, MeshBasicMaterial, PlaneGeometry, Mesh } from 'three'; 
import * as THREE from 'three';
import { Clock } from 'three'; 
import { easing } from "maath"; // Assuming "maath" is installed properly
import Button from './Button.jsx';
import Button2 from './Button2.jsx';
import Button3 from './Button3.jsx';
import Button4B from './Button4B.jsx';
import UseSwivelTV from './UseSwivelTV';
import { gsap } from "gsap";
import { CSSPlugin  } from '../public/resources/gsap/CSSPlugin.js';
import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader';
// import ScrollComponent from './ScrollComponent'; // Import the scroll component             <ScrollComponent />
//import Traffic from './TrafficLight.jsx'
//import Blitz from './Blitz3.jsx'
//import City from './City_holodeck.jsx'
//import Car1 from './City_trails.jsx'
//import Car2 from './City_trails2.jsx'
//import Decker from './Decker.jsx'


//const Traffic = React.lazy(() => import('./TrafficLight.jsx'));
//const Blitz2 = React.lazy(() => import('./Blitz3.jsx'));
const City = React.lazy(() => import('./City_holodeck.jsx'));
const Car1 = React.lazy(() => import('./City_trails.jsx'));
const Car2 = React.lazy(() => import('./City_trails2.jsx'));
const Blimp = React.lazy(() => import('./Blimp.jsx'));
//const Decker = React.lazy(() => import('./Decker.jsx'));


//import { Expo, Sine } from '../public/resources/gsap/EasePack.js';
gsap.registerPlugin(CSSPlugin);


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
  color: 0x000000, metalness: 0.5, roughness: 0.9, reflectivity: 0.5, clearcoat: 0.1, clearcoatRoughness: 0.2 
  }); 
  const chrome = new THREE.MeshPhysicalMaterial({ 
  color: 0xc6c6c6, metalness:0.5, roughness: 0,  reflectivity: 0.5, clearcoat: 0.5, clearcoatRoughness: 0.5,
  }); 
  const darkgrey = new THREE.MeshPhysicalMaterial({     
    color: 0xACACAC,  metalness: 0.5, roughness: 0.9, reflectivity: 0.5, clearcoat: 0.1, clearcoatRoughness: 0.2
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
  const Experience = ( { paused }) => {
   //const { camera, mouse } = useThree();  // Accessing the camera object
   const {  scene, gl, camera } = useThree();
   const { camera: threeCamera } = useThree();
   const [materials, setMaterials] = useState(null);
   //const renderer = useContext(RendererContext);
// Initialize materials and destructure the result
  const { matteblack, black, greenlight, blue, yellowlight, whitelight, white, yellow, redlight2, bluelight3, glass, chrome, grey, lightgrey, darkgrey, red } = initializeMaterials();

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

    UseSwivelTV(screenerRef, threeCamera);
    // Define the target position and lookAt for zooming in
 // Define state for target position and lookAt
 const [targetPosition, setTargetPosition] = useState(null);
 const [targetLookAt, setTargetLookAt] = useState(null);

 // Reset values when needed
 const resetCamera = () => {
   setTargetPosition(null);
   setTargetLookAt(null);
 };

 // Original position and lookAt
 const originalPosition = new THREE.Vector3(-2.8, 5.9, 11);
 const originalLookAt = new THREE.Vector3(-0.1, 2.9, 0.8);

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
     // console.log('group1Ref:', group1Ref.current);
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
        console.log('group2Ref:', group2Ref.current);
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
      handleClick(); // Assuming handleClick is defined elsewhere
    
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
        const originalPosition = useRef(camera.position.clone());
        const originalLookAt = useRef(new THREE.Vector3());

        useEffect(() => {
            originalLookAt.current.copy(camera.position.clone().add(camera.getWorldDirection(new THREE.Vector3())));
          }, [camera]);

          useFrame((state, delta) => {
            // Handle camera movement towards target or reset position
            if (targetPosition && targetLookAt) {
              gsap.to(camera.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 2,
                ease: "power2.inOut"
              });
        
              gsap.to(camera.rotation, {
                x: THREE.MathUtils.lerp(camera.rotation.x, targetLookAt.x, 0.1),
                y: THREE.MathUtils.lerp(camera.rotation.y, targetLookAt.y, 0.1),
                z: THREE.MathUtils.lerp(camera.rotation.z, targetLookAt.z, 0.1),
                duration: 2,
                ease: "power2.inOut"
              });
            } else {
              gsap.to(camera.position, {
                x: originalPosition.current.x,
                y: originalPosition.current.y,
                z: originalPosition.current.z,
                duration: 2,
                ease: "power2.inOut"
              });
        
              gsap.to(camera.rotation, {
                x: THREE.MathUtils.lerp(camera.rotation.x, originalLookAt.current.x, 0.1),
                y: THREE.MathUtils.lerp(camera.rotation.y, originalLookAt.current.y, 0.1),
                z: THREE.MathUtils.lerp(camera.rotation.z, originalLookAt.current.z, 0.1),
                duration: 2,
                ease: "power2.inOut"
              });
            }
        });
        // Apply additional leftward movement when the mouse is on the left side of the screen
        let cameraX = newPositionX;
        if (state.mouse.x < 0) {
          cameraX -= 0.3; // Adjust the value to move the camera further to the left
        }
        if (state.mouse.x > 0) {
          cameraX += 0.3; // Adjust the value to move the camera further to the right
        }
        // Update the camera position
        easing.damp3(camera.position, [cameraX, newPositionY, newPositionZ], 1.1, delta);
        // Keep the camera looking at the same point
        camera.lookAt(-0.1, 2.9, 0.8);
      });
      return null; // Since this is a utility component, it doesn't render anything
    }


  
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
        useEffect(() => {
         // const DLT = gsap.timeline({ repeat: -1 });
         // DLT.to(DL.position, {x:1 , y:20 , z:18, duration: 5 });
         });
      
      /*useEffect(() => {
          const DLT = gsap.timeline({ repeat: -1 });
          gsap.to(DL.position, {x:2 , y:20 , z:18, duration: 5 });
          gsap.to(DL.position, {x:2 , y:20 , z:18, duration: 5 });
          gsap.to(DL.position, {x:5 , y:6 , z:11, duration: 5 });
          gsap.to(DL.position, {x:5 , y:3 , z:11, duration: 50 });
          gsap.to(DL.position, {x:5 , y:15 , z:11, duration: 5 });
        //  DLT.to(DLRef.position, {  y: 1, x: 1, z:1 , duration: 4 }  )
        //    .to(DLRef.rotation, {  y: 1, x: 1 , z:0 , duration: 5 }  )
        //    .to(DLRef.rotation, {  y: 2.5, x: 0 , z:0 , duration: 11 }  )
        //    .to(DLRef.position, {  y: 5, x: -2, z:2 , duration: 11 }  )
        //    .to(DLRef.rotation, {  y: 0.65, x: -2, z:0 , duration: 11}  )
        //    .to(DLRef.position, {  y: 0.2, x: -3, z:1 , duration: 11 }  )
            
            
          },    
        []); */


        /*  
        const spotLightRef = useRef();

        // The useHelper hook from 'drei' can be used to easily add helpers
        useHelper(spotLightRef, SpotLightHelper, 'cyan');
        
        const lightRef = useRef();
        const helperRef = useRef();

        useEffect(() => {
          if (lightRef.current) {
            const helper = new SpotLightHelper(lightRef.current, 'cyan');
            helperRef.current = helper;  // Store helper reference if needed for cleanup or updates
            lightRef.current.parent.add(helper); // This ensures the helper moves with the light

            return () => {
              if (lightRef.current.parent) {
                lightRef.current.parent.remove(helper); // Cleanup the helper on unmount
              }
            };
          }
        }, []);

     */


     // Inside your Experience component
     const plane = new PlaneGeometry(30, 30); // Adjust the size as needed
     const planeMaterial = new MeshBasicMaterial({ color: matteblack }); // Adjust the color as needed
     const floor = new Mesh(plane, planeMaterial);
     floor.rotation.x = -Math.PI / 2; // Rotate the floor to be horizontal
     floor.position.y = -0.5; // Adjust the position to be just below the objects

       // Ref for the drone object
      const droneRef = useRef();

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
      // Create the video element
      const video = document.createElement('video');
      video.src = './plansB.mp4';
      video.crossOrigin = 'Anonymous';
      video.loop = true;
      video.muted = true;
      
      // Create the video texture
      const videoTextureV = new THREE.VideoTexture(video);

      const drone = useLoader(OBJLoader, './drone.obj');
      let videoPlaneGeometry;
      drone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
      // Access the mesh
      const mesh = child;
      // Check if the mesh has geometry
      if (mesh.geometry) {
        // Assign custom materials based on mesh names
          if (mesh.name === "whitelight") {
              mesh.material = whitelight; 
          }
          if (mesh.name === "glass") {
              mesh.material = glass; 
            }
          if (mesh.name === "black") {
              mesh.material = black; 
            }
            if (mesh.name === "yellowlight") {
              mesh.material = glass; 
            }
            if (mesh.name === "blue") {
              mesh.material = blue; 
            }
            if (mesh.name === "chrome") {
              mesh.material = chrome; 
            }
            if (child instanceof THREE.Mesh && child.name === 'videoplane') {  
                videoPlaneGeometry = child;
                videoPlaneGeometry.visible = false; // or false depending on your initial state
                child.material = new THREE.MeshPhysicalMaterial({ 
                        map: videoTextureV, 
                        transparent: true,
                        opacity: 0.65,
                        blending: THREE.AdditiveBlending,
                        depthWrite: false,
                        side: THREE.DoubleSide,
                        //color: 0xffffff, 
                        emissive: 0xFFFFFF, 
                        emissiveIntensity: 0.15,                            
                        //metalness: 0.1,  
                       // roughness: 0, 
        
                      });
                  }                         
              }       
          }     
      });
        // Add click event listener to the drone
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
        useEffect(() => {

          const updatePosition = () => {
            droneRef.current.position.y = Math.sin(Date.now() * 0.0011) * 0.120;
            droneRef.current.position.z = Math.sin(Date.now() * 0.002) * 0.050;
            droneRef.current.position.x = Math.sin(Date.now() * 0.001) * 0.050;
        
           // console.log("dronePos: ", droneRef.current.position);
          };
        
          const animation = gsap.to(droneRef.current.position, { 
            x: 0.5, 
            y: 2.7, 
            z: 11, 
            duration: 1 
          });
        
          const interval = setInterval(updatePosition, 1000 / 60); // Run at ~60FPS
        
          return () => {
            clearInterval(interval); // Cleanup interval on unmount
            animation.kill(); // Kill the gsap animation on unmount
          };
        }, []);

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

      const handleClickTV = () => {
        // Set the new target position and lookAt
        setTargetPosition(new THREE.Vector3(0.5, 1.5, 2)); // Adjust this to the desired target position
        setTargetLookAt(new THREE.Vector3(0.5, 1.5, 0)); // Adjust this to the desired lookAt
      };
   


   
    return (
    <>

    <group>
      

      </group>     
      <primitive object={DL} useRef={DLRef}/>
      <primitive object={floor} material={matteblack}/>

      <group ref={group1Ref} position= {[ 0, 0.9, 0 ]}>    
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
      //     object={screener}
       //    scale={[0.0025, 0.0025, 0.0025]}
       //    position={[0.42, 1.185, 0.085]} // Adjust position based on your scene
        //   rotation={[0, Math.PI / -2 + THREE.MathUtils.degToRad(-130), 0]} // Adjust rotation if needed
        //   castShadow
        //   ref={screenerRef}
      />
      <primitive 
          object={drone} 
          ref={droneRef}
          scale={[0.0175, 0.0175, 0.0175]}
          position={[-0.42, 2.7, 0.085]} 
          rotation={[0, -1, 0]} 
          onClick={handleDroneClick}
      />
      <primitive 
          object={unicorn} 
          ref={unicornRef}
          scale={[0.0040, 0.0040, 0.0030]}
          position={[0.03, 2.1, 0.31]} 
          rotation={[0, 0.15, 0]} 
      /> 
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
      </group>
  
      <group ref={group2Ref} position={[0, 1.2, -13]} >
          
   
       
      </group>
   
    <group>
  {/* targetPosition={targetPosition} <Blitz2 />  <Rig fov={20} aspect={window.innerWidth / window.innerHeight} near={0.1} far={1000} />    <OrbitControls enableDamping={true} dampingFactor={0.05}/> <OrbitControls enableDamping={true} dampingFactor={0.05}/>   */}

  <Rig targetPosition={targetPosition || originalPosition} targetLookAt={targetLookAt || originalLookAt} fov={20} aspect={window.innerWidth / window.innerHeight} near={0.1} far={1000} />
     

    </group>
    
    </>
    );
  };

export default Experience;