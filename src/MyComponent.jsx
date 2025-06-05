import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { AdditiveBlending } from 'three';
import { FileLoader, Loader, CanvasTexture, NearestFilter } from 'three';
import lottie from 'lottie-web';

let container;
//console.log(lottie)
container = document.createElement("div");
document.body.appendChild(container);

class LottieLoader extends Loader {

	setQuality( value ) {

		this._quality = value;

	}

	load( url, onLoad, onProgress, onError ) {

		const quality = this._quality || 1;

		const texture = new CanvasTexture();
		texture.minFilter = NearestFilter;

		const loader = new FileLoader( this.manager );
		loader.setPath( this.path );
		loader.setWithCredentials( this.withCredentials );

		loader.load( url, function ( text ) {

			const data = JSON.parse( text );

			// bodymoving uses container.offetWidth and offsetHeight
			// to define width/height

			const container = document.createElement( 'div' );
			container.style.width = data.w + 'px';
			container.style.height = data.h + 'px';
			document.body.appendChild( container );

			const animation = bodymovin.loadAnimation( {
				container: container,
				animType: 'canvas',
				loop: true,
				autoplay: true,
				animationData: data,
				rendererSettings: { dpr: quality }
			} );

			texture.animation = animation;
			texture.image = animation.container;

			animation.addEventListener( 'enterFrame', function () {

				texture.needsUpdate = true;

			} );

			container.style.display = 'none';

			if ( onLoad !== undefined ) {

				onLoad( texture );

			}

		}, onProgress, onError );

		return texture;

	}

}
//console.log(LottieLoader)
function MyComponent() {
  const { scene } = useThree();

  useEffect(() => {
    const loadingManager = new THREE.LoadingManager();
    
    // Create a new instance of LottieLoader
    const lottieLoader = new LottieLoader(loadingManager);
    lottieLoader.setQuality(1); // Set the quality if needed
    
     // Load the Lottie animation
    lottieLoader.load("./streetlight_txt_4.json", function (Lottietexture) {
      const Lottiematerial = new THREE.MeshBasicMaterial({
        //transparent: true,
        //opacity: 0.5,
        map: Lottietexture,
        depthWrite: false,
        blending: AdditiveBlending,
        side: THREE.DoubleSide,
      });

      const geometry = new THREE.PlaneGeometry(450, 280);
      const mesher = new THREE.Mesh(geometry, Lottiematerial);
      mesher.position.set(-1.5, 3.2, -27.3);
      mesher.scale.multiplyScalar(0.0045);
      mesher.rotation.y = Math.PI / 12; // Adjust the angle as needed
      scene.add(mesher);

      // Clean up on unmount
      return () => {
        scene.remove(mesher);
        Lottiematerial.dispose();
        geometry.dispose();
        Lottietexture.dispose();
		container.removeChild(canvas);
      };
    });

  }, [scene]);  // Dependency array with scene to ensure effect runs only when scene is ready
}

export default MyComponent;