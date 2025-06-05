import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import gsap from '../public/resources/gsap/gsap-core.js';
import { ScrollTrigger } from '../public/resources/gsap/ScrollTrigger.js';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { BakeShadows, Html } from '@react-three/drei';
import Experience from './Experience_backup_B.jsx';
import Loader from './MainLoader.jsx';
import { EffectComposer } from '@react-three/postprocessing';
import { HalfFloatType, ReinhardToneMapping, WebGLRenderer } from 'three';
import { Noise } from '@react-three/postprocessing';
//import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
//import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BlendFunction } from 'postprocessing';
import { DepthOfField } from '@react-three/postprocessing';
import { Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { SMAA } from '@react-three/postprocessing';
import { ToneMapping } from '@react-three/postprocessing';
import { Environment } from '@react-three/drei';
import Rain from './Rain.jsx'; 
import { Preload } from '@react-three/drei';
import { Text, ScrollControls, Scroll } from '@react-three/drei';

 


gsap.registerPlugin(ScrollTrigger);


const root = ReactDOM.createRoot(document.querySelector('#root'));

const App = () => {

    const [loading, setLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);


    const [contentVisible, setContentVisible] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false); // Track if the button has been clicked
    const [buttonVisible, setButtonVisible] = useState(false);

    const canvasRef = useRef();
    const audioRef = useRef();

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
        setIsLoaded(true);
        setButtonClicked(true); // Mark the button as clicked
        //setButtonVisible(false);  
        gsap.to('button', { opacity: 0, duration: 2 });
        gsap.to('button', { y: -50000, duration: 0, delay: 2 });  
        gsap.to('.not', { opacity: 0, duration: 2 });
        gsap.to('.not', { y: -50000, duration: 0, delay: 2 });
        gsap.to('.headline', { opacity: 0, duration: 2 });
        gsap.to('.headline', { y: -50000, duration: 0, delay: 2 });
        setContentVisible(true);
        const audio = new Audio('./rainsounds.mp3');
        audio.loop = true;
        audio.play();
    };

    function Sky() {
        return (
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[50, 22, 22]} /> {/* Radius: 5, Width and Height segments: 32 */}
            <meshStandardMaterial color="gray"  side={THREE.DoubleSide} transparent={true} opacity={0.5}/> {/* Blue-colored material */}
          </mesh>
        );
      }
      


    const gl = new WebGLRenderer({ 
    });
    gl.setSize(window.innerWidth, window.innerHeight);
   // gl.toneMapping = ReinhardToneMapping;
   // gl.toneMapping = LinearToneMapping;  <UnrealBloomPass strength={1.5} radius={0.4} threshold={0.85}  /> <DepthOfField target={[0, 2.5, 0]} focalLength={0.0065} bokehScale={1} height={0} />  




const textClick1 = () => {
    console.log('textClick1');
    gsap.to('.section1', { x: 150, y: 50, alpha: 1 });
}



useEffect(() => {
    // Initial GSAP animations


    return () => {
        // Cleanup GSAP tweens
        gsap.killTweensOf('.section1');

    };
}, []);

useEffect(() => {
    // Cleanup audio on unmount
    return () => {
        if (audioRef.current) {
            audioRef.current.pause(); // Pause audio
            audioRef.current.currentTime = 0; // Reset to start
            audioRef.current = null; // Clear the reference
        }
    };
}, []);



    return (
            <>

        <div className='not2' style={{ display: 'block', position: 'relative', height: '100vh', textAlign: 'center' }}>
        {/* Headline */}
        <div className='headline'
          style={{
            fontFamily: 'InterDisplay, sans-serif',
            fontSize: '35px', // Adjust size as needed
            color: 'white',
            position: 'absolute',
            top: '25%', // Position at the top
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1501, // Ensure it's above other elements
          }}
        >
          Welcome
        </div>
        
            <Canvas 
            
                ref={canvasRef}
                dpr={[1, 2]}
                style={{ zIndex: 0 }}
                gl={{ toneMapping: ReinhardToneMapping, antialias: true, powerPreference: "high-performance", frameBufferType: HalfFloatType  }}>
                <EffectComposer >
                <SMAA />
                <Noise premultiply dithering blendFunction={BlendFunction.SOFT_LIGHT} />
                <Bloom luminanceThreshold={0.1}  mipmapBlur luminanceSmoothing={0.7} intensity={5} />
                <DepthOfField target={[0, 2.5, 0]} focalLength={0.0075} bokehScale={1} height={0} />
                
                <ToneMapping />  
                </EffectComposer>         
                <Preload all />
          
            <Sky />
            <Suspense fallback={null}>
            <Rain />
                <Experience paused={!contentVisible} />
                <Environment files="./dikhololo_night_1k.hdr" background  />  
            </Suspense>
                        {/* Stationary headline */}
                        <Text
                    position={[-5, -50, 0]}
                    fontSize={1}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    Stationary Headline
                </Text>

                {/* Scrollable text inside a scroll area */}
                <ScrollControls pages={3}> {/* pages = number of scroll pages */}
                    <Scroll>
                    <Text
                        position={[-5, -50, 0]}
                        fontSize={0.5}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={5}
                    >
                        {"This is the first paragraph.\n\nThis is the second paragraph."}
                        {"\n"}In the rain-soaked, neon-drenched streets of a Los Angeles that reached for the sky but got lost in the clouds, he walks. {"\n"}{"\n"} Or maybe that’s just the script he follows, every click of his boots on the wet asphalt scripted in some cosmic code he hadn't yet cracked.  {"\n"}{"\n"} See, he was a Blade-Runner, but sometimes he wondered if he was just another character in someone's digital fever dream. {"\n"}
                        {"\n"}Up above, the city's a circus of aircars —sleek, shining, and out of their damn minds.  {"\n"}{"\n"} Ever since humanity cut the leash and took to the skies, sanity seemed to stay grounded.  {"\n"}{"\n"} Now, every Joe and Jane with a set of wings thinks they're the next ace in the pocket, dodging, weaving, and careening through the concrete canyons like gravity’s just another bad joke they heard on the way up. {"\n"}
                        {"\n"}Traffic’s a nightmare at five hundred feet, a ballet of chaos where the dancers are blind and the music’s too fast.  {"\n"}{"\n"} Everyone’s in a rush to get nowhere, leaving reason in the rearview.   {"\n"}{"\n"}And here he was, wondering if any of this is real, or just another loop in the endless simulation.  {"\n"}{"\n"}  Makes you think—if life’s a game, who’s playing whom?{"\n"}
                        </Text>
                    </Scroll>
                </ScrollControls>
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
        <div style={{ display: 'flex', pointerEvents: 'auto',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',}}>
              <br />
            </div>
            <div style={{ lineHeight: '1.8', top: '50px', position: 'relative' }}>
              <div>Not optimized for mobile.</div>
              <div>Work in Progress.</div>
            </div>
          </div>
          {buttonVisible && (
            <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
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
              backgroundColor: '#007bff',
              outline: 'none',
              fontSize: '20px',
              zIndex: 2001, // Set a higher z-index
              border: 'none',
              color: 'white',
              borderRadius: '10px',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            aria-label="Start the process"
          >
            Start
          </button> </div>
            )}
      


      <div class="scrollable-container">
            <div className="base" style={{ display: contentVisible ? 'block' : 'none', userSelect: 'none' }}>
                <div className="section1">
                    <p className="title">
                        DO ANDROIDS<br />
                        <span style={{ fontSize: '100px', lineHeight: 0.88 }}>DREAM OF</span><br />
                        SIMULATIONS
                    </p>
                    <p className="p">In the rain-soaked, neon-drenched streets of a Los Angeles that reached for the sky but got lost in the clouds, he walks. <br /><br /> Or maybe that’s just the script he follows, every click of his boots on the wet asphalt scripted in some cosmic code he hadn't yet cracked. <br /><br />See, he was a Blade-Runner, but sometimes he wondered if he was just another character in someone's digital fever dream.<br /><br /> </p>
                    <p className="p">Up above, the city's a circus of aircars —sleek, shining, and out of their damn minds.  <br /><br /> Ever since humanity cut the leash and took to the skies, sanity seemed to stay grounded.  <br /><br />Now, every Joe and Jane with a set of wings thinks they're the next ace in the pocket, dodging, weaving, and careening through the concrete canyons like gravity’s just another bad joke they heard on the way up.<br /><br /> </p>
                    <p className="p">Traffic’s a nightmare at five hundred feet, a ballet of chaos where the dancers are blind and the music’s too fast.  <br /><br /> Everyone’s in a rush to get nowhere, leaving reason in the rearview.  <br /><br />And here he was, wondering if any of this is real, or just another loop in the endless simulation. <br /><br /> Makes you think—if life’s a game, who’s playing whom?</p>

                </div>
            </div>
     </div>

<Loader onLoadingComplete={handleLoadingComplete} />
            <div className="section2">
                <div>
                    <p className="p">Up above, the city's a circus of aircars —sleek, shining, and out of their damn minds.  <br /><br /> Ever since humanity cut the leash and took to the skies, sanity seemed to stay grounded.  <br /><br />Now, every Joe and Jane with a set of wings thinks they're the next ace in the pocket, dodging, weaving, and careening through the concrete canyons like gravity’s just another bad joke they heard on the way up.<br /><br /> </p>
                </div>

            </div>
            <div className="section3">
                <div>
                    <p className="p">Traffic’s a nightmare at five hundred feet, a ballet of chaos where the dancers are blind and the music’s too fast.  <br /><br /> Everyone’s in a rush to get nowhere, leaving reason in the rearview.  <br /><br />And here he was, wondering if any of this is real, or just another loop in the endless simulation. <br /><br /> Makes you think—if life’s a game, who’s playing whom?</p>
                </div>

            </div>
            </div>
        </>
    );
};

root.render(<App />);