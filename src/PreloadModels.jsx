import { useLoader, useThree } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three';
import { VideoTexture } from 'three';
import { useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { modelPaths } from './modelsConfig';

const PreloadModels = ({ onModelsLoaded }) => {
    useEffect(() => {
      const loadModel = (path) => {
        return new Promise((resolve, reject) => {
          const extension = path.split('.').pop();
          
          try {
            if (extension === 'obj') {
              const model = useLoader(OBJLoader, path);
              resolve(model);
            } else if (extension === 'png') {
              const texture = useLoader(TextureLoader, path);
              resolve(texture);
            } else if (extension === 'jpg') {
              const texture = useLoader(TextureLoader, path);
              resolve(texture);
            } else if (extension === 'mp4') {
              const video = document.createElement('video');
              video.src = path;
              video.load();
              video.addEventListener('loadeddata', () => {
                const videoTexture = new VideoTexture(video);
                resolve(videoTexture);
              });
              video.addEventListener('error', reject);
            } else {
              reject(new Error(`Unsupported file type: ${extension}`));
            }
          } catch (error) {
            reject(error);
          }
        });
      };
  
      const loadAllModels = async () => {
        try {
          const promises = modelPaths.map((path) => {
            console.log(`Starting to load model: ${path}`);
            return loadModel(path).then((model) => {
              console.log(`Successfully loaded model: ${path}`);
              return model;
            });
          });
  
          await Promise.all(promises);
          onModelsLoaded();
        } catch (error) {
          console.error('Error loading models:', error);
        }
      };
  
      loadAllModels();
    }, [onModelsLoaded]);
  
    return null;
};

export default PreloadModels;