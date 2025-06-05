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


// Main component for handling particle animation
const Particles = () => {
  const { scene } = useThree();
  const particles = useRef({});
  const redParticleSize = 5; // Set redParticleSize to the desired size of the red particle
  const particleIndex = 5; // Set particleIndex to the index of the red particle in your geometry

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
        
        // Simplex noise function
        vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
        vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

        float simplexNoise3d(vec3 v) {
                    
            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        
            // First corner
            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 =   v - i + dot(i, C.xxx) ;
        
            // Other corners
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );
        
            //  x0 = x0 - 0. + 0.0 * C 
            vec3 x1 = x0 - i1 + 1.0 * C.xxx;
            vec3 x2 = x0 - i2 + 2.0 * C.xxx;
            vec3 x3 = x0 - 1. + 3.0 * C.xxx;
        
            // Permutations
            i = mod(i, 289.0 ); 
            vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        
            // Gradients
            // ( N*N points uniformly over a square, mapped onto an octahedron.)
            float n_ = 1.0/7.0; // N=7
            vec3  ns = n_ * D.wyz - D.xzx;
        
            vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)
        
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
        
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
        
            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );
        
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
        
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        
            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);
        
            // Normalise gradients
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
        
            // Mix final noise value
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        
                }
        
        void main() {
            float progress = mix(0.0, 1.0, uProgress);
            
            // Color
            vColor = mix(uColorA, uColorB, progress);
            
            // Mixed position with simplex noise animation
            //vec3 newPosition = mix(position, aPositionTarget, progress);
            vec3 newPosition = mix(position, aPositionTarget, progress + simplexNoise3d(position) * 0.1); // Adjust the multiplier for the noise intensity
            float noise = simplexNoise3d(newPosition * 0.5); // Adjust the noise scale
            newPosition += normalize(newPosition) * noise * 0.1; // Adjust the noise magnitude
            
            // Applying sway effect
            float sway = sin(uTime + newPosition.x) * uSwayFactor; // Use uSwayFactor for sway
            newPosition.y += sway;
            
            // Calculate the particle size using simplex noise
            float particleSize = simplexNoise3d(newPosition) * 0.05; // Adjust the multiplier for the size variation

            vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
            gl_PointSize = aSize * (uSize + particleSize) * (uResolution.y / -mvPosition.z) * 0.5; // Adjusted point size with noise variation
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