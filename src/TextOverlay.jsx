import React, { useRef, useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import './TextOverlay.new.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const sanitizeInput = (input) => {
    // Create a new DOMPurify configuration
    const config = {
      ALLOWED_TAGS: [], // No HTML tags allowed
      ALLOWED_ATTR: [], // No HTML attributes allowed
      KEEP_CONTENT: true // Keep text content but strip all HTML
    };
    
    // Sanitize the input and trim any whitespace
    return DOMPurify.sanitize(input, config).trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Sanitize the input value before updating state
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Sanitize all form data before submission
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message)
    };
    
    setStatus('Sending...');
    
    try {
      const response = await fetch('https://formspree.io/f/xeokgnle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });
      
      if (response.ok) {
        setStatus('Message sent successfully!');
        // Reset form with empty values
        setFormData({ 
          name: '', 
          email: '', 
          message: '' 
        });
        // Clear success message after 3 seconds
        setTimeout(() => setStatus(''), 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus('Failed to send message. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="contact-form-container" style={{ 
      background: 'none', 
      boxShadow: 'none', 
      border: 'none', 
      padding: '0 20px',
      width: '100%',
      maxWidth: 'calc(100% - 40px)',
      margin: '0 auto'
    }}>
      <h3 style={{color: '#64b5f6', textAlign: 'center', fontSize: '1.4em', fontWeight: '500', marginBottom: '20px', marginTop: '20px', fontFamily: 'InterDisplay, sans-serif'}}></h3>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="submit-btn" style={{color: '#fff', textAlign: 'center', fontSize: '1.4em', fontWeight: '500', marginBottom: '20px', marginTop: '20px', fontFamily: 'InterDisplay, sans-serif'}}>Send Message</button>
        {status && <div className="form-status" style={{ fontFamily: 'InterDisplay, sans-serif' }}>{status}</div>}
      </form>
    </div>
  );
};

const TextOverlay = ({ visible = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);

  // Image style for consistent image rendering
  const imageStyle = {
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    margin: '10px 0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  };

  // Project information
  const sections = [
    { 
      title: "Folio", 
      content: "Jan Peiro was born in Barcelona, Spain in 1988. Grew up in Canada & Europe. Studied communications Design in Munich.",
      image: "",
      link: ""
    },
    { 
      title: "", 
      content: `Creates and implements visual concepts, from original designs to refining existing CI/CD systems, with expertise in animation and interactive development. 3+ years management experience. 15+ years collaborating with agencies, in-house teams, and startups - balancing innovation with brand compliance, ensuring visual consistency across all deliverables.`,
      image: "",
      link: ""
    },
    { 
      title: "Services", 
      content: "Website design & coding, App design & coding, 3D rendering, Motion design, Branding, Print design, Social media design, Visualization, Animation, Interactive development, SEO, Content creation, Project management, Team management, Client management, Innovation, Creativity, Strategy, Research. ",
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
      image: "",
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
                        style={imageStyle}
                      />
                    </a>
                  ) : (
                    <img 
                      src={section.image} 
                      alt={section.content || section.title}
                      style={imageStyle}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
          
          {/* Contact Form Section */}
          <div className="contact-section">
            <ContactForm />
          </div>
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