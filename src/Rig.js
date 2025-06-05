
// Rig it up
function Rig() {
  
  const { camera, mouse } = useThree();
  const clock = useRef(new THREE.Clock(false));
  const startPos = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3(...targetPosition));
  const lerpAmount = useRef(0);
  const targetPosition = [-10, 5, -5];
 

  const startAnimation = () => {
    clock.current.start();
    startPos.current.copy(camera.position);
    console.log(camera.position); // Capture current position as start
    lerpAmount.current = 0;
  };
    // Use useFrame to animate camera movement
    useFrame((state, delta) => {
      if (clock.current.running) {
        const deltaTime = clock.current.getDelta();
        lerpAmount.current += deltaTime;
        if (lerpAmount.current >= 1) {
          // Animation complete, stop the clock
          clock.current.stop();
          return;
        }
        // Interpolate camera position
        camera.position.lerpVectors(startPos.current, target.current, lerpAmount.current);
      }
    });

  useFrame((state, delta) => {
    // Calculate the scaled vertical mouse movement
    const scaledMouseY = state.mouse.y * 0.5; // Adjust the scaling factor as needed
    // Update the camera rotation based on the scaled vertical mouse movement
    camera.rotation.x = -scaledMouseY * Math.PI / 2;
    // Calculate the scaled horizontal mouse movement
    const scaledMouseX = state.mouse.x * 1; // Adjust the scaling factor as needed
    // Update the camera position based on scaled mouse coordinates
    const newPositionX = Math.sin(scaledMouseX / 4) * 2.5;
    const newPositionY = 1.25 + scaledMouseY;
    const newPositionZ = Math.cos(scaledMouseX / 2.5) * 1.7; 

    // Apply additional leftward movement when the mouse is on the left side of the screen
    let cameraX = newPositionX;
    if (state.mouse.x < 0) {
      cameraX -= 0.4; // Adjust the value to move the camera further to the left
    }
    if (state.mouse.x > 0) {
      cameraX += 0.3; // Adjust the value to move the camera further to the right
    }
    // Update the camera position
    easing.damp3(camera.position, [cameraX, newPositionY, newPositionZ], 1.5, delta);
    // Keep the camera looking at the same point
    camera.lookAt(-0.1, 2.9, 0.6);
  });

  //return null; // Since this is a utility component, it doesn't render anything
}


