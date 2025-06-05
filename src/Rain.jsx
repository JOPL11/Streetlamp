import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { gsap } from 'gsap';
import circleTexture from '/rain1.png'; // Ensure this texture is correct

const Rain = () => {
  const [rainCount, setRainCount] = useState(1000);
  const rainRef = useRef();
  const gsapTimeline = useRef(); // Reference for GSAP timeline

  const centerX = 0;
  const centerY = 10;
  const centerZ = 0;
  const areaSize = 10;

  useEffect(() => {
    // Initialize GSAP timeline for rain animation
    gsapTimeline.current = gsap.timeline({ repeat: -1, yoyo: true });
    gsapTimeline.current
      .to({}, { duration: 2 }) // Initial delay
      .to({}, { duration: 5, onUpdate: () => setRainCount(1300) }) // Decrease to a drizzle
      .to({}, { duration: 5, onUpdate: () => setRainCount(4000) }) // Increase to a pour
      .to({}, { duration: 15, onUpdate: () => setRainCount(29000) }); // Increase to a storm

    // Cleanup GSAP timeline on unmount
    return () => {
      if (gsapTimeline.current) {
        gsapTimeline.current.kill(); // Kill the timeline
      }
    };
  }, []);

  const rainGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      positions[i * 3] = centerX + Math.random() * areaSize * 2 - areaSize;
      positions[i * 3 + 1] = centerY + Math.random() * areaSize * 2 - areaSize;
      positions[i * 3 + 2] = centerZ + Math.random() * areaSize * 2 - areaSize;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [rainCount, centerX, centerY, centerZ, areaSize]);

  const texture = useLoader(THREE.TextureLoader, circleTexture);

  const rainMaterial = new THREE.PointsMaterial({
    map: texture,
    color: 0xFFFFFF,
    size: 0.05,
    transparent: true,
    opacity: 0.4,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  useFrame(() => {
    const rainPositions = rainRef.current.geometry.attributes.position.array;
    for (let i = 0; i < rainPositions.length; i += 3) {
      rainPositions[i + 1] -= 0.2 + Math.random() * 0.1; // Adjust fall speed
      if (rainPositions[i + 1] < centerY - areaSize) {
        rainPositions[i + 1] = centerY + areaSize; // Reset to above the area
      }
    }
    rainRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Cleanup for geometry and material when component unmounts
  useEffect(() => {
    return () => {
      if (rainRef.current) {
        rainRef.current.geometry.dispose(); // Dispose geometry
        rainMaterial.dispose(); // Dispose material
      }
    };
  }, [rainMaterial]);

  return <points ref={rainRef} args={[rainGeo, rainMaterial]} />;
};

export default Rain;