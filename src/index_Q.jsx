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
        // Show content and base element
        //gsap.to('.scrollhold', { opacity: 1, duration: 3, delay:2});
        // Button transition
        gsap.to('button', { opacity: 0, duration: 2 });
        gsap.to('button', { y: -50000, duration: 0, delay: 2 });
        gsap.to('.not', { opacity: 0, duration: 2 });
        gsap.to('.not', { y: -50000, duration: 0, delay: 2 });
        gsap.to('.headline', { opacity: 0, duration: 2 });
        gsap.to('.headline', { y: -50000, duration: 0, delay: 2 });
       // setTimeout(() => setlevelUpButtonVisible(true), 1100); // Adjust delay as needed
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
        <div className='not2' style={{ position: 'relative', height: '100vh'}}>
        {/* Headline */}
        <div className='headline'
          style={{
            fontFamily: 'InterDisplay, sans-serif',
            fontSize: '25px', // Adjust size as needed
            color: 'white',
            position: 'absolute',
            top: '25%', // Position at the top
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1501, // Ensure it's above other elements  <Rain />    <PreloadModels onModelsLoaded={handleModelsLoaded}  />   <MotionBlur velocityScale={0.5}  motionStrength={0.5} />
          }}
        >
          wordpress?
        </div>
        {contentVisible && (
          <div style={{ position: 'fixed', zIndex: 1001  }}>
            <TextOverlay isVisible={contentVisible} />
          </div>
        )}
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
            className='not'
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
          {buttonVisible && (
            <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <button 
            onClick={handleButtonClick}
            style={{
              fontFamily: 'InterDisplay, sans-serif',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50px',
              width: '150px',
              padding: '5px',
              backgroundColor: '#ff471a',
              outline: 'none',
              fontSize: '25px',
              zIndex: 2001, // Set a higher z-index
              border: 'none',
              color: 'white',
              borderRadius: '10px',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            aria-label="Start the process"
          >
              Begin
            </button> </div>
          )}
        <div style={{ display: 'flex', pointerEvents: 'auto',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',}}>
            </div>
            <div style={{ lineHeight: '1.8', top: '50px', position: 'relative' }}>
              <div></div>
              <div> Dystopian Streetlamp </div>
             
            </div>
          </div>

          <Loader onLoadingComplete={handleLoadingComplete} />
            </div>
         
            
        </>
    );
};

root.render(<App />);