import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

const Loader = ({ onLoadingComplete }) => {
    const { progress } = useProgress();
    const [visible, setVisible] = useState(true);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        if (progress === 100) {
                setTimeout(() => {
                    setVisible(false);
                    onLoadingComplete();
                }, 300); // Ensure it hides after fade out
        }
    }, [progress, onLoadingComplete]);

    if (!visible) return null;
    return (
        <div
            style={{
                position: 'fixed',
                bottom: '27px',
                left: '40px',
                width: '60px',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0px',
                overflow: 'hidden',
                border: '0px solid #fff',
                transition: 'opacity 0.3s ease',
                opacity: opacity,
            }}
        >
            <div
                style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: '#ffffff',
                    transition: 'width 0.3s ease',
                }}
            ></div>
        </div>
    );
};

export default Loader;