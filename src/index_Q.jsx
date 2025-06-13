import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas, useThree  } from '@react-three/fiber';
import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import Experience from './Experience_backup_B.jsx';
import Loader from './MainLoader.jsx';
import PreloadModels from './PreloadModels.jsx';
import { EffectComposer } from '@react-three/postprocessing';
import { HalfFloatType, ReinhardToneMapping, WebGLRenderer } from 'three';
import { Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { DepthOfField  } from '@react-three/postprocessing';
import { Bloom } from '@react-three/postprocessing';
//import { MotionBlur } from 'postprocessing';             <WelcomeDiv/>
import { SMAA } from '@react-three/postprocessing';
import { ToneMapping } from '@react-three/postprocessing';
import { Environment } from '@react-three/drei';
import Rain from './Rain.jsx'; 
import { Preload, PerformanceMonitor } from '@react-three/drei';


import { gsap } from 'gsap';
import TextOverlay from './TextOverlay.jsx';
import CopyrightNotice from './CopyrightNotice';
//import { Profiler } from 'react';
//import Stats from 'stats.js';  <Profiler id="CanvasProfiler" onRender={onRenderCallback}></Profiler> 
//import WelcomeDiv from './WelcomeDiv.jsx';


const root = ReactDOM.createRoot(document.querySelector('#root'));




const App = () => {
    const [loading, setLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [levelUpButtonVisible, setlevelUpButtonVisible] = useState(false);

    const canvasRef = useRef();
    const audioRef = useRef(null);

    const [dpr, setDpr] = useState(1);
const throttleTimeout = useRef(null);

const handleIncline = () => {
  if (throttleTimeout.current) clearTimeout(throttleTimeout.current);
  throttleTimeout.current = setTimeout(() => setDpr(0.75), 1000);
};

const handleDecline = () => {
  if (throttleTimeout.current) clearTimeout(throttleTimeout.current);
  throttleTimeout.current = setTimeout(() => setDpr(0.5), 500);
};


    const handleModelsLoaded = () => {
      console.log('Models finished loading!');
    };

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.style.opacity = 0;
           
        }
    }, []);

    useEffect(() => {
        if (contentVisible && canvasRef.current) {
            canvasRef.current.style.opacity = 1;
            canvasRef.current.style.transition = 'opacity 2.5s';

        }
    }, [contentVisible]);

    const handleLoadingComplete = () => {
        if (!buttonClicked) {
          handleModelsLoaded();  // THIS IS UNTESTED
          setButtonVisible(true);
        }
    };

    const onRenderCallback = (
      id, // "id" prop of the Profiler tree
      phase, // "mount" or "update"
      actualDuration, // time spent rendering the update
      baseDuration, // time without memoization
      startTime, // time when React started rendering
      commitTime, // time when React committed the update
      interactions // Set of interactions during the update
    ) => {
      console.log(`${id} - ${phase} took ${actualDuration}ms`);
    };


    const handleButtonClick = () => {
        setIsLoaded(true);
        setButtonClicked(true);
        // Only target the splash screen elements specifically
        gsap.to('.splash-button', { opacity: 0, duration: 2 });
        gsap.to('.splash-button', { y: -50000, duration: 0, delay: 2 });
        gsap.to('.splash-content', { opacity: 0, duration: 2 });
        gsap.to('.splash-content', { y: -50000, duration: 0, delay: 2 });
        gsap.to('.headline', { opacity: 0, duration: 2 });
        gsap.to('.headline', { y: -50000, duration: 0, delay: 2 });
        setContentVisible(true);

        // Play or restart audio
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            audioRef.current = new Audio('./rainsounds.mp3');
            audioRef.current.loop = true;
            audioRef.current.play().catch((error) => console.error('Audio failed to play', error));
        }
    };


   
    return (
      
            <>
          
        {!modelsLoaded && <PreloadModels onModelsLoaded={() => setModelsLoaded(true)} />}
        <div className='splash-screen' style={{ position: 'relative', height: '100vh'}}>
        {/* Headline */}
          <div className='headline'
          style={{
            fontFamily: 'InterDisplay, sans-serif',
            fontSize: '25px',
            color: 'white',
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1501,
            textAlign: 'center',
            width: '100%'
          }}
        >
          Welcome
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <button 
              className="splash-button"
              onClick={handleButtonClick} 
              style={{
                fontFamily: 'InterDisplay, sans-serif',
                fontSize: '24px',
                padding: '15px 30px',
                color: 'white',
                background: 'black',
                border: '2px solid white',
                borderRadius: '50px',
                cursor: 'pointer',
                zIndex: 1500,
                opacity: buttonVisible ? 1 : 0,
                transition: 'opacity 2s ease-in-out',
              }}>
              Enter
            </button>
            <div style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '14px',
              fontStyle: 'italic',
              opacity: buttonVisible ? 1 : 0,
              transition: 'opacity 2s ease-in-out',
              textAlign: 'center',
              marginTop: '5px'
            }}>
              under construction
            </div>
          </div>
        </div>
        <div style={{ position: 'fixed', zIndex: 1001 }}>
          <TextOverlay />
        </div>
        <CopyrightNotice />
        <Canvas 
            ref={canvasRef}
            dpr={dpr} // Now controlled by PerformanceMonitor
            style={{ zIndex: 0 }}
            gl={{ 
              toneMapping: ReinhardToneMapping, 
              antialias: true, 
              powerPreference: "high-performance", 
              frameBufferType: HalfFloatType  
            }}
          >
            <color args={['#594A40']} attach="background" />
            <fog attach="fog" color='#594A40' near={1} far={11} />
            
            <PerformanceMonitor onIncline={handleIncline} onDecline={handleDecline}  iterations={5} threshold={0.75}/>

            <Suspense fallback={null}>
              <EffectComposer>
                <SMAA />
                <Noise premultiply dithering blendFunction={BlendFunction.SOFT_LIGHT} />
                <Bloom luminanceThreshold={0.1} mipmapBlur luminanceSmoothing={0.1} intensity={2} />
                {dpr > 1 && <DepthOfField target={[0, 2.5, 0]} focalLength={0.0075} bokehScale={1} height={0} />}
                <ToneMapping needsUpdate={true} /> 
              </EffectComposer>

              <Rain />
             
              <Experience paused={!contentVisible} />
              <Environment files="./dikhololo_night_1k.hdr" />    
            </Suspense>

            <Preload all />
          </Canvas>
          <div
            className='splash-content not'
            style={{
              fontFamily: 'InterDisplay, sans-serif',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: '55%', // Position below the button
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '14px',
              color: 'white',
              zIndex: 1100,
              textAlign: 'center',
              width: '80%',
              maxWidth: '600px',
              padding: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.0)',
              borderRadius: '10px',
            }}
          >
          {/* Button has been moved to be under the Welcome text */}
        <div style={{ display: 'flex', pointerEvents: 'auto',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',}}>
            </div>
            <div style={{ lineHeight: '1.8', top: '50px', position: 'relative' }}>
              <div></div>
              <div></div>
             
            </div>
          </div>

          <Loader onLoadingComplete={handleLoadingComplete} />
            </div>
         
            
        </>
    );
};

root.render(<App />);