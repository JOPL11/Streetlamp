import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import * as dat from 'dat.gui';
import { useEffect, useCallback, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import gsap from '../public/resources/gsap/gsap-core.js';

// Initialize GUI
const debugObject = {
  colorA: '#67635f',
  colorB: '#dad7d3'
};

const gui = new dat.GUI({ width: 340 });

// Custom hook for resizing the canvas
const Resize = ({ particles }) => {
  const { camera, gl } = useThree();

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update camera aspect ratio
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Update renderer size
    gl.setSize(width, height);

    // Update particles uniform
    if (particles.current && particles.current.material && particles.current.material.uniforms.uResolution) {
      particles.current.material.uniforms.uResolution.value.set(width * window.devicePixelRatio, height * window.devicePixelRatio);
    }
  }, [camera, gl, particles]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial resize
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return null;
};

// Main component for handling particle animation
const Particles = () => {
  const { scene } = useThree();
  const particles = useRef({});

  useEffect(() => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load('./models2.glb', (gltf) => {
      particles.current = {};
      particles.current.index = 0;

      const positions = gltf.scene.children.map(child => child.geometry.attributes.position);
      particles.current.maxCount = Math.max(...positions.map(pos => pos.count));
      
      particles.current.positions = positions.map(pos => {
        const array = new Float32Array(particles.current.maxCount * 3);
        array.set(pos.array);
        for (let i = pos.array.length; i < array.length; i += 3) {
          const randomIndex = Math.floor(pos.count * Math.random()) * 3;
          array[i] = pos.array[randomIndex];
          array[i + 1] = pos.array[randomIndex + 1];
          array[i + 2] = pos.array[randomIndex + 2];
        }
        return new THREE.Float32BufferAttribute(array, 3);
      });

      const sizesArray = new Float32Array(particles.current.maxCount).fill(1);
      
      particles.current.geometry = new THREE.BufferGeometry();
      particles.current.geometry.setAttribute('position', particles.current.positions[0]);
      particles.current.geometry.setAttribute('aPositionTarget', particles.current.positions[1]);
      particles.current.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1));

      particles.current.material = new THREE.ShaderMaterial({
        vertexShader: `
        uniform vec2 uResolution;
        uniform float uSize;
        uniform float uProgress;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uTime;
        uniform float uSwayFactor; // Control the degree of sway
        
        attribute vec3 aPositionTarget;
        attribute float aSize;
        
        varying vec3 vColor;
        
        void main() {
            float progress = mix(0.0, 1.0, uProgress);
            
            // Color
            vColor = mix(uColorA, uColorB, progress);
            
            // Mixed position
            vec3 newPosition = mix(position, aPositionTarget, progress);
            
            // Applying sway effect
            float sway = sin(uTime + newPosition.x) * uSwayFactor; // Use uSwayFactor for sway
            newPosition.y += sway;
            
            vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
            gl_PointSize = aSize * uSize * (uResolution.y / -mvPosition.z) * 0.5; // Adjusted point size
            gl_Position = projectionMatrix * mvPosition;
        }
        `,
        fragmentShader: `
          varying vec3 vColor;

          void main()
          {
              vec2 coord = gl_PointCoord - vec2(0.5);
              float distance = length(coord);

              // Add a condition to discard fragments that are too far from the center
              if (distance > 0.5) {
                  discard;
              }

              float strength = 0.5 / distance;
              vec3 color = vColor * strength;
              gl_FragColor = vec4(color, 1.0);
          }
        `,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uResolution: { value: new THREE.Vector2(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio) },
          uSize: { value: 0.02 }, // Reduce initial size
          uProgress: { value: 0.0 },
          uColorA: { value: new THREE.Color(debugObject.colorA) },
          uColorB: { value: new THREE.Color(debugObject.colorB) },
          uTime: { value: 0.0 },
          uSway: { value: 0.1 }, // Further reduce sway effect
          uSwayFactor: { value: 0.1 } // Add sway factor
        }
      });

      particles.current.points = new THREE.Points(particles.current.geometry, particles.current.material);
      // Adjust sway factor
      particles.current.material.uniforms.uSwayFactor.value = 0.08; // Example value, adjust as needed
      particles.current.points.frustumCulled = false;
      scene.add(particles.current.points);

      particles.current.morph = (index) => {
        particles.current.geometry.setAttribute('position', particles.current.positions[particles.current.index]);
        particles.current.geometry.setAttribute('aPositionTarget', particles.current.positions[index]);

        gsap.fromTo(
          particles.current.material.uniforms.uProgress,
          { value: 0 },
          { value: 1, duration: 6, ease: 'sine' }
        );

        particles.current.index = index;
      };

      gui.addColor(debugObject, 'colorA').onChange(() => { particles.current.material.uniforms.uColorA.value.set(debugObject.colorA); });
      gui.addColor(debugObject, 'colorB').onChange(() => { particles.current.material.uniforms.uColorB.value.set(debugObject.colorB); });
      gui.add(particles.current.material.uniforms.uSize, 'value').min(0).max(5).step(0.1).name('uSize');
      gui.add(particles.current.material.uniforms.uProgress, 'value').min(0).max(1).step(0.001).name('uProgress');

      particles.current.morph0 = () => { particles.current.morph(0); };
      particles.current.morph1 = () => { particles.current.morph(1); };
      particles.current.morph2 = () => { particles.current.morph(2); };
      particles.current.morph3 = () => { particles.current.morph(3); };

      gui.add(particles.current, 'morph0').name('Model 0');
      gui.add(particles.current, 'morph1').name('Model 1');
      gui.add(particles.current, 'morph2').name('Model 2');
      gui.add(particles.current, 'morph3').name('Model 3');
    });

    return () => {
      if (particles.current) {
        scene.remove(particles.current.points);
      }
    };
  }, [scene]);

  // Update the time uniform in each frame
  useFrame((state, delta) => {
    if (particles.current.material && particles.current.material.uniforms.uTime) {
      particles.current.material.uniforms.uTime.value += delta;
    }
  });

  return <Resize particles={particles} />;
};

export default Particles;
