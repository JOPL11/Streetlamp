import './style.css';
import Loader from './MainLoader.jsx';
import PreloadModels from './PreloadModels.jsx';
import ReactDOM from 'react-dom/client';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import gsap from '../public/resources/gsap/gsap-core.js';
import { ScrollTrigger } from '../public/resources/gsap/ScrollTrigger.js';
import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { OrbitControls, BakeShadows, Html } from '@react-three/drei';
import Experience from './Experience_backup_C.jsx';

import { EffectComposer } from '@react-three/postprocessing';
import { HalfFloatType, ReinhardToneMapping, WebGLRenderer } from 'three';
import { Noise } from '@react-three/postprocessing';
//import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
//import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BlendFunction } from 'postprocessing';
import { DepthOfField } from '@react-three/postprocessing';
import { Bloom } from '@react-three/postprocessing';
import { SMAA } from '@react-three/postprocessing';
import { ToneMapping } from '@react-three/postprocessing';
import { Environment } from '@react-three/drei';
import Rain from './Rain.jsx'; 
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import CopyrightNotice from './CopyrightNotice';

// ... rest of the code remains the same ...



const App = () => {
    console.log('App, eh.');

    const [contentVisible, setContentVisible] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false); // Track if the button has been clicked
    const [buttonVisible, setButtonVisible] = useState(false);
    const canvasRef = useRef();
    const { scene } = useThree();

    const handleModelsLoaded = () => {
        console.log('Models finished loading!');
      };
    /*const modelPaths = ['./city2.obj', 
        './aircar_subway.obj', 
        './aircar_diablo.obj', 
        './aircar_convoy.obj', 
        './aircar_convoy2.obj', 
        './aircar_convoy3.obj', 
        './aircar_decker.obj',
        './drone.obj',
        './aircar_limo.obj',
        './aircar_delorean.obj',
        './wires.obj',
        './white.obj',
        './grey.obj',
        './lightgrey.obj',
        './black.obj',
        './camera1.obj',
        './camera2.obj',
        './sneakers.obj',
        './unicorn.obj',
        './walk.obj',
        './pole3.obj',
        './streetlamper2lights.obj',
        './traffic_export.obj',
        './aircar_blimp.obj'];
        console.log('Loading Complete, eh.', modelPaths); */
    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.style.opacity = 0;
            canvasRef.current.style.transition = 'opacity 0.5s';
        }
    }, []);

    useEffect(() => {
        if (contentVisible && canvasRef.current) {
            canvasRef.current.style.opacity = 1;
        }
    }, [contentVisible]);

    const handleLoadingComplete = () => {
        if (!buttonClicked) { 
        setButtonVisible(true);
        }
    };

    const handleButtonClick = () => {
        setButtonClicked(true); // Mark the button as clicked
        setButtonVisible(false);    
        setContentVisible(true);
        const audio = new Audio('./rainsounds.mp3');
        audio.loop = true;
        audio.play();
    };



    useEffect(() => {
        gsap.to('.section', { y: 1500, duration: 0, alpha: 0 });
        gsap.to('.section', { duration: 2, alpha: 1, delay: 2 });
        gsap.to('.section', { y: 0, duration: 1, ease: 'power3.in', delay: 5 });
        gsap.to('.section2', { x: -500, y: -672, alpha: 0, duration: 0 });
        gsap.to('.section3', { x: -520, y: -1769, alpha: 0, duration: 0 });

        return () => {
            gsap.killTweensOf('.section');
            gsap.killTweensOf('.section2');
            gsap.killTweensOf('.section3');
        };
    }, []);

    const textClick1 = () => {
        console.log('textClick1');
        gsap.to('.section', { x: -500, duration: 0.5, alpha: 0 });
        gsap.to('.section2', { x: 42, y: -672, duration: 0.5, alpha: 1 });
    };

    const textClick2 = () => {
        console.log('textClick2');
        gsap.to('.section2', { x: -650, duration: 0.5, alpha: 0 });
        gsap.to('.section3', { x: 42, y: -1769, duration: 0.5, alpha: 1 });
        gsap.to('.section', { x: -450, duration: 0, alpha: 0 });
    };

    const textClick3 = () => {
        console.log('textClick3');
        gsap.to('.section3', { x: -520, duration: 0.5, alpha: 0 });
        gsap.to('.section', { x: 0, y: 0, duration: 0.5, alpha: 1 });
    };
    const textClick4 = () => {
        console.log('textClick4');
       
    };

    const gl = new WebGLRenderer({ 
        // powerPreference: "high-performance",
      //  antialias: true, 
       // frameBufferType: HalfFloatType 
    });
    gl.setSize(window.innerWidth, window.innerHeight);
   // gl.toneMapping = ReinhardToneMapping;
   // gl.toneMapping = LinearToneMapping;

    return (
            <>
               
            <Canvas 
                ref={canvasRef}
                dpr={[1, 2]}
                style={{ zIndex: 0 }}
                gl={{ toneMapping: ReinhardToneMapping, antialias: true, powerPreference: "high-performance", frameBufferType: HalfFloatType  }}>
               
                
                <EffectComposer >
                <SMAA />
                <Noise 
                premultiply
                dithering
                blendFunction={BlendFunction.SOFT_LIGHT} 
                />
                <DepthOfField 
                    target={[0, 2.5, 0]}
                    focalLength={0.0065} 
                    bokehScale={1} 
                    height={0} 
                    />
                <Bloom 
                    luminanceThreshold={0.1} 
                    mipmapBlur 
                    luminanceSmoothing={0.7} 
                    intensity={5} 
                    />
                <ToneMapping />  
                </EffectComposer>         
                <BakeShadows /> 
            <OrbitControls />
            <Suspense fallback={null}>
            <PreloadModels onModelsLoaded={handleModelsLoaded}  />
            <Rain />
                <Experience paused={!contentVisible} />
                <Environment files="./dikhololo_night_1k.hdr" background  />  
            </Suspense>
            </Canvas>

            <div className="base" style={{ display: contentVisible ? 'block' : 'none', userSelect: 'none' }}>
                <div className="section">
                    <h2 className="title">
                        DO ANDROIDS<br />
                        <span className="dream" style={{fontSize: '1.35em', lineHeight: '0.88em'}}>DREAM OF</span><br />
                        SIMULATIONS
                    </h2>
                    <p className="p">In the rain-soaked, neon-drenched streets of a Los Angeles that reached for the sky but got lost in the clouds, he walks. <br /><br /> Or maybe that’s just the script he follows, every click of his boots on the wet asphalt scripted in some cosmic code he hadn't yet cracked. <br /><br />See, he was a Blade-Runner, but sometimes he wondered if he was just another character in someone's digital fever dream.<br /><br /> </p>
                    <div className="next">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '40px',
                            width: '150px',
                            padding: '5px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}
                            onClick={textClick1}>next</div>
                    </div>
                </div>
            </div>
            {buttonVisible && (
                <button
                    onClick={handleButtonClick}
                    style={{
                        fontFamily: 'InterDisplay, sans-serif',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        height: '50px',
                        width: '150px',
                        padding: '5px',
                        backgroundColor: '#007bff',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        outline: 'none',
                        fontSize: '20px',
                        zIndex: 1000,
                        opacity: 1,
                        border: 'none',
                        color: 'white',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'opacity 1s',
                    }}
                >
                    START
                </button>
                 )}
            <Loader onLoadingComplete={handleLoadingComplete} />
            <div
            style={{
                position: 'fixed',
                top: '175px',
                left: '0px',
                width: '52px',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
                transition: 'opacity 0.3s ease',
                opacity: '50%',
            }}
        >
            <div
            style={{
                position: 'fixed',
                top: '175px',
                right: '0px',
                width: '52px',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
                transition: 'opacity 0.3s ease',
                opacity: '100%',
            }}
        ></div>
            <div className="sideText">
            <div style={{
                        display: 'fixed',
                        transformOrigin: 'center center',
                        justifyContent: 'left',
                        position: 'fixed',
                        alignItems: 'center',
                        height: '20px',
                        width: '200px',
                        padding: '5px',
                        backgroundColor: 'transparent',
                        fontSize: '14px',
                        cursor: 'pointer',
                        opacity: '50%'
                    }}
                        onClick={textClick4}> <br /></div>

            </div>
            </div>
            <div
                     style={{
                        position: 'fixed',
                        bottom: '262px',
                        left: '0px',
                        width: '52px',
                        height: '2px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '0px',
                        overflow: 'hidden',
                        border: '0px solid #fff',
                        transition: 'opacity 0.3s ease',
                        opacity: '50%',
                        }}></div>
                                    <div
                     style={{
                        position: 'fixed',
                        bottom: '262px',
                        right: '0px',
                        width: '52px',
                        height: '2px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '0px',
                        overflow: 'hidden',
                        border: '0px solid #fff',
                        transition: 'opacity 0.3s ease',
                        opacity: '100%',
                        }}></div>
  
            <div className="section2">
                <div>
                    <p className="p">Up above, the city's a circus of aircars —sleek, shining, and out of their damn minds. <br /><br /> Ever since humanity cut the leash and took to the skies, sanity seemed to stay grounded. <br /><br />Now, every Joe and Jane with a set of wings thinks they're the next ace in the pocket, dodging, weaving, and careening through the concrete canyons like gravity’s just another bad joke they heard on the way up.<br /><br /> </p>
                </div>
                <div className="next2">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '40px',
                        width: '150px',
                        padding: '5px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                        onClick={textClick2}>next</div>
                </div>
            </div>
            <div className="section3">
                <div>
                    <p className="p">Traffic’s a nightmare at five hundred feet, a ballet of chaos where the dancers are blind and the music’s too fast.<br /><br />Everyone’s in a rush to get nowhere, leaving reason in the rearview.<br /><br /> And here he was, wondering if any of this is real, or just another loop in the endless simulation.<br /><br /> </p>
                </div>
                <div className="next3">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '40px',
                        width: '150px',
                        padding: '5px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                        onClick={textClick3}>next</div>
                </div>
            </div>
            <div style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              zIndex: 99999,
              color: 'red',
              fontSize: '24px',
              fontWeight: 'bold',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }}>
              © 2023 Jan Peiro
            </div>
        </>
    );
};

root.render(<App />);