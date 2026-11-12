"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function Bottle() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(time * 0.28) * 0.3 + time * 0.06;
    group.current.position.y = Math.sin(time * 0.55) * 0.06;
  });

  return (
    <group ref={group}>
      <mesh castShadow position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.78, 0.86, 2.35, 64]} />
        <meshPhysicalMaterial
          color="#EFE8DA"
          roughness={0.18}
          metalness={0.04}
          clearcoat={1}
          clearcoatRoughness={0.14}
          transmission={0.12}
          thickness={1.4}
        />
      </mesh>

      <mesh position={[0, -1.32, 0]}>
        <cylinderGeometry args={[0.68, 0.7, 0.08, 64]} />
        <meshStandardMaterial color="#DAD0BD" roughness={0.4} metalness={0.1} />
      </mesh>

      <mesh position={[0, 1.17, 0]}>
        <cylinderGeometry args={[0.33, 0.36, 0.42, 48]} />
        <meshStandardMaterial color="#C7A66A" roughness={0.28} metalness={0.82} />
      </mesh>

      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.06, 48]} />
        <meshStandardMaterial color="#E0C58D" roughness={0.22} metalness={0.9} />
      </mesh>

      <mesh position={[0, 0.18, 0.805]}>
        <planeGeometry args={[0.92, 0.64]} />
        <meshBasicMaterial color="#FAFAF6" />
      </mesh>

      <mesh position={[0, 0.4, 0.82]}>
        <boxGeometry args={[0.34, 0.012, 0.004]} />
        <meshBasicMaterial color="#153B2A" />
      </mesh>
      <mesh position={[0, 0.3, 0.82]}>
        <boxGeometry args={[0.5, 0.006, 0.004]} />
        <meshBasicMaterial color="#C7A66A" />
      </mesh>
      <mesh position={[0, 0.22, 0.82]}>
        <boxGeometry args={[0.42, 0.006, 0.004]} />
        <meshBasicMaterial color="#20251F" />
      </mesh>
      <mesh position={[0, 0.14, 0.82]}>
        <boxGeometry args={[0.52, 0.006, 0.004]} />
        <meshBasicMaterial color="#777777" />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <torusGeometry args={[1.18, 0.007, 12, 120]} />
        <meshBasicMaterial color="#C7A66A" transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[1.25, 0.35, 0.4]} position={[0, 0.15, 0]}>
        <torusGeometry args={[1.38, 0.004, 12, 120]} />
        <meshBasicMaterial color="#FAFAF6" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      shadows
      camera={{ position: [0, 0.15, 5.6], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[4, 6, 6]}
        intensity={2.4}
        castShadow
        color="#FFF6E3"
      />
      <directionalLight position={[-5, 2, -2]} intensity={0.9} color="#C7A66A" />
      <pointLight position={[0, -3, 2]} intensity={0.5} color="#4DA92C" />

      <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.55}>
        <Bottle />
      </Float>

      <Sparkles
        count={32}
        scale={[5.5, 5.5, 5.5]}
        size={1.3}
        speed={0.22}
        opacity={0.36}
        color="#C7A66A"
      />

      <ContactShadows
        position={[0, -1.72, 0]}
        opacity={0.4}
        scale={7}
        blur={2.8}
        far={3}
        color="#081A11"
      />
    </Canvas>
  );
}
