import React, { useState, useEffect, useRef  } from 'react';
import { Html } from '@react-three/drei';
import { gsap } from 'gsap';
import './TextOverlay.css'; // We'll create this next


const TextOverlay = ({ isVisible }) => {
    const [isOpen, setIsOpen] = useState(false);
    const overlayRef = useRef(null);
    const underlayRef = useRef(null);
    const contentRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

  // Sample text data - replace with your content
  const sections = [
    {
      title: "August 3, 2053",
      content: `In the rain-soaked, neon-drenched streets of a Los Angeles that reached for the sky but got lost in the clouds, he walks.`
    },
    {
      title: "",
      content: "Or maybe that’s just the script he follows, every click of his boots on the wet asphalt scripted in some cosmic code he hadn't yet cracked. "
    },
    {
      title: "",
      content: "See, he was a Blade-Runner, but sometimes he wondered if he was just another character in someone's digital fever dream."
    },
    {
        title: "",
        content: `Up above, the city's a circus of aircars —sleek, shining, and out of their damn minds.`
      },
      {
        title: "",
        content: `Ever since humanity cut the leash and took to the skies, sanity seemed to stay grounded.`
      },
      {
        title: "",
        content: `Now, every Joe and Jane with a set of wings thinks they're the next ace in the pocket, dodging, weaving, and careening through the concrete canyons like gravity’s just another bad joke they heard on the way up.`
      },
      {
        title: "",
        content: `Traffic’s a nightmare at five hundred feet, a ballet of chaos where the dancers are blind and the music’s too fast.`
      },
      {
        title: "",
        content: `Everyone’s in a rush to get nowhere, leaving reason in the rearview. And here he was, wondering if any of this is real, or just another loop in the endless simulation.`
      },
      {
        title: "",
        content: `Makes you think—if life’s a game, who’s playing whom?`
      },

  ];

  // Animation on visibility change
  useEffect(() => {
    if (isVisible) {
      gsap.to(overlayRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      });
    } else {
      gsap.to(overlayRef.current, {
        x: '-100%',
        opacity: 0,
        duration: 0.5,
        ease: "power3.in"
      });
    }
  }, [isVisible]);

  // Toggle expanded state
  const toggleOverlay = () => {
    setIsOpen(!isOpen);
    gsap.to(overlayRef.current, {
      width: isOpen ? '25vw' : '40vw',
      duration: 0.3,
      ease: "power2.inOut"
    });
  };

  useEffect(() => {
    gsap.to(overlayRef.current, {
      x: isVisible ? 0 : -300,
      opacity: isVisible ? 1 : 0,
      duration: 0.5
    });
  }, [isVisible]);

  return (
    <div 
      ref={overlayRef}
      className={`text-overlay ${isOpen ? 'expanded' : ''}`}
      style={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    >
      <button 
        className="toggle-button"
        style={{
            fontSize: '40px',
            color: 'white',
          }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '◄' : '►'}
      </button>
      
      <div className="content-container">
        {sections.map((section, index) => (
          <div key={index} className="text-section">
            <h3>{section.title}</h3>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
      <div 
      ref={underlayRef}
      className={`text-underlay ${isOpen ? 'expanded' : ''}`}
      style={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 99,
      }}
    >
    </div>
    </div>
  );
};

export default TextOverlay;