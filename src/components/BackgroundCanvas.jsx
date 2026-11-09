"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

/* ---- Floating particle field ---- */
function Particles({ count = 100, color }) {
  const mesh = useRef(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      sz[i] = Math.random() * 1.4 + 0.4;
    }
    return [pos, sz];
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    const pos = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const base = i * 3;
      pos[base + 1] = positions[base + 1] + Math.sin(t * 0.22 + i * 0.4) * 0.3;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = t * 0.015;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} count={count} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.38}
        depthWrite={false}
      />
    </points>
  );
}

/* ---- Soft floating geometry ---- */
function FloatingShapes({ darkMode }) {
  const group = useRef(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      child.position.y = child.userData.baseY + Math.sin(t * 0.28 + i * 1.2) * 0.35;
      child.rotation.x = t * (0.06 + i * 0.018);
      child.rotation.z = t * (0.04 + i * 0.012);
    });
  });

  const shapes = useMemo(
    () => [
      { pos: [-6, 2, -3], geo: "torus", color: darkMode ? "#7c3aed" : "#9d72ff", scale: 0.5 },
      { pos: [6, -2, -4], geo: "octahedron", color: darkMode ? "#00d4ff" : "#00a0c7", scale: 0.4 },
      { pos: [-4, -3, -2], geo: "ico", color: darkMode ? "#7c3aed" : "#9d72ff", scale: 0.3 },
      { pos: [5, 3, -5], geo: "torus", color: darkMode ? "#00d4ff" : "#00a0c7", scale: 0.38 },
    ],
    [darkMode],
  );

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.scale} userData={{ baseY: s.pos[1] }}>
          {s.geo === "torus" ? (
            <torusGeometry args={[1, 0.3, 12, 48]} />
          ) : s.geo === "octahedron" ? (
            <octahedronGeometry args={[1]} />
          ) : (
            <icosahedronGeometry args={[1]} />
          )}
          <meshStandardMaterial color={s.color} transparent opacity={darkMode ? 0.07 : 0.06} wireframe />
        </mesh>
      ))}
    </group>
  );
}

/* ---- Parallax camera rig ---- */
function ParallaxCamera() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.55 - camera.position.x) * 0.035;
    camera.position.y += (mouse.current.y * 0.35 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ---- Scroll parallax offset ---- */
function ScrollParallax() {
  const { camera } = useThree();

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      camera.position.z = 8 - progress * 1.8;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [camera]);

  return null;
}

/* ---- Main export ---- */
export default function BackgroundCanvas({ darkMode = true }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return null;

  const particleColor = darkMode ? "#00d4ff" : "#00a8c8";

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: false, alpha: true }} dpr={[1, 1.5]}>
        <ambientLight intensity={darkMode ? 0.5 : 0.8} />
        <pointLight position={[6, 6, 6]} color={darkMode ? "#00d4ff" : "#00a8c8"} intensity={darkMode ? 0.8 : 0.4} />
        <pointLight position={[-6, -4, -4]} color={darkMode ? "#7c3aed" : "#9d72ff"} intensity={darkMode ? 0.6 : 0.3} />
        <ParallaxCamera />
        <ScrollParallax />
        <Particles count={95} color={particleColor} />
        <FloatingShapes darkMode={darkMode} />
      </Canvas>
    </div>
  );
}
