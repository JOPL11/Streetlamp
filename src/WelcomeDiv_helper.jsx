import './newstyle.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { extend, useFrame } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { OrbitControls, MeshReflectorMaterial, BakeShadows, useHelper, Html } from '@react-three/drei';
import Experience from './Experience_2Drones_Elevator.jsx';
import Loader from './MainLoader.jsx';
import { EffectComposer } from '@react-three/postprocessing';
//import { GodRays } from '@react-three/postprocessing';
import { MeshStandardMaterial, SphereGeometry, PointLight } from 'three';
import { WebGLRenderTarget, HalfFloatType, ReinhardToneMapping, LinearToneMapping, CineonToneMapping, ACESFilmicToneMapping, WebGLRenderer } from 'three';
import { Noise } from '@react-three/postprocessing';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BlendFunction } from 'postprocessing';
import { DepthOfField } from '@react-three/postprocessing';
import { Bloom } from '@react-three/postprocessing';
import { SMAA, FXAA } from '@react-three/postprocessing';
import { ToneMapping } from '@react-three/postprocessing';
import WelcomeDiv from './WelcomeDiv.jsx'
import { Environment } from '@react-three/drei';
// import Rain from './Rain.jsx'; 
import * as THREE from 'three';
// import { Preload } from '@react-three/drei';

//import Particles from './Particles'; // Import the Particles component

//const WelcomeDiv = lazy(() => import('./WelcomeDiv'));


const App = () => {
    const [textures, setTextures] = useState(null);
    const [contentVisible, setContentVisible] = useState(false);   
    const [buttonClicked, setButtonClicked] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(false);
    const [buttonOpacity, setButtonOpacity] = useState(1); // New state for button opacity
    const [levelUpButtonVisible, setlevelUpButtonVisible] = useState(false);
    
    const manHandleRef = useRef(null);
    const canvasRef = useRef();


    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.style.opacity = 0;
            canvasRef.current.style.transition = 'opacity 1s';
        }
    }, []);

    useEffect(() => {
        if (contentVisible && canvasRef.current) {
           // canvasRef.current.style.opacity = 1;
            gsap.to(canvasRef.current, { opacity: 1, duration: 2, delay:2 });
        }
    }, [contentVisible]);

      // Preload PBR textures
      const loadPBRTextures = async () => {
        const textureLoader = new THREE.TextureLoader();
        const [colorMap, roughnessMap, aoMap] = await Promise.all([
          textureLoader.loadAsync('./textures/Concrete31/Concrete031_1K-JPG_Color.jpg'),
          textureLoader.loadAsync('./textures/Concrete31/Concrete031_1K-JPG_Roughness.jpg'),
          textureLoader.loadAsync('./textures/Concrete31/Concrete031_1K-JPG_AmbientOcclusion.jpg'),
        ]);
      
        // Apply adjustments to each texture
        colorMap.flipY = false;
        roughnessMap.flipY = false;
        aoMap.flipY = false;
      
        colorMap.premultiplyAlpha = false;
        roughnessMap.premultiplyAlpha = false;
        aoMap.premultiplyAlpha = false;
      
        return { colorMap, roughnessMap, aoMap };
      };


      useEffect(() => {
        const loadTextures = async () => {
          const loadedTextures = await loadPBRTextures();
          setTextures(loadedTextures);
        };
        loadTextures();
      }, []);


function movers(){
    gsap.to('button', { opacity: 0, duration: 1 });
    gsap.to('button', { y: -50000, duration: 0, delay: 2 });
    gsap.to('.not', { opacity: 0, duration: 0.2 }); 
    gsap.to('.not', { y: -50000, duration: 0, delay: 2 });
    gsap.to('.headline', { opacity: 0, duration: 2, delay: 2 });
    gsap.to('.headline', { y: -50000, duration: 0, delay: 2 });
}

const handleButtonClick = () => {
    setButtonClicked(true);
    // setButtonVisible(false);
    setContentVisible(true);
    setButtonOpacity(0); // Fade out the button
    gsap.to('.start-button', { opacity: 0, duration: 1 });
    gsap.to('.start-button', { y: -50000, duration: 0, delay: 2 });
    gsap.to('.not', { opacity: 0, duration: 0.2 }); 
    gsap.to('.not', { y: -50000, duration: 0, delay: 2 });
    gsap.to('.headline', { opacity: 0, duration: 2, delay: 2 });
    gsap.to('.headline', { y: -50000, duration: 0, delay: 4 });
    setTimeout(() => setlevelUpButtonVisible(true), 5500); // Adjust delay as needed
     
    };

    const handleLoadingComplete = () => {
        if (!buttonClicked) {
            setButtonVisible(true);
        }
    };

    const gl = new WebGLRenderer({ 

    });
    gl.setSize(window.innerWidth, window.innerHeight);
    gl.shadowMap.enabled = true;


    const experienceRef = useRef(null);

    const triggerLevelUp = () => {
      if (experienceRef.current) {
          experienceRef.current.handleLevelUp(); // Call handleLevelUp from Experience
      }
  };

    return (
        <>
           <div className='headline'
          style={{
            fontFamily: 'InterDisplay, sans-serif',
            fontSize: '55px', // Adjust size as needed
            color: 'white',
            position: 'absolute',
            top: '25%', // Position at the top
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1501, // Ensure it's above other elements
          }}
        >
          The Facility
        </div>
        <div
          className="not"
          style={{
            userSelect: 'none',
            fontFamily: 'InterDisplay, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '55%', // Position below the button
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '19px',
            color: 'white',
            zIndex: 1000,
            textAlign: 'center',
            width: '80%', // Adjust width as needed
            maxWidth: '600px', // Max width for larger screens
            padding: '10px', // Add some padding for spacing             <Preload all />
          }}
        >
          <div style={{ padding: '5%', lineHeight: '1.8'  }}>
          <div>Welcome, visitor</div>
          <div>Not optimized for mobile</div>
          <div>Spacebar to reset the tree</div>
          <div>Work in Progress</div>
          <div>There might be a bug</div>
          </div>
        </div>

 <Canvas ref={canvasRef} 
            shadows
            dpr={[1, 2]}
            style={{ zIndex: 0, width: '100vw', height: '100vh' }}
            gl={{
              powerPreference: "high-performance",
              antialias: true, 
              frameBufferType: HalfFloatType ,
              toneMapping: THREE.ReinhardToneMapping,
              shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap },
            }}
          >
              <Suspense fallback={null}>
              <pointLight position={[28, 15, 70]} />
              <Environment files="./dikhololo_night_1k.hdr" background={false} />
              <EffectComposer>
                <SMAA />
                <Noise premultiply dithering blendFunction={BlendFunction.SOFT_LIGHT} />
                <Bloom luminanceThreshold={0.25} mipmapBlur luminanceSmoothing={0.1} intensity={7} />
                <ToneMapping />
                </EffectComposer>
              <Experience textures={textures} paused={!contentVisible}  manHandle={manHandleRef} ref={experienceRef} />
              
              </Suspense>
              <WelcomeDiv levelUpButtonVisible={levelUpButtonVisible} onButtonClick={triggerLevelUp}/>
              </Canvas>

        {/* Load WelcomeDiv after 3D content is ready 
      <Suspense fallback={<div>Loading Welcome Text...</div>}>
       
      </Suspense>*/}

            {buttonVisible && (
                <button
                    className="start-button"
                    onClick={handleButtonClick}
                    style={{
                        fontFamily: 'InterDisplay, sans-serif',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50px',
                        width: '150px',
                        padding: '5px',
                        backgroundColor: '#009933',
                        outline: 'none',
                        fontSize: '20px',
                        zIndex: 1000, 
                        border: 'none',
                        color: 'white',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        position: 'absolute',
                        top: '40%',  // Center vertically
                        left: '50%', // Center horizontally
                        transform: 'translate(-50%, -50%)', // Adjust for center alignment
                      }}
                      aria-label="Start the process"
                >
                    START
                </button>
            )}
            <Loader onLoadingComplete={handleLoadingComplete} />
        </>
    );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);