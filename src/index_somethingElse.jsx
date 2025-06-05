import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas, extend } from '@react-three/fiber';
import gsap from '../public/resources/gsap/gsap-core.js';
import { ScrollTrigger } from '../public/resources/gsap/ScrollTrigger.js';
import React, { useState, useEffect, useRef } from 'react';
import Experience from './Experience.jsx';
import Loader from './MainLoader.jsx';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { WebGLRenderTarget, HalfFloatType, ReinhardToneMapping, WebGLRenderer } from 'three';

// Extend the EffectComposer and other postprocessing components
extend({ EffectComposer });

gsap.registerPlugin(ScrollTrigger);

const root = ReactDOM.createRoot(document.querySelector('#root'));

const App = () => {
    const [contentVisible, setContentVisible] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(true);
    const canvasRef = useRef();
    const composerRef = useRef();

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.style.opacity = 0;
            canvasRef.current.style.transition = 'opacity 2s';
        }
    }, []);

    useEffect(() => {
        if (contentVisible && canvasRef.current) {
            canvasRef.current.style.opacity = 1;
        }
    }, [contentVisible]);

    const handleButtonClick = () => {
        console.log('Button clicked');
        setButtonVisible(false);
        setContentVisible(true);
        const audio = new Audio('./rainsounds.mp3');
        audio.loop = true;
        audio.play();
    };

    useEffect(() => {
        console.log('App initialized, button should be visible');
        setButtonVisible(true);
    }, []);

    useEffect(() => {
        gsap.to('.section', { y: 1500, duration: 0, alpha: 0 });

        gsap.to('.section', { duration: 2, alpha: 1, delay: 2 });
        gsap.to('.section', { y: 0, duration: 1, ease: 'power1.in', delay: 5 });
        gsap.to('.section2', { x: 800, y: -672, alpha: 0, duration: 0 });
        gsap.to('.section3', { x: 820, y: -1816, alpha: 0, duration: 0 });

        return () => {
            gsap.killTweensOf('.section');
            gsap.killTweensOf('.section2');
            gsap.killTweensOf('.section3');
        };
    }, []);

    const textClick1 = () => {
        console.log('textClick1 aye-aye capn aye');
        gsap.to('.section', { x: -500, duration: 0.5, alpha: 0 });
        gsap.to('.section2', { x: 142, y: -672, duration: 0.5, alpha: 1 });
    };

    const textClick2 = () => {
        console.log('textClick2 aye-aye capn');
        gsap.to('.section2', { x: -650, duration: 0.5, alpha: 0 });
        gsap.to('.section3', { x: 142, y: -1816, duration: 0.5, alpha: 1 });
        gsap.to('.section', { x: -450, duration: 0, alpha: 0 });
    };

    const textClick3 = () => {
        console.log('textClick3 aye-aye capn');
        gsap.to('.section3', { x: -520, duration: 0.5, alpha: 0 });
        gsap.to('.section', { x: 0, y: 0, duration: 0.5, alpha: 1 });
    };

    useEffect(() => {
        if (composerRef.current) {
            composerRef.current.render();
        }
    }, []);

    const renderTarget = new WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight,
        { type: HalfFloatType }
    );

    const gl = new WebGLRenderer({ antialias: true });
    gl.setSize(window.innerWidth, window.innerHeight);
    gl.toneMapping = ReinhardToneMapping;

    return (
        <>
            <Canvas ref={composerRef}
                style={{ zIndex: 0 }}
                gl={{ toneMapping: ReinhardToneMapping, antialias: true }}
                args={[null, renderTarget]}>

                <Experience paused={!contentVisible} />
            </Canvas>
            <div className="base" style={{ display: contentVisible ? 'block' : 'none', userSelect: 'none' }}>
                <div className="section">
                    <h2 className="title">
                        DO ANDROIDS<br />
                        <span style={{ fontSize: '100px', lineHeight: 0.88 }}>DREAM OF</span><br />
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
                        userSelect: 'none'
                    }}
                >
                    START
                </button>
            )}
            <div className="section2">
                <div>
                    <p className="p">Up above, the city's a circus of aircars —sleek, shining, and out of their damn minds.  <br /><br /> Ever since humanity cut the leash and took to the skies, sanity seemed to stay grounded.  <br /><br />Now, every Joe and Jane with a set of wings thinks they're the next ace in the pocket, dodging, weaving, and careening through the concrete canyons like gravity’s just another bad joke they heard on the way up.<br /><br /> </p>
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
                    <p className="p">Traffic’s a nightmare at five hundred feet, a ballet of chaos where the dancers are blind and the music’s too fast.  <br /><br /> Everyone’s in a rush to get nowhere, leaving reason in the rearview.  <br /><br />And here he was, wondering if any of this is real, or just another loop in the endless simulation. <br /><br /> Makes you think—if life’s a game, who’s playing whom?</p>
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
            <Loader />
        </>
    );
};

root.render(<App />);