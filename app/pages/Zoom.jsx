import { Canvas } from "@react-three/fiber";
import { Sparkles, Environment } from "@react-three/drei";

export default function Zoom() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      className="absolute inset-0"
    >
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <Sparkles
        count={200}
        scale={12}
        size={2}
        speed={0.4}
        opacity={0.6}
        color="#22d3ee"
      />
      <Environment preset="city" />
    </Canvas>
  );
}
