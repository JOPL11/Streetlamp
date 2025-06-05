import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useThree, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshReflectorMaterial, BakeShadows, Html} from '@react-three/drei';
import { DepthOfField, Bloom, Noise, ChromaticAberration, ToneMapping, Vignette, EffectComposer } from '@react-three/postprocessing';
import { OBJLoader } from 'three-stdlib';
import { MeshStandardMaterial } from 'three'; 
import * as THREE from 'three'; 
import gsap from '../public/resources/gsap/all.js'
import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader';
import { LensDistortionEffect } from 'postprocessing';



//  Traffic
const City = ( { dronePosition } ) => {
  // Models
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

  const metalblue = new THREE.MeshPhysicalMaterial({ 
    color: 0x8eb5e2,
    metalness: 0.7,         // Metalness factor (1 for metal)
    roughness: 0.3,         // Roughness factor (0 for perfectly smooth)
    reflectivity: 0.5,      // Reflectivity factor (1 for full reflectivity)
    clearcoat: 0.1,         // Clearcoat intensity (0 to 1)
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


  

  
 

    

  
      


  /*  */ const Ref = useLoader(OBJLoader, './city2.obj');
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
              mesh.material = orangelight; 
            }
            }
          }   
        });
        
        const cityRef = useRef(); 

        const car1 = useLoader(OBJLoader, './aircar_car.obj');
        car1.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Access the mesh
            const mesh = child;
            // Check if the mesh has geometry
            if (mesh.geometry) {
              // Assign custom materials based on mesh names
              if (mesh.name === "lightgrey") {
                mesh.material = lightgrey; 
              }
              if (mesh.name === "darkgrey") {
                mesh.material = darkgrey; 
              }
              if (mesh.name === "whitelight") {
                mesh.material = whitelight; 
              }
              if (mesh.name === "windowlight") {
                mesh.material = windowlight; 
              }
              }
            }   
          });
          
          const Car1Ref = useRef();

          const car2 = useLoader(OBJLoader, './aircar_car2.obj');
          car2.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              // Access the mesh
              const mesh = child;
              // Check if the mesh has geometry
              if (mesh.geometry) {
                // Assign custom materials based on mesh names
                if (mesh.name === "lightgrey") {
                  mesh.material = lightgrey; 
                }
                if (mesh.name === "darkgrey") {
                  mesh.material = darkgrey; 
                }
                if (mesh.name === "whitelight") {
                  mesh.material = whitelight; 
                }
                if (mesh.name === "windowlight") {
                  mesh.material = windowlight; 
                }
                }
              }   
            });
            
            const Car2Ref = useRef();


            
          const car3 = useLoader(OBJLoader, './aircar_cargo.obj');
          car3.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              // Access the mesh
              const mesh = child;
              // Check if the mesh has geometry
              if (mesh.geometry) {
                // Assign custom materials based on mesh names
                if (mesh.name === "lightgrey") {
                  mesh.material = lightgrey; 
                }
                if (mesh.name === "darkgrey") {
                  mesh.material = darkgrey; 
                }
                if (mesh.name === "whitelight") {
                  mesh.material = whitelight; 
                }
                if (mesh.name === "windowlight") {
                  mesh.material = windowlight; 
                }
                }
              }   
            });
            
            const Car3Ref = useRef();

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
                  if (mesh.name === "whiteNeon") {
                    mesh.material = orangelight; 
                  }
                  if (mesh.name === "greenNeon") {
                    mesh.material = greenlight; 
                  }
                  }
                }   
              });
              const Car4Ref = useRef();

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
                      mesh.material = whitelight; 
                    }
                    if (mesh.name === "darkgrey") {
                        mesh.material = darkgrey; 
                      }
                    }
                  }   
                });
                
                const convoyRef = useRef();

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
                        mesh.material = whitelight; 
                      }
                      if (mesh.name === "darkgrey") {
                          mesh.material = darkgrey; 
                        }
                      }
                    }   
                  });
                  
                  const convoyRef2 = useRef();

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
                          mesh.material = whitelight; 
                        }
                        if (mesh.name === "darkgrey") {
                            mesh.material = darkgrey; 
                          }
                        }
                      }   
                    });
                    
                    const convoyRef3 = useRef();

                    const screenImage = useLoader(THREE.TextureLoader, './coke.png');
                    screenImage.center.set(0.5, 0.5);
          



                    
                    const blimp = useLoader(OBJLoader, './aircar_blimp.obj');
                    blimp.traverse((child) => {
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
                            mesh.material = whitelight; 
                          }
                          if (mesh.name === "darkgrey") {
                            mesh.material = darkgrey; 
                          }
                          if (mesh.name === "grey") {
                            mesh.material = grey; 
                          }
                          if (mesh.name === "lightgrey") {
                            mesh.material = white; 
                          }
                          if (mesh.name === "redlight") {
                            mesh.material = redlight2; 
                          }
                          if (mesh.name === "glass") {
                            mesh.material = glass; 
                          }
                          if (mesh.name === "bluelight") {
                            mesh.material = bluelight2; 
                          }
                          if (mesh.name === "orangelight") {
                            mesh.material = orangelight; 
                          }
                          if (child.isMesh && child.name === 'lightImage') {
                            mesh.material = new THREE.MeshStandardMaterial({
                              map: screenImage,
                              transparent: true,
                              opacity: 1,
                              blending: THREE.AdditiveBlending,
                              depthWrite: false,
                              side: THREE.DoubleSide,
                              color: 0xffffff, 
                              emissive: 0xFFFFFF, 
                              emissiveIntensity: 2,                            
                              metalness: 0.5, 
                              roughness: 1, 
                              //alphaTest: 0.2
                            });
                          } //console.log(child.name)
                        }
                      }
                    });
                    
                    const BlimpRef = useRef();

                    
  

                    const delorean = useLoader(OBJLoader, './aircar_delorean.obj');
                    delorean.traverse((child) => {
                      if (child instanceof THREE.Mesh) {
                        // Access the mesh
                        const mesh = child;
                        // Check if the mesh has geometry
                        if (mesh.geometry) {
                          // Assign custom materials based on mesh names
                          if (mesh.name === "silver") {
                            mesh.material = chrome; 
                          }
                          if (mesh.name === "whitelight") {
                            mesh.material = whitelight; 
                          }
                          if (mesh.name === "redlight") {
                            mesh.material = redlight; 
                          }
                          if (mesh.name === "glass") {
                              mesh.material = glass; 
                            }
                            if (mesh.name === "black") {
                                mesh.material = darkgrey; 
                              }
                              if (mesh.name === "yellowlightsoft") {
                                mesh.material = orangelight; 
                              }
                          }
                        }   
                      });
                      const deloreanRef = useRef();

                      
                    const limo = useLoader(OBJLoader, './aircar_limo.obj');
                    limo.traverse((child) => {
                      if (child instanceof THREE.Mesh) {
                        const mesh = child;
                        if (mesh.geometry) {
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
                              if (mesh.name === "grey") {
                                mesh.material = black; 
                              }
                              if (mesh.name === "silver") {
                                mesh.material = green; 
                              }
                              if (mesh.name === "orangelight") {
                                mesh.material = orangelight; 
                              }                        
                          }
                        }   
                      });
                      const limoRef = useRef();
                      useEffect(() => {
                        function randomDuration() {
                            return Math.random() * (30 - 11) + 11; // Generate a random number between 7 and 20
                          }
                        const tCars2 = gsap.timeline({ repeat: -1 });
                        
                        tCars2.to(limoRef.current.rotation, { y: 3.1, duration: 0  } ) // reposition
                              .to(limoRef.current.position, { x: -1.7, y: 2, z: -11, duration: 23, ease: 'power4.in' } ) // First pass 
                              .to(limoRef.current.rotation, { y: 0.12, duration: 1.8  } ) // reposition  180
                             .to(limoRef.current.position, { x: -1.7, y: 1, z: 22, duration: 13, ease: 'power2.out' } ) // reposition at start
                             .to(limoRef.current.rotation, { y: 3.1, duration: 0.5  } ) // reposition 180
                             .to(limoRef.current.position, { x: 1.7, y: 2.8, z: -19, duration: 10, ease: 'power3.in'  } ) // reposition
                             .to(limoRef.current.rotation, { y: 0.12, duration: 0.5  } ) // reposition
                             .to(limoRef.current.position, { x: 1.7, y: 2.5, z: 22, duration: 8, ease: 'power3.out'  } ) // move to start
        
                             .to(limoRef.current.position, { x: 2.4, y: 1.9, z:-13,  duration: randomDuration(), ease: 'power1.in'  } ) // travel to end
                             .to(limoRef.current.rotation, { y: 3.1, duration: 1.5  } ) // reposition 180
                             .to(limoRef.current.position, { x: -2.4, y: 2.2, z:-13, duration: 1.5, ease: 'power1.out'  } ) // reposition 
                             .to(limoRef.current.rotation, { y: 0.12, duration: 1.8  } , "-=1" ) // reposition  180
                             .to(limoRef.current.position, { x: -0.9, y: 2.8, z:-0.3,  duration: randomDuration(), ease: 'power3.in'  } ) // 
        
                             .to(limoRef.current.position, { x: -0.9, y: 3.2, z: -0.3, duration: 3, ease: 'power3.out' } ) // First pass 
                             .to(limoRef.current.position, { x: -2.1, y: 2.2, z: 14.4,  duration: randomDuration(), ease: 'power2.in' } ) // reposition at start
                             .to(limoRef.current.rotation, { y: 1.8, duration: 2.2  } , "-=1" ) // reposition
                             .to(limoRef.current.position, { x: 2.7, y: 3.2, z: 14, duration: 5.5, ease: 'power3.out'  }  ) // reposition
                             .to(limoRef.current.rotation, { y: 3.1, duration: 2.2  } , "-=1" ) // reposition
                             .to(limoRef.current.position, { x: 2.8, y: 2, z: 14, duration: 1.5, ease: 'power3.in'  } ) // reposition
        
                             
                             .to(limoRef.current.position, { x: 2.4, y: 2.9, z:-16, duration: 8, ease: 'power1.out'  } ) // travel to end
                             .to(limoRef.current.rotation, { y: -1.8, duration: 3  } ) // reposition
                             .to(limoRef.current.position, { x: -2.4, y: 2.5, z:-16, duration: 3, ease: 'power1.in'  } ) // reposition
                             .to(limoRef.current.rotation, { y: 0.12, duration: 3  } ) // reposition
                             .to(limoRef.current.position, { x: -2.4, y: 2.5, z:10.7, duration: randomDuration(), ease: 'power1.out'  } ) // travel to start
        

                    .to(limoRef.current.rotation, { y: 1.8, duration: 2.5  } ) // reposition
                   .to(limoRef.current.position, { x: 22, y: 3, z: 10.7, duration: 15, ease: 'power4.InOut' } ) // First pass 
                   .to(limoRef.current.position, { x: 22, y: 3, z: 10.7, duration: 1, ease: 'power2.InOut' } ) // reposition at right end
                  .to(limoRef.current.rotation, { y: -2.4, duration: 0.5  } ) // turn around
                  .to(limoRef.current.position, { x: -22.0, y: 2, z: 10.5, duration: 5, ease: 'power2.InOut' } ) // reposition at left end
                  .to(limoRef.current.rotation, { y: 1.8, duration: 2.5  } ) // turn back around
                  .to(limoRef.current.position, { x: 22, y: 3, z: 10.5, duration: 15, ease: 'power4.InOut' } ) // pass back to right end 
                  .to(limoRef.current.rotation, { y: -2.4, duration: 0.5  } ) // turn around
                  .to(limoRef.current.position, { x: -2.1, y: 2, z: -11, duration: 5, ease: 'power2.InOut'  } ) // pass back to left end
                             
                             
                  ;
                },    
            []);


                 

              
        
 
            useEffect(() => {
                const tCars = gsap.timeline({ repeat: -1, yoyo:true });
                tCars.to(Car2Ref.current.position, { x: 55, y: 22, z: 9, duration: 40 } ,0 )
                    .to(Car2Ref.current.position, { x: -35, y: 22, z: 9, duration: 20 } ,20 );
                },    
              []);

             
             useEffect(() => {
                function randomDuration() {
                    return Math.random() * (40 - 20) + 7; // Generate a random number between 11 and 20
                  }
                const tCars = gsap.timeline({ repeat: -1, yoyo: true });
                tCars.to(Car4Ref.current.position, { x: -2.2, y: 3, z: 27, duration: 11, ease: 'power4.in' } ) // First pass
                     .to(Car4Ref.current.position, { x: -3.2, y: 3, z: 27, duration: 5, ease: 'power4.out' } ) // reposition at start
                     .to(Car4Ref.current.position, { x: 2.8, y: 3, z: 27, duration: 2, ease: 'power4.in'  } ) // reposition to right side
                     .to(Car4Ref.current.position, { x: 2.4, y: 3, z:-14, duration: randomDuration(), ease: 'power4.out'  } ) // travel to end
                     .to(Car4Ref.current.position, { x: 2.9, y: 3, z:-13, duration: 5, ease: 'power4.in'  } ) // reposition
                     .to(Car4Ref.current.position, { x: 2.8, y:3, z: 27, duration: randomDuration(), ease: 'power4.out'  } ) // second pass
                     .to(Car4Ref.current.position, { x: 2.7, y: 3, z: 27, duration: 2, ease: 'power4.in'  } ) //
                     
                     ;
                    },    
               []);

               
             useEffect(() => {
                function randomDuration() {
                    return Math.random() * (9 - 7) + 5; // Generate a random number between 11 and 20
                  }
                const tCars2 = gsap.timeline({ repeat: -1 });
                tCars2.to(deloreanRef.current.position, { x: -2.1, y: 2.5, z: -12, duration: 12, ease: 'power4.InOut' } ) // First pass 
                     .to(deloreanRef.current.position, { x: -2.1, y: 3.2, z: 17, duration: 4.9, ease: 'power2.InOut' } ) // reposition at start
                     .to(deloreanRef.current.rotation, { y: 1.8, duration: 0.2  } ) // reposition 90
                     .to(deloreanRef.current.position, { x: 2.7, y: 2.7, z: 17, duration: 0.5, ease: 'power3.InOut'  } ) // reposition
                     .to(deloreanRef.current.rotation, { y: 3.1, duration: 0.5  } ) // reposition
                     .to(deloreanRef.current.position, { x: 2.7, y: 2.7, z: 17, duration: 7, ease: 'power3.InOut'  } ) // reposition

                     .to(deloreanRef.current.position, { x: 2.2, y: 2.1, z:-11.2, duration: randomDuration(), ease: 'power1.in'  } ) // travel to end
                     .to(deloreanRef.current.rotation, { y: -1.8, duration: 1.5  } ) // reposition -90
                     .to(deloreanRef.current.position, { x: -2.1, y: 5.3, z:-11.2, duration: 1.5, ease: 'power1.out'  } ) // reposition
                     .to(deloreanRef.current.rotation, { y: 0.12, duration: 1.8  } ) // reposition 
                     .to(deloreanRef.current.position, { x: -0.9, y: 1.8, z:-11.3, duration: 3, ease: 'power3.InOut'  } ) // reposition

                     .to(deloreanRef.current.position, { x: -0.9, y: 2.2, z: -10.3, duration: 5, ease: 'power3.InOut' } ) // First pass 
                     .to(deloreanRef.current.position, { x: -2.1, y: 2.0, z: 18, duration: randomDuration(), ease: 'power2.InOut' } ) // reposition at start
                     .to(deloreanRef.current.rotation, { y: 1.8, duration: 1  } ) // reposition
                     .to(deloreanRef.current.position, { x: 2.2, y: 2.1, z: 18, duration: 5.5, ease: 'power3.InOut'  } ) // reposition
                     .to(deloreanRef.current.rotation, { y: 3.1, duration: 1  } ) // reposition
                     .to(deloreanRef.current.position, { x: 2.2, y: 5.2, z: 18, duration: 0.5, ease: 'power3.InOut'  } ) // reposition

                     .to(deloreanRef.current.position, { x: 2.2, y: 5.2, z:-13.1, duration: 6, ease: 'power1.in'  } ) // travel to end
                     .to(deloreanRef.current.rotation, { y: -1.8, duration: 4  } ) // reposition
                     .to(deloreanRef.current.position, { x: -2.2, y: 2.0, z:-13.1, duration: 5.5, ease: 'power1.out'  } ) // reposition
                     .to(deloreanRef.current.rotation, { y: 0.12, duration: 4  } ) // reposition
                     .to(deloreanRef.current.position, { x: -2.1, y: 2.5, z: -12, duration: 2, ease: 'power2.InOut'  } ) // second pass
                     
                     
                     ;
                    },    
               []);

               const diablo = useLoader(OBJLoader, './aircar_diablo.obj');
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
                         }
                         if (mesh.name === "silver") {
                           mesh.material = metalblue; 
                         }
                         if (mesh.name === "chrome") {
                           mesh.material = chrome; 
                         }
                         if (mesh.name === "orangelight") {
                          mesh.material = orangelight; 
                        }
                      
                     }
                   }   
                 });

                 const diabloRef = useRef();
           
               useEffect(() => {
                function randomDuration() {
                    return Math.random() * (9 - 7) + 5; // Generate a random number between 7 and 20
                  }
                const tCarsee = gsap.timeline({ repeat: -1 });
                tCarsee.to(diabloRef.current.position, { x: -0.9, y: 1.8, z: -0.3, duration: 9.2, ease: 'power3.InOut' } ) // First pass 
                .to(diabloRef.current.position, { x: -2.1, y: 3.5, z: 14, duration: 7.1, ease: 'Expo.InOut' } ) // till first turn
                .to(diabloRef.current.rotation, { y: 0.50, z:1.05, duration: 5, ease: 'Expo.InOut'  }, "-=4" ) // first turn THE ACCIDENT
                .to(diabloRef.current.position, { x: 2.0, y: 3.5, z: 13.7, duration: 5.5, ease: 'Expo.InOut'  } , "-=2" ) // reposition
                .to(diabloRef.current.rotation, { y: 3.1, z:0, duration: 5, ease: 'Expo.in'  }, "-=4.3" ) // collision avoidance THE ACCIDENT
                .to(diabloRef.current.position, { x: 1.2, y: 2.2, z: 12.65, duration: 4, ease: 'Expo.out'  }, "-=2.3" ) // reposition
                .to(diabloRef.current.position, { x: 1.2, y: 0.95, z: 12.3, duration: 7, ease: 'Expo.in'  }  ) // wait
              
                .to(diabloRef.current.position, { x: 1.2, y: 0.99, z: 13.5, duration: 11, ease: 'Expo.in'  }   ) // wait
                .to(diabloRef.current.position, { x: 1.2, y: 1.2, z: 13.3, duration: 3, ease: 'Expo.out'  }) // 
                

                .to(diabloRef.current.position, { x: -0.9, y: 2.8, z: -13.3, duration: 7, ease: 'Expo.In' } ) // resume course till end
                .to(diabloRef.current.rotation, { y: 1.8, duration: 4, ease: 'Expo.Out'  }, "-=2") // turn
                .to(diabloRef.current.position, { x: -2.1, y: 3.5, z: -13.5, duration: 2, ease: 'Expo.InOut' } ) // reposition at start
                .to(diabloRef.current.rotation, { y: 1.8, duration: 3, ease: 'Expo.InOut'  }, "-=4" ) //turn
                .to(diabloRef.current.position, { x: -2.4, y: 2.5, z: -13.9, duration: 6, ease: 'Expo.InOut'  } ) // reposition
                .to(diabloRef.current.rotation, { y: 0.12, duration: 3, ease: 'Expo.InOut'  }, "-=4" ) // reposition
                .to(diabloRef.current.position, { x: 2.6, y: 5, z: -13, duration: 8.5, ease: 'power3.InOut'  } ) // travel to end

              
                .to(diabloRef.current.rotation, { y: -1.8, duration: 3  } ) // reposition -90
                .to(diabloRef.current.position, { x: -2.1, y: 3.7, z:-13, duration: 1.5, ease: 'power1.out'  } ) // reposition
                .to(diabloRef.current.rotation, { y: 0.12, duration: 3  } ) // reposition 
                .to(diabloRef.current.position, { x: -2.1, y: 4.9, z:-13, duration: 4, ease: 'power3.InOut'  }, "-=3") // reposition

                .to(diabloRef.current.position, { x: 2.4, y: 2.2, z:22, duration: 6, ease: 'Expo.in'  } ) // travel to end
                .to(diabloRef.current.rotation, { y: -1.8, duration: 1.5  } ) // reposition
                .to(diabloRef.current.position, { x: -2.4, y: 4.8, z:-13, duration: 5.5, ease: 'Expo.out'  } ) // reposition
                .to(diabloRef.current.rotation, { y: 0.12, duration: 5.8  } ) // reposition
                .to(diabloRef.current.position, { x: -2.4, y: 4.6, z:16, duration: 5, ease: 'Expo.InOut'  } ) // reposition


                     .to(diabloRef.current.position, { x: -0.9, y: 1.8, z: -12.3, duration: 7, ease: 'power3.InOut' } ) // First pass 
                     .to(diabloRef.current.position, { x: -2.1, y: 5, z: 14, duration: 7, ease: 'Expo.InOut' } ) // reposition at start
                     .to(diabloRef.current.rotation, { y: 1.8, duration: 3, ease: 'Expo.InOut'  }, "-=2" ) // reposition
                     .to(diabloRef.current.position, { x: 2.4, y: 5.2, z: 14, duration: 5.5, ease: 'Expo.InOut'  } ) // reposition
                     .to(diabloRef.current.rotation, { y: 3.1, duration: 3, ease: 'Expo.InOut'  }, "-=4" ) // reposition
                     .to(diabloRef.current.position, { x: 2.6, y: 5, z: -11.5, duration: 6.5, ease: 'power3.InOut'  } ) // reposition

                     .to(diabloRef.current.position, { x: -2, y: 2, z: 0, duration: 22, ease: 'Expo.InOut'  } ) // second pass
                     
                     
                     ;
                    },    
               []);
          // Function to clone object
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
                                mesh.material = green; 
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
            initialPosition: { x: 2.9, y: 4.8, z: 21 },
            finalPosition: { x: 0.9, y: 3.1, z: -12 },
            rotationY: { start: +3.02, end: -0.20 },
            duration: 2.2,
        };
        
        // Animation logic
        useEffect(() => {
            gsap.to(diabloClone.rotation, {y:+3.05, duration:3})
            gsap.to(diabloClone.position, {x:-2.9 , z:21 , y:2, duration:5}, "-=2")
            const tdiablo = gsap.timeline({ repeat: -1 });
        
            // Animation sequence
            tdiablo.from(diabloClone.position, { ...diabloanimationParams.initialPosition, duration: diabloanimationParams.duration })
            .to(diabloClone.rotation, { y: diabloanimationParams.rotationY.start, duration: 2 })
            .to(diabloClone.position, { ...diabloanimationParams.finalPosition, duration: 12, ease: 'Expo.InOut' })
            .to(diabloClone.rotation, { y: diabloanimationParams.rotationY.end, duration: 2 })
            .to(diabloClone.position, { ...diabloanimationParams.initialPosition, duration: 10, ease: 'Expo.InOut' })

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
                            finalPosition: { x: 2.3, y: 1.5, z: -11 },
                            rotationY: { start: +3.02, end: -0.20 },
                            duration: 3.2,
                        };

                        // Animation logic
                        useEffect(() => {
                            gsap.to(diabloClone2.rotation, {y:+3.05, duration:2})
                            gsap.to(diabloClone2.position, {x:1.5 , z:21 , y:4, duration:7}, "-=2")
                            const tdiablo2 = gsap.timeline({ repeat: -1 });

                            // Animation sequence
                            tdiablo2.from(diabloClone2.position, { ...diabloanimationParams2.initialPosition, duration: diabloanimationParams2.duration })
                            .to(diabloClone2.rotation, { y: diabloanimationParams2.rotationY.start, duration: 2 })
                            .to(diabloClone2.position, { ...diabloanimationParams2.finalPosition, duration: 11, ease: 'Expo.InOut' })
                            .to(diabloClone2.rotation, { y: diabloanimationParams2.rotationY.end, duration: 2 })
                            .to(diabloClone2.position, { ...diabloanimationParams2.initialPosition, duration: 13, ease: 'Expo.InOut' })

                            // Add more animation steps as needed

                        }, [diabloClone2]);



                                                // Function to clone object
                                                const cloneObject5 = (diablo) => {
                                                    const clonedObject5 = diablo.clone();
                                                    clonedObject5.traverse((child) => {
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
                                                                        mesh.material = green; 
                                                                    }
                                                                    if (mesh.name === "chrome") {
                                                                        mesh.material = green; 
                                                                    }
                                                                
                                                                }
                                                            }   
                                                        });
                                                    return clonedObject5;
                                                };
                                                // Clone of the diablo object
                                                const diabloClone3 = useMemo(() => cloneObject5(diablo), [diablo]);
                                                    
                                                // Define adjustable parameters for the animation
                                                const diabloanimationParams3 = {
                                                    initialPosition: { x: -2, y: 3.2, z: 22 },
                                                    finalPosition: { x: -2.1, y: 1.0, z: -11 },
                                                    rotationY: { start: +2.90, end: -0.10 },
                                                    duration: 3.2,
                                                };
                        
                                                // Animation logic
                                                useEffect(() => {
                                                    gsap.to(diabloClone3.rotation, {y:+3.05, duration:2})
                                                   // gsap.to(diabloClone3.position, {x:-2.5 , y:4, z:11 , duration:7}, "-=2")
                                                    const tdiablo3 = gsap.timeline({ repeat: -1 });
                        
                                                    // Animation sequence
                                                    tdiablo3
                                                    .from(diabloClone3.position, { ...diabloanimationParams3.initialPosition, duration: diabloanimationParams3.duration })
                                                    .to(diabloClone3.rotation, { y: diabloanimationParams3.rotationY.start, duration: 2 })
                                                    .to(diabloClone3.position, { ...diabloanimationParams3.finalPosition, duration: 10.5, ease: 'Expo.InOut' })
                                                    .to(diabloClone3.rotation, { y: diabloanimationParams3.rotationY.end, duration: 2 })
                                                    .to(diabloClone3.position, { ...diabloanimationParams3.initialPosition, duration: 7, ease: 'Expo.InOut' })
                                                    .to(diabloClone3.rotation, { y: diabloanimationParams3.rotationY.start, duration: 2 })
                                                    .to(diabloClone3.position, { ...diabloanimationParams3.finalPosition, duration: 16.5, ease: 'Expo.InOut' })
                                                    .to(diabloClone3.rotation, { y: diabloanimationParams3.rotationY.end, duration: 2 })
                                                    .to(diabloClone3.position, { ...diabloanimationParams3.initialPosition, duration: 7, ease: 'Expo.InOut' })
                        
                                                    // Add more animation steps as needed
                        
                                                }, [diabloClone3]);











               const decker = useLoader(OBJLoader, './aircar_decker.obj');
               decker.traverse((child) => {
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
                         if (mesh.name === "orangelight") {
                           mesh.material = orangelight; 
                         }
                         if (mesh.name === "redlight") {
                           mesh.material = redlight; 
                         }

                         if (mesh.name === "chrome") {
                           mesh.material =  carRed; 
                         }
                      
                     }
                   }   
                 });
                 const deckerRef = useRef();
                 //gsap.to(decker.rotation, {y:1.95, duration:20, delay: 5});

                 useEffect(() => {
                    const tdecker = gsap.timeline( {repeat: -1} );
                    tdecker.from(decker.position, {y:11, x:-5.5, z:17.5, duration: 16, ease: 'Expo.In'}) 
                           .to(decker.rotation, {y:-1.50, z: 0.15, duration: 14, ease: 'Expo.Out' }, "-=14")  
                           .to(decker.position, {y:2, x:22, z:11, duration: 11, ease: 'Sine.In'})
                           .to(decker.rotation, {y:+1.75, z:0, duration: 0.5})
                           .to(decker.position, {y:2, x:-22, z:10.5, duration: 15, ease: 'Sine.In'})
                           .to(decker.rotation, {y:-1.85, duration:0.5})
                           .to(decker.position, {y:2, x:22, z:11, duration: 17, ease: 'Expo.In'})
                           .to(decker.rotation, {y:+1.75, duration:0.5})
                           .to(decker.position, {y:2, x:-22, z:10.5, duration: 12, ease: 'Expo.Out'})
                           .to(decker.rotation, {y:-1.85, duration:0.5})
                           .to(decker.position, {y:2, x:22, z:11, duration: 18, ease: 'Expo.In'})
                           .to(decker.rotation, {y:+1.75, duration:0.5})
                           .to(decker.position, {y:2, x:-22, z:10.5, duration: 22, ease: 'Sine.Out'})
                           .to(decker.rotation, {y:-1.85, duration:0.5})
                           .to(decker.position, {y:2, x:22, z:11, duration: 17, ease: 'Sine.In'})
                           .to(decker.rotation, {y:+1.75, duration:0.5})
                           .to(decker.position, {y:33, x:-5.5, z:11.5, duration: 10, ease: 'Sine.Out'})
                           .to(decker.rotation, {y:+1.85, duration:5}, -15 )
                           .to(decker.position, {y:22, x:-5.5, z:17.5, duration: 10, ease: 'Sine.Out'});               
                    },    
                    []);

                    // Function to clone object
                    const cloneObject = (decker) => {
                        const clonedObject = decker.clone();
                        clonedObject.traverse((child) => {
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
                                    if (mesh.name === "orangelight") {
                                        mesh.material = orangelight; 
                                    }
                                    if (mesh.name === "redlight") {
                                        mesh.material = redlight; 
                                    }
                                    if (mesh.name === "silver") {
                                        mesh.material = yellow; 
                                    }
                                    if (mesh.name === "chrome") {
                                        mesh.material = chrome; 
                                    }
                                }
                            }
                        });
                        return clonedObject;
                    };
                    // Clone of the decker object
                    const deckerClone = useMemo(() => cloneObject(decker), [decker]);
                    // Define adjustable parameters for the animation
                    const animationParams = {
                        initialPosition: { x: 2.5, y: 1.7, z: 27 },
                        finalPosition: { x: 2.3, y: 1.7, z: -13 },
                        rotationY: { start: 0.10, end: +2.90 },
                        duration: 3,
                    };
                    
                    // Animation logic
                    useEffect(() => {
                        //gsap.to(decker.rotation, {y:+1.80, duration:0})
                        gsap.to(deckerClone.position, {x:2.6 , z:24 , y:1.7, duration:0})
                        const tDecker = gsap.timeline({ repeat: -1 });
                    
                        // Animation sequence
                        tDecker.from(deckerClone.position, { ...animationParams.initialPosition, duration: animationParams.duration })
                        .to(deckerClone.rotation, { y: animationParams.rotationY.start, duration: 0.1 })
                        .to(deckerClone.position, { ...animationParams.finalPosition, duration: 12, ease: 'Expo.InOut' })
                        .to(deckerClone.rotation, { y: animationParams.rotationY.end, duration: 0.1 })
                        .to(deckerClone.position, { ...animationParams.initialPosition, duration: 10, ease: 'Expo.InOut' })
                        .to(deckerClone.rotation, { y: animationParams.rotationY.start, duration: 0.1 })
                        .to(deckerClone.position, { ...animationParams.finalPosition, duration: 10, ease: 'Expo.InOut' })
                        // Add more animation steps as needed
                    
                    }, [deckerClone]);

               useEffect(() => {
                const tCarsFF = gsap.timeline({ repeat: -1 });
                tCarsFF.to(Car3Ref.current.position, { x: -11, y: 8, z: 3.9, duration: 10 })
                       .to(Car3Ref.current.position, { x: 15, y: 6, z: 3.9, duration: 10 });
                },    
                []);
                useEffect(() => {
                    const tCarsDD = gsap.timeline({ repeat: -1 });
                    tCarsDD.to(Car1Ref.current.position, { x: 15, y: 9, z: -0.5, duration: 20 }  )
                           .to(Car1Ref.current.position, { x: -15, y: 9, z: -0.5, duration: 20 }  );
                    },    
                  []);
                  useEffect(() => {
                    const convoy = gsap.timeline({ repeat: -1 });
                    convoy.to(convoyRef.current.position, {  y: 11, z: 30.5, duration: 33 }  )
                           .to(convoyRef.current.position, {  y: 11, z: -30.5, duration: 33 }  );
                    },    
                  []);
                  useEffect(() => {
                    const convoy2 = gsap.timeline({ repeat: -1, delay: 5 });
                    convoy2.to(convoyRef2.current.position, {  y: 11.2, z: 30.5, duration: 32 }  )
                           .to(convoyRef2.current.position, {  y: 11.2, z: -30, duration: 32 }  );
                    },    
                  []);
                  useEffect(() => {
                    const convoy3 = gsap.timeline({ repeat: -1 });
                    convoy3.to(convoyRef3.current.position, {  y: 11.5, x: 35.5, z:14 , duration: 32, delay:5 }  )
                           .to(convoyRef3.current.position, {  y: 11.5, x: -15.5, z: 14, duration: 32 }  );
                    },    
                  []);

                
                   
                    

                  useEffect(() => {
                    gsap.to(BlimpRef.current.position, { x: -2.8, y: 5.9, z: 12, duration: 0 })
                    const blimper = gsap.timeline({ repeat: -1, yoyo:false});
                    blimper.to(BlimpRef.current.rotation, { y: 1.10,  duration: 50, ease: 'Expo.Out', onComplete: () =>  console.log('blimp rotation one complete')}) // console.log('blimp pre rotation');
                           .to(BlimpRef.current.position, { x: -2.8, y: 5.5, z: 12, duration: 80, ease: 'Expo.In', onComplete: () => console.log('blimp rotation one commmencing') }, "-=40" )
                           .to(BlimpRef.current.position, { x: 2.8, y: 5.9, z: 12, duration: 40, ease: 'Expo.Out', onComplete: () => console.log('blimp moving to lesser x') } , "-=20")
                           .to(BlimpRef.current.rotation, { y: +2.50,  duration: 80, ease: 'Expo.In', onComplete: () =>  console.log('blimp rotation one complete')}, "-=40") // console.log('blimp pre rotation');
                           .to(BlimpRef.current.position, { x: 2.8, y: 5.5, z: 12, duration: 60, ease: 'Expo.Out', onComplete: () => console.log('blimp moving to lesser x') } , "-=20")
                           .to(BlimpRef.current.position, { x: -2.8, y: 5.9, z: 12, duration: 40, ease: 'Expo.In' } , "-=20")
                           ;
                    },    
                    []);
          



  const group2Ref = useRef();
  return (
    <group ref={group2Ref}>
        {/* Fog  <scene fog={new THREE.Fog('#1b3d69', 1, 0)}></scene>  <color args={ [ '#ffffff' ] } attach="background" /> */}

        <BakeShadows />    
        <primitive 
        object={Ref} 
        ref={cityRef}
        scale={[0.0070, 0.0070, 0.0070]} 
        position={[-3, 0, 14.6]} 
        rotation={[0, 0.05, 0]} 
        castShadow 
      />
        <primitive 
        object={car1} 
        ref={Car1Ref}
        scale={[0.0010, 0.0010, 0.0010]} 
        position={[15, 9, 8]} 
        rotation={[0, 0.05, 0]} 
        castShadow 
      />
       <primitive 
        object={car2} 
        ref={Car2Ref}
        scale={[0.0010, 0.0010, 0.0010]} 
        position={[-15, 6, 5.3]} 
        rotation={[0, 0.05, 0]} 
        castShadow 
      />
        <primitive 
        object={car3} 
        ref={Car3Ref}
        scale={[0.0005, 0.0005, 0.0005]} 
        position={[-25.5, 7, 4]} 
        rotation={[0, 0.05, 0]} 
        castShadow 
      /> 
        <primitive 
        object={car4} 
        ref={Car4Ref}
        scale={[0.0045, 0.0045, 0.0045]} 
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
      <primitive 
        object={blimp} 
        ref={BlimpRef}
        scale={[0.0010, 0.0010, 0.0010]} 
        position={[2, 4, 2]} 
        rotation={[0, 0, 0]} 
        castShadow 
      />
            <primitive 
        object={delorean} 
        ref={deloreanRef}
        scale={[0.0040, 0.0040, 0.0040]} 
        position={[-4, 2, -2]} 
        rotation={[0, 6.35, 0]} 
        castShadow 
      />     
      <primitive 
        object={limo} 
        ref={limoRef}
        scale={[0.0040, 0.0040, 0.0040]} 
        position={[-1, 0.85, 14]} 
        rotation={[0, 6.35, 0]} 
        castShadow 
      />       

       <primitive 
        object={diablo} 
        ref={diabloRef}
        scale={[0.0040, 0.0040, 0.0040]} 
        position={[-2, 2.30,-17]} 
        rotation={[0, 6.35, 0]} 
        castShadow 
      />    
       <primitive 
        object={decker} 
        ref={deckerRef}
        scale={[0.0040, 0.0040, 0.0040]} 
        position={[ -2.7, 2,  11]}
        rotation={[0, 0, 0]} 
        castShadow 
      />    
       <primitive 
        object={deckerClone}      
        scale={[0.0040, 0.0040, 0.0040]} 
        position={[ 2.5, 2.8,  11]}
        rotation={[0, +1.20, 0]} 
        castShadow 
      />   
      <primitive 
        object={diabloClone}     
        scale={[0.0040, 0.0040, 0.0040]} 
        position={[ 2.6, 2.2,  16]}
        rotation={[0, +1.20, 0]} 
        castShadow 
      />   

        <primitive 
        object={diabloClone2}     
        scale={[0.0040, 0.0040, 0.0040]} 
        position={[ 2.6, 3.2,  16]}
        rotation={[0, +1.20, 0]} 
        castShadow 
      />  

<primitive 
        object={diabloClone3}     
        scale={[0.0040, 0.0040, 0.0040]} 
        position={[ 2, 2.2,  -5]}
        rotation={[0, +1.20, 0]} 
        castShadow 
      />  



        

    </group>
  );
}
export default City;