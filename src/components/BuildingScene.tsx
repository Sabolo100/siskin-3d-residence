import { Canvas, type ThreeEvent } from '@react-three/fiber'
import { ContactShadows, Html, OrbitControls, RoundedBox, Stars } from '@react-three/drei'
import { Suspense, useMemo, useState } from 'react'
import * as THREE from 'three'
import type { Apartment } from '../data'

type SceneProps = {
  apartments: Apartment[]
  selectedId: string | null
  onApartmentClick: (apartment: Apartment) => void
  night: boolean
  autoRotate: boolean
  sunHour: number
}

const FLOOR_HEIGHT = 0.64
const BASE_Y = 0.82

function Tree({ position, scale = 1, night }: { position: [number, number, number]; scale?: number; night: boolean }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.09, 0.64, 8]} />
        <meshStandardMaterial color={night ? '#584633' : '#80664a'} roughness={1} />
      </mesh>
      <mesh position={[0, 0.83, 0]} castShadow>
        <icosahedronGeometry args={[0.36, 1]} />
        <meshStandardMaterial color={night ? '#1d4036' : '#4b7454'} roughness={0.95} />
      </mesh>
      <mesh position={[0.18, 0.68, 0.03]} castShadow>
        <icosahedronGeometry args={[0.24, 1]} />
        <meshStandardMaterial color={night ? '#24493d' : '#6c8a5c'} roughness={0.95} />
      </mesh>
    </group>
  )
}

function Person({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position} scale={0.16}>
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color="#b88d6d" />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow>
        <capsuleGeometry args={[0.25, 0.75, 4, 10]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  )
}

function Landscape({ night }: { night: boolean }) {
  const trees = useMemo(
    () => [
      [-4.9, -2.8, 1.1], [-3.9, -3.6, 0.85], [-2.4, -3.9, 1.05], [0.0, -4.25, 0.9],
      [2.0, -4.0, 1.15], [4.5, -3.1, 1.0], [5.2, -0.8, 1.1], [4.8, 2.7, 0.9],
      [2.9, 3.8, 1.0], [0.2, 4.0, 0.85], [-2.0, 3.9, 1.2], [-4.6, 2.3, 0.95],
    ] as const,
    [],
  )

  return (
    <group>
      <RoundedBox args={[12.8, 0.26, 9.4]} radius={0.12} smoothness={8} position={[0, -0.22, 0]} receiveShadow>
        <meshStandardMaterial color={night ? '#1e302b' : '#71866e'} roughness={1} />
      </RoundedBox>
      <RoundedBox args={[10.4, 0.08, 1.25]} radius={0.035} smoothness={6} position={[0, -0.05, -3.35]} rotation={[0, -0.07, 0]} receiveShadow>
        <meshStandardMaterial color={night ? '#514f48' : '#c6c1b5'} roughness={0.95} />
      </RoundedBox>
      <RoundedBox args={[1.0, 0.075, 7.1]} radius={0.035} smoothness={6} position={[4.55, -0.045, 0.05]} rotation={[0, 0.2, 0]} receiveShadow>
        <meshStandardMaterial color={night ? '#514f48' : '#d0cabf'} roughness={0.95} />
      </RoundedBox>
      <mesh position={[-4.35, -0.06, -0.1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.35, 64]} />
        <meshStandardMaterial color={night ? '#1c545a' : '#8ab4b0'} roughness={0.55} metalness={0.05} />
      </mesh>
      <mesh position={[-4.35, -0.01, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.97, 1.08, 64]} />
        <meshStandardMaterial color={night ? '#a9d7c8' : '#edf0e7'} transparent opacity={0.75} />
      </mesh>
      {trees.map(([x, z, scale], index) => (
        <Tree key={index} position={[x, 0, z]} scale={scale} night={night} />
      ))}
      <Person position={[2.8, 0, -3.35]} color="#d7d143" />
      <Person position={[3.35, 0, -3.1]} color="#4f6158" />
      <Person position={[-3.25, 0, -3.4]} color="#b36e55" />
    </group>
  )
}

function GlassPanels({ width, depth, y, night }: { width: number; depth: number; y: number; night: boolean }) {
  const frontPanels = Math.max(5, Math.round(width * 1.35))
  return (
    <group>
      {Array.from({ length: frontPanels }).map((_, index) => {
        const segment = width / frontPanels
        const x = -width / 2 + segment / 2 + index * segment
        return (
          <mesh key={`f-${index}`} position={[x, y, depth / 2 + 0.012]} castShadow>
            <boxGeometry args={[segment * 0.78, 0.34, 0.025]} />
            <meshStandardMaterial
              color={night && index % 3 === 0 ? '#d8b778' : night ? '#263d3d' : '#354641'}
              emissive={night && index % 3 === 0 ? '#7b5520' : '#000000'}
              emissiveIntensity={night && index % 3 === 0 ? 0.8 : 0}
              metalness={0.42}
              roughness={0.24}
            />
          </mesh>
        )
      })}
      {Array.from({ length: 4 }).map((_, index) => {
        const segment = depth / 4
        const z = -depth / 2 + segment / 2 + index * segment
        return (
          <mesh key={`s-${index}`} position={[width / 2 + 0.012, y, z]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[segment * 0.72, 0.34, 0.025]} />
            <meshStandardMaterial color={night ? '#273f3e' : '#344540'} metalness={0.4} roughness={0.25} />
          </mesh>
        )
      })}
    </group>
  )
}

function Tower({
  position,
  floors,
  width,
  depth,
  night,
  compact = false,
}: {
  position: [number, number, number]
  floors: number
  width: number
  depth: number
  night: boolean
  compact?: boolean
}) {
  return (
    <group position={position}>
      <RoundedBox args={[width * 0.72, 0.66, depth * 0.74]} radius={0.22} smoothness={6} position={[0, 0.34, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={night ? '#0d1513' : '#15201c'} roughness={0.38} metalness={0.15} />
      </RoundedBox>
      {Array.from({ length: floors }).map((_, index) => {
        const upperSetback = index >= floors - 2 ? (index - (floors - 3)) * 0.17 : 0
        const wave = compact ? Math.sin(index * 0.85) * 0.08 : Math.sin(index * 0.72) * 0.12
        const floorWidth = width - upperSetback
        const floorDepth = depth - upperSetback * 0.65
        const y = BASE_Y + index * FLOOR_HEIGHT
        return (
          <group key={index} position={[wave, 0, 0]}>
            <RoundedBox args={[floorWidth, 0.47, floorDepth]} radius={0.18} smoothness={7} position={[0, y, 0]} castShadow receiveShadow>
              <meshBasicMaterial color={night ? '#101917' : '#19231f'} />
            </RoundedBox>
            <GlassPanels width={floorWidth} depth={floorDepth} y={y + 0.015} night={night} />
            <RoundedBox args={[floorWidth + 0.48, 0.105, floorDepth + 0.48]} radius={0.045} smoothness={7} position={[0, y + 0.275, 0]} castShadow>
              <meshStandardMaterial color={night ? '#dddcd3' : '#f5f4ee'} roughness={0.66} />
            </RoundedBox>
            <RoundedBox args={[floorWidth + 0.40, 0.07, floorDepth + 0.40]} radius={0.025} smoothness={7} position={[0, y - 0.28, 0]} castShadow>
              <meshStandardMaterial color={night ? '#c9c9c1' : '#ecebe4'} roughness={0.72} />
            </RoundedBox>
            <RoundedBox args={[floorWidth + 0.31, 0.23, floorDepth + 0.31]} radius={0.09} smoothness={7} position={[0, y + 0.13, 0]}>
              <meshPhysicalMaterial
                color="#9bc8c1"
                transparent
                opacity={night ? 0.12 : 0.17}
                roughness={0.1}
                metalness={0.08}
                depthWrite={false}
              />
            </RoundedBox>
          </group>
        )
      })}
      <RoundedBox
        args={[width * 0.58, 0.18, depth * 0.56]}
        radius={0.08}
        smoothness={7}
        position={[0, BASE_Y + floors * FLOOR_HEIGHT - 0.19, 0]}
        castShadow
      >
        <meshStandardMaterial color={night ? '#d9d8d0' : '#f5f4ee'} roughness={0.7} />
      </RoundedBox>
    </group>
  )
}

function ApartmentMarker({
  apartment,
  selected,
  onSelect,
}: {
  apartment: Apartment
  selected: boolean
  onSelect: (apartment: Apartment) => void
}) {
  const [hovered, setHovered] = useState(false)
  const y = BASE_Y + (apartment.floor - 1) * FLOOR_HEIGHT
  const x = apartment.side === 'left' ? -0.68 : 2.0

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onSelect(apartment)
  }

  return (
    <group position={[x, y, 1.73]}>
      <mesh
        onClick={handleClick}
        onPointerOver={(event) => {
          event.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <boxGeometry args={[2.35, 0.46, 0.08]} />
        <meshStandardMaterial
          color={apartment.accent}
          transparent
          opacity={selected ? 0.86 : hovered ? 0.58 : 0.045}
          emissive={apartment.accent}
          emissiveIntensity={selected ? 0.35 : hovered ? 0.18 : 0}
          depthWrite={false}
        />
      </mesh>
      {(hovered || selected) && (
        <Html position={[0, 0.54, 0]} center distanceFactor={8.5} occlude={false}>
          <div className={`scene-label ${selected ? 'is-selected' : ''}`}>
            <span>{apartment.name}</span>
            <strong>{apartment.area.toFixed(1).replace('.', ',')} mÂ˛</strong>
          </div>
        </Html>
      )}
    </group>
  )
}

function Residence({ apartments, selectedId, onApartmentClick, night }: Omit<SceneProps, 'autoRotate' | 'sunHour'>) {
  return (
    <group rotation={[0, -0.12, 0]}>
      <Landscape night={night} />
      <Tower position={[0.7, 0, 0.25]} floors={9} width={5.4} depth={3.15} night={night} />
      <Tower position={[-2.65, 0, 1.55]} floors={7} width={3.8} depth={2.45} night={night} compact />
      <group position={[0.7, 0, 0.25]}>
        {apartments.map((apartment) => (
          <ApartmentMarker
            key={apartment.id}
            apartment={apartment}
            selected={selectedId === apartment.id}
            onSelect={onApartmentClick}
          />
        ))}
      </group>
    </group>
  )
}

function SceneContent(props: SceneProps) {
  const sunAngle = ((props.sunHour - 6) / 14) * Math.PI
  const sunX = Math.cos(sunAngle) * 9
  const sunY = Math.max(2.6, Math.sin(sunAngle) * 10)

  return (
    <>
      <color attach="background" args={[props.night ? '#111c1a' : '#d8ddd8']} />
      <fog attach="fog" args={[props.night ? '#111c1a' : '#d8ddd8', 17, 31]} />
      <ambientLight intensity={props.night ? 0.32 : 0.46} color={props.night ? '#8fb2be' : '#ffffff'} />
      <hemisphereLight args={[props.night ? '#769aaa' : '#ecf3ef', props.night ? '#1b211d' : '#8a806c', props.night ? 0.48 : 0.62]} />
      <directionalLight
        castShadow
        position={[sunX, sunY, 6]}
        intensity={props.night ? 0.42 : 1.15}
        color={props.night ? '#a8c8dd' : props.sunHour > 17 ? '#ffd2a2' : '#fff5dd'}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
      />
      {props.night && <Stars radius={42} depth={18} count={850} factor={2.2} saturation={0.1} fade speed={0.25} />}
      <Suspense fallback={null}>
        <Residence
          apartments={props.apartments}
          selectedId={props.selectedId}
          onApartmentClick={props.onApartmentClick}
          night={props.night}
        />
      </Suspense>
      <ContactShadows
        position={[0, -0.085, 0]}
        opacity={props.night ? 0.48 : 0.3}
        scale={16}
        blur={2.5}
        far={8}
        color={props.night ? '#000000' : '#37413a'}
      />
      <OrbitControls
        makeDefault
        target={[0, 3.25, 0]}
        enablePan={false}
        enableDamping
        dampingFactor={0.055}
        minDistance={9.5}
        maxDistance={19}
        minPolarAngle={0.66}
        maxPolarAngle={1.42}
        autoRotate={props.autoRotate}
        autoRotateSpeed={0.42}
      />
    </>
  )
}

export default function BuildingScene(props: SceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.65]}
      camera={{ position: [10.6, 7.5, 12.8], fov: 33, near: 0.1, far: 70 }}
      gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: props.night ? 0.68 : 0.76 }}
    >
      <SceneContent {...props} />
    </Canvas>
  )
}




