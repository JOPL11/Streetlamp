import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import * as dat from 'dat.gui';
import { useEffect, useCallback, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

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
      const positions = gltf.scene.children.map(child => child.geometry.attributes.position);
      const maxCount = positions.reduce((max, pos) => Math.max(max, pos.count), 0);
      const totalCount = positions.reduce((sum, pos) => sum + pos.count, 0);

      const positionsArray = new Float32Array(totalCount * 3);
      const positionsTargetArray = new Float32Array(totalCount * 3);
      const sizesArray = new Float32Array(totalCount);

      let offset = 0;
      positions.forEach(pos => {
        const count = pos.count;
        positionsArray.set(pos.array, offset);
        positionsTargetArray.set(pos.array, offset);
        sizesArray.set(new Float32Array(count).fill(1), offset / 3);
        offset += count * 3;
      });

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));
      geometry.setAttribute('aPositionTarget', new THREE.BufferAttribute(positionsTargetArray, 3));
      geometry.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1));

      const material = new THREE.ShaderMaterial({
        vertexShader: `
          uniform vec2 uResolution;
          uniform float uSize;
          uniform float uProgress;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform float uTime;
          uniform float uSway;

          attribute vec3 aPositionTarget;
          attribute float aSize;

          varying vec3 vColor;

          void main()
          {
              float progress = mix(0.0, 1.0, uProgress);
              
              // Color
              vColor = mix(uColorA, uColorB, progress);
              
              // Mixed position
              vec3 newPosition = mix(position, aPositionTarget, progress);
              
              // Applying sway effect
              newPosition.y += sin(uTime + newPosition.x * uSway) * 0.1; // Adjust the sway as needed

              vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
              gl_PointSize = aSize * uSize * (uResolution.y / -mvPosition.z);
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
        blending: THREE.AdditiveBlending,
        uniforms: {
          uResolution: { value: new THREE.Vector2(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio) },
          uSize: { value: 1.0 }, // Reduce initial size to 1.0
          uProgress: { value: 0.0 },
          uColorA: { value: new THREE.Color(debugObject.colorA) },
          uColorB: { value: new THREE.Color(debugObject.colorB) },
          uTime: { value: 0.0 },
          uSway: { value: 0.1 } // Reduce sway effect
        }
      });

      const mesh = new THREE.Points(geometry, material);
      scene.add(mesh);

      particles.current = { geometry, material, mesh };

      gui.add(material.uniforms.uSize, 'value').min(0).max(5).step(0.1).name('particlesSize'); // Adjust max size to 5
      gui.add(material.uniforms.uProgress, 'value').min(0).max(1).step(0.001).name('particlesProgress');
      gui.addColor(debugObject, 'colorA').onChange(() => {
        material.uniforms.uColorA.value.set(debugObject.colorA);
      });
      gui.addColor(debugObject, 'colorB').onChange(() => {
        material.uniforms.uColorB.value.set(debugObject.colorB);
      });
    });
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
