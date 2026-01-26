import React from "react";
import { useGLTF } from "@react-three/drei";

export default function DNA(props) {
  const { nodes } = useGLTF("/dna.glb");

  return (
    <group {...props} dispose={null}>
      <group rotation={[-0.013, 0.235, 2.339]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.defaultMaterial.geometry}
            scale={1}
            castShadow={false}
            receiveShadow={false}
          >
            <meshPhysicalMaterial
              color="#06b6d4"
              metalness={0.9}
              roughness={0}
              clearcoat={1}
              clearcoatRoughness={0}
              emissive="#06b6d4"
              emissiveIntensity={0.2}
              transparent={true}
              opacity={0.25}
              depthWrite={false}
              thickness={0.5}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/dna.glb");
