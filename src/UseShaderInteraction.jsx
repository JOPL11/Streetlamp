import { useEffect } from 'react';
import * as THREE from 'three';

const UseShaderInteraction = ({ unicornRef, camera }) => {
    useEffect(() => {
        if (!unicornRef || !unicornRef.current || !unicornRef.current.material) {
            // unicornRef or its current property is not yet initialized, wait for the next frame
            return;
        }

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const updateShaderEffect = (intersected) => {
            // Assuming the shader uses uniforms to control its effects
            if (intersected) {
                unicornRef.current.material.uniforms.effectIntensity.value = 1.5; // Intensify effect
            } else {
                unicornRef.current.material.uniforms.effectIntensity.value = 1.0; // Normal intensity
            }
        };

        const handleMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera); // Use the passed camera reference
            const intersects = raycaster.intersectObjects([unicornRef.current], true);

            updateShaderEffect(intersects.length > 0);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [unicornRef, camera]); // Adjusted the dependencies

    return null;
    
};

export default UseShaderInteraction;