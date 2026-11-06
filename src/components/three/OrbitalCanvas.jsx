import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MathUtils } from 'three'

// Three related elliptical orbits, tightly composed around a faceted core.
const RINGS = [
  { radius: 1.54, rotation: [1.12, .18, -.24], color: '#849b6b' },
  { radius: 1.7, rotation: [.4, 1.04, .55], color: '#9aaa81' },
  { radius: 1.86, rotation: [1.02, -.48, -.58], color: '#c5ff55' },
]

function Sculpture({ interaction, onReady, onFailure }) {
  const tilt = useRef(null)
  const floating = useRef(null)
  const core = useRef(null)
  const orbits = useRef(null)
  const satellite = useRef(null)
  const phase = useRef(0)
  const { gl } = useThree()

  useEffect(() => {
    const canvas = gl.domElement
    const lost = event => { event.preventDefault(); onFailure() }
    canvas.addEventListener('webglcontextlost', lost)
    onReady()
    return () => canvas.removeEventListener('webglcontextlost', lost)
  }, [gl, onFailure, onReady])

  useFrame((_, delta) => {
    // Clamped deltas prevent resume jumps; refs keep updates out of React.
    const dt = Math.min(delta, .05)
    const target = interaction.current
    phase.current += dt * .12
    core.current.rotation.y += dt * .11
    core.current.rotation.z = -.08 + Math.sin(phase.current * .6) * .035
    orbits.current.rotation.z += dt * .025
    floating.current.position.y = Math.sin(phase.current * 1.4) * .035
    tilt.current.rotation.x = MathUtils.damp(tilt.current.rotation.x, target.y * .08, 4, dt)
    tilt.current.rotation.y = MathUtils.damp(tilt.current.rotation.y, target.x * .14, 4, dt)
    const scale = MathUtils.damp(tilt.current.scale.x, 1 + target.hover * .018, 4, dt)
    tilt.current.scale.setScalar(scale)
    satellite.current.position.set(Math.cos(phase.current) * 1.86, Math.sin(phase.current) * 1.86, 0)
  })

  return <group ref={tilt} position={[0, .08, 0]}>
    <group ref={floating}>
      <group ref={orbits} rotation={[.12, -.2, -.08]}>
        {RINGS.map((ring, index) => <group key={ring.radius} rotation={ring.rotation}>
          <group scale={[1, .82, 1]}>
            <mesh>
              <torusGeometry args={[ring.radius, index === 2 ? .011 : .009, 6, 96]} />
              <meshBasicMaterial color={ring.color} />
            </mesh>
            {index === 2 && <mesh ref={satellite} position={[ring.radius, 0, 0]}>
              <sphereGeometry args={[.032, 12, 8]} />
              <meshBasicMaterial color="#d4edaa" />
            </mesh>}
          </group>
        </group>)}
      </group>
      <group ref={core} rotation={[.1, .42, -.08]} scale={[.9, 1.25, .9]}>
        <mesh>
          <octahedronGeometry args={[1.04, 0]} />
          <meshStandardMaterial color="#242b2c" roughness={.52} metalness={.28} flatShading />
        </mesh>
        <mesh>
          <octahedronGeometry args={[1.044, 0]} />
          <meshBasicMaterial color="#b3dc70" wireframe />
        </mesh>
      </group>
    </group>
  </group>
}

export default function OrbitalCanvas({ running, interaction, onReady, onFailure }) {
  return <div className="orbital-canvas">
    <Canvas
      // The complete moving envelope is under radius 2.05; this framing keeps
      // it inside a square viewport at any orientation, including hover/float.
      camera={{ position: [0, 0, 7.2], fov: 36, near: .1, far: 30 }}
      dpr={[1, 1.5]}
      frameloop={running ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      fallback={null}
    >
      <ambientLight intensity={.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} color="#f4f2ed" />
      <directionalLight position={[-3, 1, -2]} intensity={.7} color="#a6bd87" />
      <Sculpture interaction={interaction} onReady={onReady} onFailure={onFailure} />
    </Canvas>
  </div>
}
