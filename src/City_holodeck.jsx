import React, { useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three-stdlib';
import { MeshStandardMaterial } from 'three'; 
import * as THREE from 'three'; 
import { gsap } from "gsap";

import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader';



 // Models
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

const redlight = new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 0.8, 
  color: 0xe71212, 
  emissive: 0xe71212, // Match emissive color to the main color for a glowing effect
  emissiveIntensity: 1.5, 
  metalness: 0, 
  roughness: 0.5,
});

const yellowlight = new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xffff00, 
  emissive: 0xFFC000, 
  emissiveIntensity: 11, 
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



const City = ( { dronePosition } ) => {
 

  const cityRef = useRef(); 
  const group2Ref = useRef();
  const convoyRef3 = useRef();
  
  const convoyRef2 = useRef();
  
  const convoyRef = useRef();
  const Car4Ref = useRef();    
  
  


  /* ----------------------------------------------------------------------------------------- city --------------------------------------------------------------------------- */ 
    const Ref = useLoader(OBJLoader, './city2.obj');
      Ref.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Access the mesh
          const mesh = child;
          // Check if the mesh has geometry
          if (mesh.geometry) {
            // Assign custom materials based on mesh names
            if (mesh.name === "black") {
              mesh.material = matteblack; 
            }
            if (mesh.name === "yellowlight") {
              mesh.material = orangelightsoft; 
            }
            }
          }   
        });


        
  /* ----------------------------------------------------------------------------------- subway & detection ----------------------------------------------------------------- */ 



const car4 = useLoader(OBJLoader, './aircar_subway.obj');
car4.traverse((child) => {
  if (child instanceof THREE.Mesh) {
    // Access the mesh
    const mesh = child;
    // Check if the mesh has geometry
    if (mesh.geometry) {
      // Assign custom materials based on mesh names
      if (mesh.name === "grey") {
        mesh.material = grey; 
      }
      if (mesh.name === "lightgrey") {
        mesh.material = lightgrey; 
      }
      if (mesh.name === "darkgrey") {
        mesh.material = yellow; 
      }
      if (mesh.name === "whitelightC") {
        mesh.material = whitelightC; 
      }
      if (mesh.name === "glass") {
        mesh.material = glass; 
      }
      if (mesh.name === "orangelight") {
        mesh.material = orangelight; 
      }
      if (mesh.name === "bluelight") {
        mesh.material = bluelight; 
      }
      if (mesh.name === "black") {
        mesh.material = black; 
      }
      }
    }   
  });


// Store original and points materials

useEffect(() => {
  function randomDuration() {
    return Math.random() * (40 - 20) + 7; // Generate a random number between 11 and 20
  }
  const tCars = gsap.timeline({ repeat: -1, yoyo: true });
  tCars.to(Car4Ref.current.position, { x: -2.2, y: 3, z: 30, duration: 14, ease: 'power2.inOut' } ) // First pass
       .to(Car4Ref.current.position, { x: -3.2, y: 3, z: 27, duration: 0.5, ease: 'power2.inOut' } ) // reposition at start
       .to(Car4Ref.current.position, { x: 2.8, y: 3, z: 27, duration: 0.5, ease: 'power2.inOut'  } ) // reposition to right side
       .to(Car4Ref.current.position, { x: 2.4, y: 3, z:-14, duration: 13, ease: 'power2.inOut'  } ) // travel to end
       .to(Car4Ref.current.position, { x: 2.9, y: 3, z:-13, duration: 5, ease: 'power2.inOut'  } ) // reposition
       .to(Car4Ref.current.position, { x: 2.8, y:3, z: 27, duration: 15, ease: 'power2.inOut'  } ) // second pass
       .to(Car4Ref.current.position, { x: 2.7, y: 3, z: 27, duration: 2, ease: 'power2.inOut'  } ); //;
}, []);

     
 /* ----------------------------------------------------------------------------------- highflyers  ----------------------------------------------------------------- */ 



        
        const convoy = useLoader(OBJLoader, './aircar_convoy.obj');
        convoy.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Access the mesh
            const mesh = child;
            // Check if the mesh has geometry
            if (mesh.geometry) {
              // Assign custom materials based on mesh names
              if (mesh.name === "grey") {
                mesh.material = black; 
              }
              if (mesh.name === "whitelight") {
                mesh.material = bluelight2; 
              }
              if (mesh.name === "darkgrey") {
                  mesh.material = darkgrey; 
                }
              }
            }   
          });


          const convoy2 = useLoader(OBJLoader, './aircar_convoy2.obj');
          convoy2.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              // Access the mesh
              const mesh = child;
              // Check if the mesh has geometry
              if (mesh.geometry) {
                // Assign custom materials based on mesh names
                if (mesh.name === "grey") {
                  mesh.material = black; 
                }
                if (mesh.name === "whitelight") {
                  mesh.material = bluelight2; 
                }
                if (mesh.name === "darkgrey") {
                    mesh.material = darkgrey; 
                  }
                }
              }   
            });

            const convoy3 = useLoader(OBJLoader, './aircar_convoy3.obj');
            convoy3.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                // Access the mesh
                const mesh = child;
                // Check if the mesh has geometry
                if (mesh.geometry) {
                  // Assign custom materials based on mesh names
                  if (mesh.name === "grey") {
                    mesh.material = black; 
                  }
                  if (mesh.name === "whitelight") {
                    mesh.material = yellowlight; 
                  }
                  if (mesh.name === "darkgrey") {
                      mesh.material = darkgrey; 
                    }
                  }
                }   
              });
              
          

                    useEffect(() => {
                        const convoy = gsap.timeline({ repeat: -1 });
                        convoy.to(convoyRef.current.position, {  y: 9, z: 30.5, duration: 33 }  )
                               .to(convoyRef.current.position, {  y: 9, z: -30.5, duration: 33 }  );
                        },    
                      []);
                      useEffect(() => {
                        const convoy2 = gsap.timeline({ repeat: -1, delay: 5 });
                        convoy2.to(convoyRef2.current.position, {  y: 10, z: 30.5, duration: 32 }  )
                               .to(convoyRef2.current.position, {  y: 10, z: -30, duration: 32 }  );
                        },    
                      []);
                      useEffect(() => {
                        const convoy3 = gsap.timeline({ repeat: -1 });
                        convoy3.to(convoyRef3.current.position, {  y: 11, x: 35.5, z:14 , duration: 32, delay:5 }  )
                               .to(convoyRef3.current.position, {  y: 11, x: -15.5, z: 14, duration: 32 }  );
                        },    
                      []);




  return (
    
    <group ref={group2Ref}>
      <primitive 
        object={Ref} 
        ref={cityRef}
        scale={[0.0070, 0.0070, 0.0070]} 
        position={[-3, 0, 14.6]} 
        rotation={[0, 0.05, 0]} 
        castShadow 
      /> 
      <primitive 
        object={car4} 
        ref={Car4Ref}
        scale={[0.0040, 0.0040, 0.0040]} 
        position={[2.1, 2.8, -30]} 
        rotation={[0, 1.57, 0]} 
        castShadow 
      />
      <primitive 
        object={convoy} 
        ref={convoyRef}
        scale={[0.0015, 0.0015, 0.0015]} 
        position={[-6, 9, -20]} 
        rotation={[0, 0, 0]} 
        castShadow 
      />
       <primitive 
        object={convoy2} 
        ref={convoyRef2}
        scale={[0.0015, 0.0015, 0.0015]} 
        position={[-5.3, 8.2, -20]} 
        rotation={[0, 0, 0]} 
        castShadow 
      /> 
        <primitive 
        object={convoy3} 
        ref={convoyRef3}
        scale={[0.0010, 0.0010, 0.0010]} 
        position={[-22.3, 7.2, 14.4]} 
        rotation={[0, 1.62, 0]} 
        castShadow 
      />
    </group>
    
  );
}
export default City;