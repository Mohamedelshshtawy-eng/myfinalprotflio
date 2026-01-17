import React from "react";
import { useGLTF } from "@react-three/drei";

export default function DNA(props) {
  const { nodes } = useGLTF("/dna.glb");

  return (
    <group {...props} dispose={null}>
      <group rotation={[-0.013, 0.235, 2.339]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial.geometry} scale={1}>
            <meshPhysicalMaterial
              color="#22d3ee" // Cyan glow
              metalness={0.2}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.1}
              emissive="#06b6d4"
              emissiveIntensity={0.6}
              transparent
              opacity={0.25} // More transparent
              transmission={0.6} // glass-like
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/dna.glb");
