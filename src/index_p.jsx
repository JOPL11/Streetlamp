import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas, extend, useThree } from '@react-three/fiber';
import gsap from '../public/resources/gsap/gsap-core.js';
import React, { useState, useEffect, useRef } from 'react';
import { OrbitControls, MeshReflectorMaterial, BakeShadows, useHelper, Html } from '@react-three/drei';
import { EffectComposer } from '@react-three/postprocessing';
import { WebGLRenderTarget, HalfFloatType, ReinhardToneMapping, LinearToneMapping, CineonToneMapping, ACESFilmicToneMapping, WebGLRenderer } from 'three';
import { Noise } from '@react-three/postprocessing';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BlendFunction } from 'postprocessing';
import { DepthOfField } from '@react-three/postprocessing';
import { Bloom } from '@react-three/postprocessing';
import { SMAA } from '@react-three/postprocessing';
import { ToneMapping } from '@react-three/postprocessing';
import { Environment } from '@react-three/drei';
//import Particles from './Particles';
import Facility from './Facility';
 



const root = ReactDOM.createRoot(document.querySelector('#root'));

const App = () => {



    const gl = new WebGLRenderer({ 
        powerPreference: "high-performance",
        antialias: true, 
        frameBufferType: HalfFloatType 
    });
    gl.setSize(window.innerWidth, window.innerHeight);
    //gl.toneMapping = ReinhardToneMapping;
   // gl.toneMapping = LinearToneMapping;
   //<Environment preset="night" background tonemap="Cineon" />

    return (
            <>

            <Canvas 
                
                dpr={[1, 2]}
                style={{ zIndex: 0 }}
                camera={{ position: [0, 2, 10], fov: 50 }}
                
                gl={{
                    toneMapping: ReinhardToneMapping,
                    antialias: true,
                    powerPreference: "high-performance",
                    alpha: true,

                    preserveDrawingBuffer: false,
                    failIfMajorPerformanceCaveat: false,
                    forceWebGL1: false // Force WebGL1 context
                }} >
                
            
                <BakeShadows /> 
                <Environment preset="night" background tonemap="Cineon" />
                <OrbitControls />

                <Facility />
            </Canvas>
          
        </>
    );
};

root.render(<App />);