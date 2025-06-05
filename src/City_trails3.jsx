import React, { useEffect, useMemo, useRef } from 'react';
//import { Trail } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';
import * as THREE from 'three';
import { gsap } from "gsap";
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three-stdlib';
import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader';

const redlight = new THREE.MeshStandardMaterial({ 
    transparent: true,  
    opacity: 0.1, 
    color: 0xe71212, 
    emissive: 0xe71212, 
    emissiveIntensity: 7.5, 
    metalness: 0, 
    roughness: 0.5,
  });
  // Define the materials  f4b453
  const grey = new THREE.MeshPhysicalMaterial({     
    color: 0xACACAC,      // Metal color
    metalness: 0.5,       // Metalness factor (1 for metal)
    roughness: 0.9,       // Roughness factor (0 for perfectly smooth)
    reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
    clearcoat: 0.1,       // Clearcoat intensity (0 to 1)
    clearcoatRoughness: 0.2, // Roughness of the clearcoat layer
    transparent: true,
    opacity: 1,
}); 
const yellow = new THREE.MeshPhysicalMaterial({  
    transparent: true,  
    opacity: 1, 
    color: 0xf4b453,      // Metal color
    metalness: 0.5,       // Metalness factor (1 for metal)
    roughness: 0.1,       // Roughness factor (0 for perfectly smooth)
    reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
    clearcoat: 0.1,       // Clearcoat intensity (0 to 1)
    clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const carRed = new THREE.MeshPhysicalMaterial({    
  transparent: true,  
  opacity: 1, 
  color: 0xe71212,      // Metal color
  metalness: 0.5,       // Metalness factor (1 for metal)
  roughness: 0.1,       // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,       // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const lightgrey = new THREE.MeshPhysicalMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xd1d1d1 , 
  metalness: 0.5,         // Metalness factor (1 for metal)
  roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const blue = new THREE.MeshPhysicalMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0x8eb5e2,
  metalness: 0.5,         // Metalness factor (1 for metal)
  roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const metalblue = new THREE.MeshPhysicalMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0x8eb5e2,
  metalness: 0.7,         // Metalness factor (1 for metal)
  roughness: 0.3,         // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const green = new THREE.MeshPhysicalMaterial({     
  transparent: true,  
  opacity: 1,
  color: 0x6c8f4e,      // Metal color
  metalness: 0.5,       // Metalness factor (1 for metal)
  roughness: 0.1,       // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.0,       // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 
const glass = new THREE.MeshPhysicalMaterial({     
  transparent: true,  
  opacity: 1,
  transmission: 1,     // Metal color
  metalness: 0.55,        // Metalness factor (1 for metal)
  roughness: 0.1,        // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.8,     // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,          // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.05, // Roughness of the clearcoat layer
  envMapIntensity: 0.5,
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
const matteblack = new THREE.MeshPhysicalMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0x000000,
  metalness: 0.5,         // Metalness factor (1 for metal)
  roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
  reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
  clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
  clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
}); 

const redlightOld = new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xe71212, 
  emissive: 0xeff471a, 
  emissiveIntensity: 3, 
  metalness: 0, 
  roughness: 1, 
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
const wireframeMaterial = new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xeb9d20, 
  emissive: 0xeb9d20, 
  emissiveIntensity: 1, 
  metalness: 0, 
  roughness: 1,
  wireframe: true,
  wireframeLinewidth: 0.2, 
});
const bluelight = new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xe1351e9, 
  emissive: 0xe1351e9, 
  emissiveIntensity: 1, 
  metalness: 0, 
  roughness: 1, 
});
const redlight2 = new MeshStandardMaterial({ 
  transparent: true, 
  opacity: 1, 
  color: 0xe71212, 
  emissive: 0xe71212, 
  emissiveIntensity: 2, 
  metalness: 0, 
  roughness: 1, 
});
const bluelight2 = new MeshStandardMaterial({ 
  transparent: true, 
  opacity: 1, 
  color: 0xe1351e9, 
  emissive: 0xe1351e9, 
  emissiveIntensity: 5, 
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
const windowlight = new MeshStandardMaterial({ 
  transparent: true, 
  opacity: 1, 
  color: 0xffff00, 
  emissive: 0xFFC000, 
  emissiveIntensity: 0.25, 
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
  emissiveIntensity: 2.5, 
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
  emissiveIntensity: 0.5, 
  metalness: 0, 
  roughness: 1, 
});
const whitelightC= new MeshStandardMaterial({ 
  transparent: true, 
  opacity: 1, 
  color: 0xffffff, 
  emissive: 0xe6662e9, 
  emissiveIntensity: 5.5, 
  metalness: 0, 
  roughness: 1, 
});
const brightwhite= new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xffffff, 
  emissive: 0xe6662e9, 
  emissiveIntensity: 16, 
  metalness: 0, 
  roughness: 1, 
});
const greenlight= new MeshStandardMaterial({ 
  transparent: true,
  opacity: 1,  
  color: 0x46bd58,
  emissive: 0xa5ce6c, 
  emissiveIntensity: 2.5, 
  metalness: 0, 
  roughness: 1, 
});
const envMap = new CubeTextureLoader().load([
    './px.jpg', // Positive X
    './nx.jpg', // Negative X
    './py.jpg', // Positive Y
    './ny.jpg', // Negative Y
    './pz.jpg', // Positive Z
    './nz.jpg', // Negative Z
  ]);
  const chrome = new THREE.MeshPhysicalMaterial({ 
    transparent: true,  
    opacity: 1,
    color: 0xc6c6c6,
    metalness:0.5,         // Metalness factor (1 for metal)
    roughness: 0,         // Roughness factor (0 for perfectly smooth)
    reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
    clearcoat: 0.5,         // Clearcoat intensity (0 to 1)
    clearcoatRoughness: 0.5,
    envMap: envMap, // Roughness of the clearcoat layer
    envMapIntensity: 0.75,
  }); 


  
  const Car3 = () => {
 
    const diablo = useLoader(OBJLoader, './aircar_diablo.obj');
    const diabloRef = useRef();
    const boxRef = useRef();
    const boxRef2 = useRef();
    diablo.traverse((child) => {
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
              if (mesh.name === "yellowlightsoft") {
                mesh.material = orangelight; 
              }
              if (mesh.name === "redlight") {
                mesh.material = redlight; 
                //redlightRef.current = mesh; 
              }
              if (mesh.name === "silver") {
                mesh.material = chrome; 
              }
              if (mesh.name === "chrome") {
                mesh.material = metalblue; 
              }
              if (mesh.name === "orangelight") {
               mesh.material = orangelight; 
             }
          }
        }   
      });



      useEffect(() => {
       function randomDuration() {
         return Math.random() * (9 - 7) + 5; // Generate a random number between 7 and 9
       }
       const tCarsee = gsap.timeline({ repeat: 0 });
       tCarsee
         .to(diabloRef.current.position, { x: -0.9, y: 1.8, z: -0.3, duration: 9.2, ease: 'power3.inOut' ,onComplete: () => console.log('run-up') }) // First pass 
         .to(diabloRef.current.position, { x: -2.1, y: 3.5, z: 14, duration: 7.1, ease: 'Expo.inOut',onComplete: () => console.log('accident')  }) // Till first turn
         .to(diabloRef.current.rotation, { y: 0.50, z: 1.05, duration: 5, ease: 'Expo.inOut',onComplete: () => console.log('crashpole') }, "-=3.9") // First turn
         .to(diabloRef.current.position, { x: 2.0, y: 3.5, z: 13.7, duration: 5.5, ease: 'Expo.inOut' }, "-=2") // Reposition
         .to(diabloRef.current.rotation, { y: 3.1, z: 0, duration: 5, ease: 'Expo.in' }, "-=4.3") // Collision avoidance
         .to(diabloRef.current.position, { x: 1.2, y: 2.2, z: 12.65, duration: 4, ease: 'Expo.inOut' }, "-=2.3") // Reposition
         .to(diabloRef.current.position, { x: 1.2, y: 0.95, z: 12.3, duration: 7, ease: 'Expo.inOut' }) // Wait
         .to(diabloRef.current.position, { x: 1.2, y: 0.99, z: 13.5, duration: 11, ease: 'Expo.inOut' }) // Wait 
         .to(diabloRef.current.position, { x: -0.9, y: 2.8, z: -13.3, duration: 15, ease: 'expo.inOut' }) // Resume course till end
         .to(diabloRef.current.rotation, { y: 1.8, duration: 4, ease: 'Expo.out' }, "-=2") // Turn
         .to(diabloRef.current.position, { x: -2.1, y: 3.5, z: -15.5, duration: 2, ease: 'Expo.inOut' }) // Reposition at start
       /*  .to(diabloRef.current.rotation, { y: 1.8, duration: 3, ease: 'Expo.inOut' }, "-=4") // Turn
         .to(diabloRef.current.position, { x: -2.4, y: 2.5, z: -15.9, duration: 6, ease: 'Expo.inOut' }) // Reposition
         .to(diabloRef.current.rotation, { y: 0.12, duration: 3, ease: 'Expo.inOut' }, "-=4") // Reposition
         .to(diabloRef.current.position, { x: 2.6, y: 5, z: -16, duration: 8.5, ease: 'power3.inOut' }) // Travel to end
         .to(diabloRef.current.rotation, { y: -1.8, duration: 3 }) // Reposition -90
         .to(diabloRef.current.position, { x: -2.1, y: 3.7, z: -16, duration: 1.5, ease: 'power1.inOut' }) // Reposition
         .to(diabloRef.current.rotation, { y: 0.12, duration: 3 }) // Reposition 
         .to(diabloRef.current.position, { x: -2.1, y: 4.9, z: -16, duration: 4, ease: 'power3.inOut' }) // Reposition
         .to(diabloRef.current.position, { x: 2.4, y: 2.2, z: 22, duration: 6, ease: 'Expo.inOut' }) // Travel to end
         .to(diabloRef.current.rotation, { y: -1.8, duration: 1.5 }) // Reposition
         .to(diabloRef.current.position, { x: -2.4, y: 4.8, z: -16, duration: 5.5, ease: 'Expo.inOut' }) // Reposition
         .to(diabloRef.current.rotation, { y: 0.12, duration: 5.8 }) // Reposition
         .to(diabloRef.current.position, { x: -2.4, y: 4.6, z: 16, duration: 5, ease: 'Expo.inOut' }) // Reposition
         .to(diabloRef.current.position, { x: -0.9, y: 1.8, z: -16.3, duration: 7, ease: 'power3.inOut' }) // First pass 
         .to(diabloRef.current.position, { x: -2.1, y: 5, z: 14, duration: 7, ease: 'Expo.inOut' }) // Reposition at start
         .to(diabloRef.current.rotation, { y: 1.8, duration: 3, ease: 'Expo.inOut' }) // Reposition
         .to(diabloRef.current.position, { x: 2.4, y: 5.2, z: 14, duration: 5.5, ease: 'Expo.inOut' }) // Reposition
         .to(diabloRef.current.rotation, { y: 1.8, duration: 1, ease: 'Expo.inOut' }) // Reposition
         .to(diabloRef.current.position, { x: 2.6, y: 5, z: -17.5, duration: 6.5, ease: 'power3.inOut' }) // Reposition */
       // Cleanup function to kill the timeline
       return () => {
         tCarsee.kill();
       };
     }, []); // Empty dependency array to run only once on mount


/* ----------------------------------------------------------------------------------- diablo clones, decker and the rest ----------------------------------------------- */ 
// Function to clone object
const cloneRef = useRef();
const cloneObject2 = (diablo) => {
 const clonedObject2 = diablo.clone();

 clonedObject2.traverse((child) => {
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
                   if (mesh.name === "yellowlightsoft") {
                     mesh.material = orangelight; 
                   }
                   if (mesh.name === "redlight") {
                     mesh.material = redlight; 
                   }
                   if (mesh.name === "silver") {
                     mesh.material = carRed; 
                   }
                   if (mesh.name === "chrome") {
                     mesh.material = chrome; 
                 }
                
             }
         }   
     });
 return clonedObject2;
};
// Clone of the diablo object
const diabloClone = useMemo(() => cloneObject2(diablo), [diablo]);            
// Define adjustable parameters for the animation
const diabloanimationParams = {
 initialPosition: { x: 2.9, y: 4.8, z: 28 },
 finalPosition: { x: 1.2, y: 3.1, z: -21 },
 rotationY: { start: +3.02, end: -0.20 },
 duration: 2.4,
};       
// Animation logic
useEffect(() => {
 gsap.to(diabloClone.rotation, {y:+3.05, duration:2})
 gsap.to(diabloClone.position, {x:-2.9 , z:21 , y:2, duration:5, ease: 'power2.inOut'}, "-=2")
 const tdiablo = gsap.timeline({ repeat: -1 });     
 // Animation sequence
 tdiablo.from(diabloClone.position, { ...diabloanimationParams.initialPosition, duration: diabloanimationParams.duration })
 .to(diabloClone.rotation, { y: diabloanimationParams.rotationY.start, duration: 2 })
 .to(diabloClone.position, { ...diabloanimationParams.finalPosition, duration: 12, ease: 'Expo.inOut' })
 .to(diabloClone.rotation, { y: diabloanimationParams.rotationY.end, duration: 2 })
 .to(diabloClone.position, { ...diabloanimationParams.initialPosition, duration: 10, ease: 'Expo.inOut' })

 // Add more animation steps as needed

}, [diabloClone]);

    // Function to clone object
    const cloneObject4 = (diablo) => {
        const clonedObject4 = diablo.clone();
        clonedObject4.traverse((child) => {
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
                        if (mesh.name === "yellowlightsoft") {
                            mesh.material = orangelight; 
                        }
                        if (mesh.name === "redlight") {
                            mesh.material = redlight; 
                        }
                        if (mesh.name === "silver") {
                            mesh.material = carRed; 
                        }
                        if (mesh.name === "chrome") {
                            mesh.material = yellow; 
                        }
                    
                    }
                }   
            });
        return clonedObject4;
    };
    // Clone of the diablo object
    const diabloClone2 = useMemo(() => cloneObject4(diablo), [diablo]);
        
    // Define adjustable parameters for the animation
    const diabloanimationParams2 = {
        initialPosition: { x: 3.7, y: 3.8, z: 22 },
        finalPosition: { x: 3.3, y: 1.5, z: -15 },
        rotationY: { start: +3.02, end: -0.20 },
        duration: 3.2,
    };

    // Animation logic
    useEffect(() => {
        gsap.to(diabloClone2.rotation, {y:+3.05, duration:2})
        gsap.to(diabloClone2.position, {x:3.5 , z:21 , y:4, duration:7}, "-=2")
        const tdiablo2 = gsap.timeline({ repeat: -1 });

        // Animation sequence
        tdiablo2.from(diabloClone2.position, { ...diabloanimationParams2.initialPosition, duration: diabloanimationParams2.duration })
        .to(diabloClone2.rotation, { y: diabloanimationParams2.rotationY.start, duration: 2 })
        .to(diabloClone2.position, { ...diabloanimationParams2.finalPosition, duration: 11, ease: 'Expo.inOut' })
        .to(diabloClone2.rotation, { y: diabloanimationParams2.rotationY.end, duration: 2 })
        .to(diabloClone2.position, { ...diabloanimationParams2.initialPosition, duration: 13, ease: 'Expo.inOut' })

        // Add more animation steps as needed

    }, [diabloClone2]);



    return (
        <>
   
      <primitive 
        object={diabloClone}  
        ref={cloneRef}
        scale={[0.0040, 0.0040, 0.0040]} 
        position={[ 0, 0,  0]}
        rotation={[0, +1.20, 0]} 
      />  

      
       <primitive 
       ref={diabloRef}
        object={diablo} 
        scale={[0.0040, 0.0040, 0.0040]} 
        position={[0, 0, 0]} 
        rotation={[0, 6.35, 0]} 
      />  

  
        </>
    );
  }

  export default Car3;