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
              color="#06b6d4" // Solid Cyan
              metalness={0.4}
              roughness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.1}
              emissive="#0891b2"
              emissiveIntensity={1.2} // Brighter emissive
              transparent={false} // Make it solid
              opacity={1}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/dna.glb");
