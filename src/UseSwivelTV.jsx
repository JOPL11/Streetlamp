import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const UseSwivelTV = (screenerRef, rigCamera) => {
    const cameraRef = useRef(rigCamera);
    
    // Keep the camera ref updated
    useFrame(() => {
        cameraRef.current = rigCamera;
    });

    useEffect(() => {
        if (!screenerRef.current) return;
        
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let isHovering = false;
        let animation = null;

        const handleMouseMove = (event) => {
            // Transform the mouse coordinates to normalized device coordinates (-1 to +1)
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Update the raycaster with the camera and mouse position
            if (!cameraRef.current) return;
            raycaster.setFromCamera(mouse, cameraRef.current);

            // Perform the raycasting operation to check for intersections
            const intersects = raycaster.intersectObjects([screenerRef.current], true);
            const isCurrentlyHovering = intersects.length > 0;

            if (isCurrentlyHovering) {
                if (!isHovering) {
                    // Mouse has entered the object
                    isHovering = true;
                    //   console.log("Mouse entered the screener.");
                    document.body.style.cursor = 'pointer'; // Change cursor to hand
                }

                // Swivel logic
                const centerX = window.innerWidth / 2;
                const deltaX = event.clientX - centerX;
                const rotationSpeed = 0.05; // Adjust this for more/less sensitivity
                const rotationY = deltaX * rotationSpeed;
                
                // Clean up any running animations
                if (animation) {
                    animation.kill();
                }
                
                // Apply the rotation to the object
                animation = gsap.to(screenerRef.current.rotation, {
                    y: rotationY,
                    duration: 2.5,
                    ease: "Power2.inOut",
                });
            } else {
                if (isHovering) {
                    // Mouse has left the object
                    isHovering = false;
                    // console.log("Mouse left the screener.");
                    document.body.style.cursor = 'default'; // Reset cursor
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [screenerRef, rigCamera]); // Keep rigCamera in deps for proper cleanup

    return null; // This hook does not need to return anything
};

export default UseSwivelTV;