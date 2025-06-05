import React, { useEffect, useRef } from 'react';
import gsap from '../public/resources/gsap/gsap-core.js';
import { Timeline, Tween } from '../public/resources/gsap/gsap-core.js';
import { Html } from '@react-three/drei';
import { CSSPlugin } from '../public/resources/gsap/all';
gsap.registerPlugin(CSSPlugin);

const TextReveal = () => {
    const containerRef = useRef(null);
  
    useEffect(() => {
      const sentences = Array.from(containerRef.current.children);
      gsap.set(sentences, { autoAlpha: 0 });
  
      const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power1.out' } });
  
      sentences.forEach((sentence, index) => {
        tl.to(sentence, { autoAlpha: 1, duration: 0.5, delay: index === 0 ? 0 : 0.5 });
        tl.to(sentence, { autoAlpha: 0, duration: 0.5, delay: 1 });
      });
  
      tl.to(containerRef.current, { autoAlpha: 0, duration: 0.5, delay: 0.5 });
  
      return () => tl.kill(); // Cleanup GSAP timeline on component unmount
    }, []);
  
    return (
        <Html>
      <div
        ref={containerRef}
        style={{
          textAlign: 'center',
          overflowY: 'auto', // Enable vertical scrolling
          maxHeight: '200px', // Set maximum height for scrollable area
          border: '1px solid #ccc', // Optional: add border for visual clarity
          padding: '10px', // Optional: add padding for spacing
        }}
      >
        <p>Sentence 1</p>
        <p>Sentence 2</p>
        <p>Sentence 3</p>
        {/* Add more sentences as needed */}
      </div>
      </ Html>
    );
  };
  
  export default TextReveal;