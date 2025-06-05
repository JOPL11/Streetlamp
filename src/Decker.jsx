
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useThree, useLoader, useFrame } from '@react-three/fiber';
//import { OBJLoader } from 'three-stdlib';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MeshStandardMaterial } from 'three'; 
import * as THREE from 'three'; 
import { gsap } from "gsap";
import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader';
import { Box3, Vector3 } from 'three';


console.log('Decker component is loading materials...'); // Log when the component is being initialized
 // Models
  // Define the materials  f4b453
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
const whitelight= new MeshStandardMaterial({ 
  transparent: true,  
  opacity: 1,
  color: 0xffffff, 
  emissive: 0xe6662e9, 
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


    //  const Blimp = () => {
        const Decker = () => {
          const deckerRef = useRef();
          useEffect(() => {
           if (!deckerRef.current) return;  // Ensure deckerRef is defined
           // Animation or other logic here
          // console.log('deckerRef:', deckerRef.current);
         }, [deckerRef.current]);  // Watch deckerRef.current for when it's defined
            //console.log('Decker component is loading...'); // Log when the component is being initialized
              // const deckerB = useLoader(OBJLoader, './aircar_decker.obj');
               const decker = useLoader(OBJLoader, './aircar_decker.obj');
               // Check if deckerB is loaded before doing anything
        
               if (!decker) return null;
         
            //   console.log('Decker Loaded', decker);
             // Assign materials to the model
                useEffect(() => {
                    decker.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        switch (child.name) {
                        case "whitelight":
                            child.material = whitelight;
                            break;
                        case "glass":
                            child.material = glass;
                            break;
                        case "black":
                            child.material = black;
                            break;
                        case "orangelight":
                            child.material = orangelight;
                            break;
                        case "redlight":
                            child.material = redlight;
                            break;
                        case "chrome":
                            child.material = chrome;
                            break;
                        default:
                            break;
                        }
                    }
                    });
                }, [decker]);
              
                 //gsap.to(decker.rotation, {y:1.95, duration:20, delay: 5});

                 useEffect(() => {
                    const tdecker = gsap.timeline( {repeat: -1} );
                    tdecker.from(decker.position, {y:11, x:-5.5, z:17.5, duration: 17, ease: 'power2.inOut'}) 
                           .to(decker.rotation, {y:-1.50, z: 0.15, duration: 17, ease: 'power2.inOut', overwrite: 'auto' }, "-=17")   // descending corkscrew turn
                           //.to(decker.position, {duration: 2, ease: 'expo.in', overwrite: 'auto' })
                           .to(decker.position, {y:2, x:15, z:11, duration: 8, ease: 'expo.in', overwrite: 'auto' })// supposed to accelerate smooth
    
                           .to(decker.rotation, {y:+0.75, z:0, duration: 1}) // turn back around
                           .to(decker.position, {x:-22, y:2, z:11, duration: 10, ease: 'expo.in', overwrite: 'auto'}) // supposed to accelerate smooth
                           .to(decker.rotation, {y:-1.85, duration:2})
                           .to(decker.position, {y:2, x:22, z:11, duration: 17, ease: 'expo.inOut'})
                           .to(decker.rotation, {y:+1.75, duration:2})
                           .to(decker.position, {y:2, x:-22, z:10.5, duration: 12, ease: 'expo.inOut'})
                           .to(decker.rotation, {y:-1.85, duration:2})
                           .to(decker.position, {y:2, x:22, z:11, duration: 18, ease: 'expo.inOut'})
                           .to(decker.rotation, {y:+1.75, duration:2})
                           .to(decker.position, {y:2, x:-22, z:10.5, duration: 22, ease: 'sine.inOut'})
                           .to(decker.rotation, {y:-1.85, duration:2})
                           .to(decker.position, {y:2, x:22, z:11, duration: 17, ease: 'sine.inOut'})
                           .to(decker.rotation, {y:+1.75, duration:0.5})
                           .to(decker.position, {y:33, x:-5.5, z:11.5, duration: 10, ease: 'sine.inOut'})
                           .to(decker.rotation, {y:+1.85, duration:5}, -15 )
                           .to(decker.position, {y:22, x:-5.5, z:17.5, duration: 10, ease: 'sine.inOut'});               
                    },    
                    []);

                // Clone the Decker
                    const deckerClone = useMemo(() => {
                        const clonedObject = decker.clone();
                        clonedObject.traverse((child) => {
                        if (child instanceof THREE.Mesh) {
                            switch (child.name) {
                            case "whitelight":
                                child.material = whitelight;
                                break;
                            case "glass":
                                child.material = glass;
                                break;
                            case "black":
                                child.material = black;
                                break;
                            case "orangelight":
                                child.material = orangelight;
                                break;
                            case "redlight":
                                child.material = redlight;
                                break;
                            case "chrome":
                                child.material = chrome;
                                break;
                            default:
                                break;
                            }
                        }
                        });
                        return clonedObject;
                    }, [decker]);
                    // Define adjustable parameters for the animation
                    const animationParams = {
                        initialPosition: { x: 2.5, y: 1.7, z: 27 },
                        finalPosition: { x: 2.3, y: 1.7, z: -13 },
                        rotationY: { start: 0.10, end: +2.90 },
                        duration: 3,
                    };
                    //console.log('deckerRef:', deckerRef.current);
                    // Animation logic
                    useEffect(() => {
                        //gsap.to(decker.rotation, {y:+1.80, duration:0})
                        gsap.to(deckerClone.position, {x:2.6 , z:24 , y:1.7, duration:0})
                        const tDecker = gsap.timeline({ repeat: -1 });
                    
                        // Animation sequence
                        tDecker.from(deckerClone.position, { ...animationParams.initialPosition, duration: animationParams.duration })
                        .to(deckerClone.rotation, { y: animationParams.rotationY.start, duration: 0.1 })
                        .to(deckerClone.position, { ...animationParams.finalPosition, duration: 12, ease: 'expo.inOut' })
                        .to(deckerClone.rotation, { y: animationParams.rotationY.end, duration: 0.1 })
                        .to(deckerClone.position, { ...animationParams.initialPosition, duration: 10, ease: 'expo.inOut' })
                        .to(deckerClone.rotation, { y: animationParams.rotationY.start, duration: 0.1 })
                        .to(deckerClone.position, { ...animationParams.finalPosition, duration: 10, ease: 'expo.inOut' })
                        // Add more animation steps as needed
                    
                    }, [deckerClone]);

                    return (
                          <>
                       <primitive object={decker} ref={deckerRef} scale={[0.004, 0.004, 0.004]} position={[-2.7, 2, 11]} rotation={[0, 0, 0]} castShadow />
                       <primitive object={deckerClone} scale={[0.004, 0.004, 0.004]} position={[2.5, 2.8, 11]} rotation={[0, 1.2, 0]} castShadow />
                          </>
                    );
                }

                export default Decker;