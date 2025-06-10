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

  // Project information
  const sections = [
    {
      title: "Portfolio",
      content: "MotionReel Cinema4D / After Effects"
    },
    {
      title: "",
      content: ""
    },
    {
      title: "Projects",
      content: "SMMD - Airbus Berlin"
    },
    {
      title: "",
      content: "SMMD - Airbus München"
    },
    {
      title: "",
      content: "Siebert & Wolf - Mercedes Benz"
    },
    {
      title: "",
      content: "Siebert & Wolf - TÜV Süd"
    },
    {
      title: "",
      content: "Spiegel Geschichte TV - Website"
    },
    {
      title: "",
      content: "Spiegel Wissen - Website"
    },
    {
      title: "",
      content: "Union of Love - Festival Website"
    },
    {
      title: "Contact",
      content: "jan.peiro@protonmail.com"
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

  // Toggle expanded state with smooth animation
  const toggleOverlay = () => {
    setIsOpen(prev => !prev);
  };

  // Handle visibility changes
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    
    if (isVisible) {
      overlay.style.display = 'block';
      // Trigger reflow
      void overlay.offsetWidth;
      overlay.classList.add('visible');
    } else {
      overlay.classList.remove('visible', 'expanded');
      const onTransitionEnd = () => {
        if (!isVisible) {
          overlay.style.display = 'none';
        }
      };
      overlay.addEventListener('transitionend', onTransitionEnd, { once: true });
      return () => overlay.removeEventListener('transitionend', onTransitionEnd);
    }
  }, [isVisible]);

  return (
    <>
      <div 
        ref={overlayRef}
        className={`text-overlay ${isOpen ? 'expanded' : ''}`}
        style={{
          position: 'fixed',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          paddingLeft: '24px'
        }}
      >
        <button 
          className="toggle-button"
          onClick={toggleOverlay}
          aria-label={isOpen ? 'Close panel' : 'Open panel'}
        />
        
        <div className="content-container" ref={contentRef}>
          {sections.map((section, index) => (
            <div key={index} className="text-section">
              {section.title && <h3>{section.title}</h3>}
              {section.content && <p>{section.content}</p>}
            </div>
          ))}
        </div>
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
      />
    </>
  );
};

export default TextOverlay;