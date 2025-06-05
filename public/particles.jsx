import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { ShaderMaterial, Vector2, Color, BufferGeometry, Float32BufferAttribute, Points } from 'three'
import gsap from 'gsap'
import GUI from 'lil-gui'
import particlesVertexShader from './shaders/particles/vertex.glsl'
import particlesFragmentShader from './shaders/particles/fragment.glsl'

extend({ OrbitControls })

const Particles = () => {
  const { gl, camera, scene } = useThree()
  const controls = useRef()
  const gui = useRef(new GUI({ width: 340 }))
  const [particles, setParticles] = useState(null)
  const [sizes, setSizes] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  })

  useEffect(() => {
    const handleResize = () => {
      setSizes({
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (particles) {
      particles.material.uniforms.uResolution.value.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
      gl.setSize(sizes.width, sizes.height)
      gl.setPixelRatio(sizes.pixelRatio)
    }
  }, [sizes, particles, camera, gl])

  useEffect(() => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/')
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    gltfLoader.load('./models2.glb', (gltf) => {
      const positions = gltf.scene.children.map(child => child.geometry.attributes.position)
      const maxCount = Math.max(...positions.map(pos => pos.count))
      const positionsArray = positions.map(position => {
        const originalArray = position.array
        const newArray = new Float32Array(maxCount * 3)

        for (let i = 0; i < maxCount; i++) {
          const i3 = i * 3
          if (i3 < originalArray.length) {
            newArray[i3 + 0] = originalArray[i3 + 0]
            newArray[i3 + 1] = originalArray[i3 + 1]
            newArray[i3 + 2] = originalArray[i3 + 2]
          } else {
            const randomIndex = Math.floor(position.count * Math.random()) * 3
            newArray[i3 + 0] = originalArray[randomIndex + 0]
            newArray[i3 + 1] = originalArray[randomIndex + 1]
            newArray[i3 + 2] = originalArray[randomIndex + 2]
          }
        }
        return new Float32BufferAttribute(newArray, 3)
      })

      const sizesArray = new Float32Array(maxCount).map(() => Math.random())

      const geometry = new BufferGeometry()
      geometry.setAttribute('position', positionsArray[0])
      geometry.setAttribute('aPositionTarget', positionsArray[3])
      geometry.setAttribute('aSize', new Float32BufferAttribute(sizesArray, 1))

      const material = new ShaderMaterial({
        vertexShader: particlesVertexShader,
        fragmentShader: particlesFragmentShader,
        uniforms: {
          uSize: { value: 0.4 },
          uResolution: { value: new Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio) },
          uProgress: { value: 0 },
          uColorA: { value: new Color('#67635f') },
          uColorB: { value: new Color('#dad7d3') }
        },
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })

      const points = new Points(geometry, material)
      points.frustumCulled = false
      scene.add(points)

      const newParticles = {
        index: 0,
        maxCount,
        positions: positionsArray,
        geometry,
        material,
        points,
        colorA: '#67635f',
        colorB: '#dad7d3',
        morph: (index) => {
          geometry.attributes.position = positionsArray[newParticles.index]
          geometry.attributes.aPositionTarget = positionsArray[index]
          gsap.fromTo(
            material.uniforms.uProgress,
            { value: 0 },
            { value: 1, duration: 6, ease: 'sine' }
          )
          newParticles.index = index
        }
      }

      setParticles(newParticles)

      gui.current.addColor(newParticles, 'colorA').onChange(() => {
        material.uniforms.uColorA.value.set(newParticles.colorA)
      })
      gui.current.addColor(newParticles, 'colorB').onChange(() => {
        material.uniforms.uColorB.value.set(newParticles.colorB)
      })
      gui.current.add(material.uniforms.uProgress, 'value').min(0).max(1).step(0.001).name('uProgress').listen()

      for (let i = 0; i < 4; i++) {
        gui.current.add(newParticles, `morph${i}`, () => newParticles.morph(i))
      }
    })
  }, [scene])

  useFrame(() => {
    if (controls.current) controls.current.update()
  })

  return (
    <>
      <orbitControls ref={controls} args={[camera, gl.domElement]} enableDamping />
    </>
  )
}

const App = () => {
  return (
    <Canvas>
      <Particles />
    </Canvas>
  )
}

export default App