import React, { useRef, useState } from 'react';
import './TextOverlay.new.css';

const TextOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);

  // Project information
  const sections = [
    { title: "What", content: "React, Next.js, Cinema4d, After Effects" },
    { title: "", content: "" },
    { 
      title: "Cinema4D / After Effects", 
      content: "",
      videoId: "https://www.youtube.com/embed/WGGgQzQwH54?autoplay=1"  // Replace with your YouTube video ID
    },
    { title: "", content: "" },
    { title: "Next.js / Three.js / React", content: "" },
    { title: "", content: "SMMD - Airbus München" },
    { title: "", content: "Siebert & Wolf - Mercedes Benz" },
    { title: "", content: "Siebert & Wolf - TÜV Süd" },
    { title: "", content: "Spiegel Geschichte TV - Website" },
    { title: "", content: "Spiegel Wissen - Website" },
    { title: "", content: "ULF - Festival Website" },
    { title: "Contact", content: "jan.peiro@protonmail.com" },
  ];

  const togglePanel = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        ref={toggleRef}
        className="toggle-button"
        onClick={togglePanel}
        aria-label={isOpen ? 'Close panel' : 'Open panel'}
      >
        {isOpen ? '✕' : '☰'}
      </button>
      
      <div className={`content-container ${isOpen ? 'expanded' : ''}`}>
        <div className="content-wrapper">
          {sections.map((section, index) => (
            <div key={index} className="text-section">
              {section.title && <h3>{section.title}</h3>}
              {section.content && <p>{section.content}</p>}
              {section.videoId && (
                <div className="video-container">
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${section.videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="overlay-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default TextOverlay;