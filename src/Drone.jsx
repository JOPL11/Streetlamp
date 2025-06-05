                import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
                import { useThree, useLoader, useFrame } from '@react-three/fiber';
                import {  MeshReflectorMaterial, BakeShadows, useHelper, Html } from '@react-three/drei';
                import { OBJLoader } from 'three-stdlib';
                import { MeshStandardMaterial, MeshPhysicalMaterial, MeshBasicMaterial, PlaneGeometry, Mesh } from 'three'; 
                import * as THREE from 'three';
                import { CubeTextureLoader } from 'three';
                import { DepthOfField, Bloom, Noise, ChromaticAberration, ToneMapping, Vignette, EffectComposer } from '@react-three/postprocessing';
                import { BlendFunction } from 'postprocessing';
                import { LensDistortionEffect } from 'postprocessing';
              
               


                import gsap from '../public/resources/gsap/all.js'

                //console.log("button4B: ", Button4B);
              
              


            function Drone({ position }) {
                        const droneRef = useRef();
                        const [dronePosition, setDronePosition] = useState(position);
                        const [isVisible, setIsVisible] = useState(true); // Assuming you want to track visibility

                        // Rest of your code...
                        useEffect(() => {
                            console.log("Drone scale:", droneRef.current.scale);
                            console.log("Drone visibility:", isVisible);
                        }, [isVisible]); // Add other dependencies if needed
       
             
                        // Define the materials  f4b453
                        const grey = new THREE.MeshPhysicalMaterial({     
                        color: 0xACACAC,      // Metal color
                        metalness: 0.5,       // Metalness factor (1 for metal)
                        roughness: 0.9,       // Roughness factor (0 for perfectly smooth)
                        reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
                        clearcoat: 0.1,       // Clearcoat intensity (0 to 1)
                        clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
                    }); 

                    const yellow = new THREE.MeshPhysicalMaterial({     
                        color: 0xf4b453,      // Metal color
                        metalness: 0.5,       // Metalness factor (1 for metal)
                        roughness: 0.1,       // Roughness factor (0 for perfectly smooth)
                        reflectivity: 0.5,    // Reflectivity factor (1 for full reflectivity)
                        clearcoat: 0.1,       // Clearcoat intensity (0 to 1)
                        clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
                    }); 

                    const carRed = new THREE.MeshPhysicalMaterial({     
                      color: 0xe71212,      // Metal color
                      metalness: 0.5,       // Metalness factor (1 for metal)
                      roughness: 0.1,       // Roughness factor (0 for perfectly smooth)
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
                      color: 0xECECEC,
                      metalness: 0.5,         // Metalness factor (1 for metal)
                      roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
                      reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
                      clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
                      clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
                    }); 

                    const blue = new THREE.MeshPhysicalMaterial({ 
                      color: 0x8eb5e2,
                      metalness: 0.5,         // Metalness factor (1 for metal)
                      roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
                      reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
                      clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
                      clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
                    }); 

                    const glass = new THREE.MeshPhysicalMaterial({     
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
                      color: 0xECECEC,
                      metalness: 0.8,         // Metalness factor (1 for metal)
                      roughness: 0,         // Roughness factor (0 for perfectly smooth)
                      reflectivity: 1,      // Reflectivity factor (1 for full reflectivity)
                      clearcoat: 1,         // Clearcoat intensity (0 to 1)
                      clearcoatRoughness: 0.3 // Roughness of the clearcoat layer
                    }); 

                    const matteblack = new THREE.MeshPhysicalMaterial({ 
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
                      color: 0xe71212, 
                      emissive: 0xe71212, 
                      emissiveIntensity: 3, 
                      metalness: 0, 
                      roughness: 1, 
                    });

                    const yellowlight = new MeshStandardMaterial({ 
                      color: 0xffff00, 
                      emissive: 0xFFC000, 
                      emissiveIntensity: 44, 
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


                    const bluelight = new MeshStandardMaterial({ 
                      color: 0xe1351e9, 
                      emissive: 0xe1351e9, 
                      emissiveIntensity: 1, 
                      metalness: 0, 
                      roughness: 1, 
                    });

                    const redlight2 = new MeshStandardMaterial({ 
                      color: 0xe71212, 
                      emissive: 0xe71212, 
                      emissiveIntensity: 2, 
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

                    const whitelight= new MeshStandardMaterial({ 
                      color: 0xffffff, 
                      emissive: 0xe6662e9, 
                      emissiveIntensity: 2.5, 
                      metalness: 0, 
                      roughness: 1, 
                    });

                    const windowlight = new MeshStandardMaterial({ 
                      color: 0xffff00, 
                      emissive: 0xFFC000, 
                      emissiveIntensity: 0.25, 
                      metalness: 0, 
                      roughness: 1, 
                    });

                    const darkgrey = new THREE.MeshPhysicalMaterial({ 
                      color: 0xd1d1d1 , 
                      metalness: 0.5,         // Metalness factor (1 for metal)
                      roughness: 0.9,         // Roughness factor (0 for perfectly smooth)
                      reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
                      clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
                      clearcoatRoughness: 0.2 // Roughness of the clearcoat layer
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

                    const greenlight= new MeshStandardMaterial({ 
                      color: 0x46bd58,
                      emissive: 0xa5ce6c, 
                      emissiveIntensity: 2.5, 
                      metalness: 0, 
                      roughness: 1, 
                    });

       
                  const drone = useLoader(OBJLoader, './drone.obj');
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
                              mesh.material = yellowlightsoft; 
                            }

                            if (mesh.name === "blue") {
                              mesh.material = blue; 
                            }
                            if (mesh.name === "chrome") {
                              mesh.material = chrome; 
                            }
                        
                        }
                      }   
                    });
                    
                   
                    useEffect(() => {
                      // Floating animation logic
                      const randomX = random(0.1, 0.2);
                      const randomY = random(0.2, 0.3);
                      const randomTime = random(3, 5);
                  
                      moveX(droneRef.current.position, 0.65);
                      moveY(droneRef.current.position, -0.65);
                      moveZ(droneRef.current.position, -0.65);
                    //  console.log(drone.position)
                  
                      function moveX(target, direction) {
                        gsap.to(target, randomTime(), {
                          x: randomX(direction),
                          ease: "Sine.easeInOut",
                          onComplete: () => moveX(target, direction * -1),
                        });
                      }
                  
                      function moveY(target, direction) {
                        gsap.to(target, randomTime(), {
                          y: randomY(direction),
                          ease: "Sine.easeInOut",
                          onComplete: () => moveY(target, direction * -1),
                        });
                      }
                  
                      function moveZ(target, direction) {
                        gsap.to(target, randomTime(), {
                          z: randomY(direction),
                          ease: "Sine.easeInOut",
                          onComplete: () => moveZ(target, direction * -1), 
                        });
                      }
                  
                      function random(min, max) {
                        const delta = max - min;
                        return (direction = 1) => (min + delta * Math.random()) * direction;
                      }
                  
                    }, []);


       
       return(
       
       
       <primitive 
        object={drone} 
        ref={droneRef}
        scale={[0.0095, 0.0095, 0.0095]} 
        position={dronePosition}
        rotation={[0, -1.01, 0]} 
        
      />     
    ) };

    export default Drone;