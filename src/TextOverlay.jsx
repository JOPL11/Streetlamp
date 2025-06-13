import React, { useRef, useState } from 'react';
import './TextOverlay.new.css';

const TextOverlay = ({ visible = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);

  // Project information
  const sections = [
    { 
      title: "What", 
      content: "React, Next.js, Cinema4d, After Effects ",
      image: "",
      link: ""
    },
    { 
      title: "", 
      content: `I create and implement visual concepts, from original designs to refining existing CI/CD systems, with expertise in animation and interactive development. 3+ years management experience. 15+ years collaborating with agencies, in-house teams, and startups - balancing innovation with brand 
  compliance, ensuring visual consistency across all deliverables.`,
      image: "",
      link: ""
    },
    { 
      title: "Cinema4D / After Effects", 
      content: "Audi, Mercedes, Airbus Group, MTU Aero Engines, OConnor Engineering, TÜV Süd, ",
      image: "/images/JPL3Poster.jpg",
      link: "https://www.youtube.com/embed/WGGgQzQwH54?autoplay=1"
    },
    { 
      title: "", 
      content: "",
      image: "",
      link: ""
    },
    { 
      title: "Next.js / Three.js / React", 
      content: "",
      image: "",
      link: ""
    },
    { 
      title: "", 
      content: "SMMD - Airbus München",
      image: "",
      link: ""
    },
    { 
      title: "", 
      content: "Siebert & Wolf - Mercedes Benz",
      image: "",
      link: ""
    },
    { 
      title: "", 
      content: "Siebert & Wolf - TÜV Süd",
      image: "",
      link: ""
    },
    { 
      title: "", 
      content: "Spiegel Geschichte TV - Website",
      image: "",
      link: ""
    },
    { 
      title: "", 
      content: "Spiegel Wissen - Website",
      image: "",
      link: ""
    },
    { 
      title: "", 
      content: "ULF - Festival Website",
      image: "",
      link: ""
    },
    { 
      title: "", 
      content: "Civic App",
      image: "",
      link: ""
    },
    { 
      title: "", 
      content: "Calendar App",
      image: "/images/JPL3Poster.jpg",
      link: ""
    },
    { 
      title: "Contact", 
      content: "jan.peiro@protonmail.com",
      image: "",
      link: ""
    },
  ];

  const togglePanel = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {visible && (
        <button
          ref={toggleRef}
          className="toggle-button"
          onClick={togglePanel}
          aria-label={isOpen ? 'Close panel' : 'Open panel'}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      )}
      
      <div className={`content-container ${isOpen ? 'expanded' : ''}`}>
        <div className="content-wrapper">
          {sections.map((section, index) => (
            <div key={index} className="text-section">
              {section.title && <h3>{section.title}</h3>}
              {section.content && <p>{section.content}</p>}
              {section.image && (
                <div className="image-container">
                  {section.link ? (
                    <a href={section.link} target="_blank" rel="noopener noreferrer">
                      <img 
                        src={section.image} 
                        alt={section.content || section.title} 
                        style={{ 
                          width: 'auto', 
                          height: 'auto', 
                          maxHeight: '200px', 
                          objectFit: 'cover', 
                          borderRadius: '20px', 
                          marginTop: '10px' 
                        }}
                      />
                    </a>
                  ) : (
                    <img 
                      src={section.image} 
                      alt={section.content || section.title} 
                      style={{ 
                        width: 'auto', 
                        height: 'auto', 
                        maxHeight: '200px', 
                        objectFit: 'cover', 
                        borderRadius: '20px', 
                        marginTop: '10px' 
                      }}
                    />
                  )}
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