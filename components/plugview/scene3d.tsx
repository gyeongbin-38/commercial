"use client";

import { useMemo, useRef, useSyncExternalStore, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

type Vec3 = [number, number, number];

const GRADIENT_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const GRADIENT_FRAGMENT = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.03 + vec2(11.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.05;

    vec2 q = vec2(
      fbm(uv * 1.8 + vec2(t, -t * 0.4)),
      fbm(uv * 1.8 + vec2(-t * 0.6, t * 0.5))
    );
    float n = fbm(uv * 2.4 + q * 1.6);

    vec3 base = vec3(0.040, 0.042, 0.055);
    vec3 mid = vec3(0.07, 0.12, 0.26);
    vec3 glow = vec3(0.10, 0.42, 0.95);

    vec3 col = mix(base, mid, smoothstep(0.3, 0.85, n));
    col = mix(col, glow * 0.5, smoothstep(0.62, 0.97, n));

    float d1 = distance(
      uv,
      vec2(0.68 + 0.06 * sin(t * 1.4), 0.44 + 0.08 * cos(t * 0.9))
    );
    col += glow * 0.15 * exp(-d1 * d1 * 6.0);

    float d2 = distance(
      uv,
      vec2(0.30 + 0.07 * cos(t * 0.8), 0.62 + 0.05 * sin(t * 1.1))
    );
    col += vec3(0.35, 0.6, 1.0) * 0.07 * exp(-d2 * d2 * 10.0);

    float vig = smoothstep(0.95, 0.25, distance(uv, vec2(0.5, 0.48)));
    col *= mix(0.5, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function GradientBackdrop() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, 0, -7]}>
      <planeGeometry args={[46, 27]} />
      <shaderMaterial
        ref={material}
        vertexShader={GRADIENT_VERTEX}
        fragmentShader={GRADIENT_FRAGMENT}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

const GLASS_PROPS = {
  transmission: 1,
  samples: 6,
  resolution: 512,
  thickness: 0.35,
  roughness: 0.07,
  ior: 1.45,
  chromaticAberration: 0.12,
  anisotropicBlur: 0.3,
  distortion: 0.2,
  distortionScale: 0.5,
  temporalDistortion: 0.1,
  attenuationColor: "#2b70ed",
  attenuationDistance: 3.5,
  color: "#eaf2ff",
} as const;

/* Panels riding the orbit ring: flat "asset sheets" alternating with cubes. */
const ORBIT_PANELS: { angle: number; size: Vec3; lift: number }[] = [
  { angle: 0.0, size: [1.7, 1.05, 0.06], lift: 0.15 },
  { angle: 0.63, size: [0.62, 0.62, 0.62], lift: -0.3 },
  { angle: 1.26, size: [1.35, 0.85, 0.06], lift: 0.4 },
  { angle: 1.88, size: [0.5, 0.5, 0.5], lift: -0.1 },
  { angle: 2.51, size: [1.9, 1.15, 0.06], lift: 0.3 },
  { angle: 3.14, size: [0.72, 0.72, 0.72], lift: -0.35 },
  { angle: 3.77, size: [1.4, 0.9, 0.06], lift: 0.2 },
  { angle: 4.4, size: [0.55, 0.55, 0.55], lift: -0.25 },
  { angle: 5.03, size: [1.6, 1.0, 0.06], lift: 0.35 },
  { angle: 5.65, size: [0.66, 0.66, 0.66], lift: -0.15 },
];
const ORBIT_RADIUS = 3.45;

function OrbitRing() {
  const ring = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.y += delta * 0.07;
  });

  return (
    <group rotation={[-0.42, 0, 0.08]}>
      <group ref={ring}>
        {ORBIT_PANELS.map((panel, i) => (
          <Float
            key={i}
            speed={0.9 + (i % 4) * 0.25}
            rotationIntensity={0.35}
            floatIntensity={0.8}
          >
            <RoundedBox
              args={panel.size}
              radius={Math.min(0.09, panel.size[0] * 0.08)}
              position={[
                Math.cos(panel.angle) * ORBIT_RADIUS,
                panel.lift,
                Math.sin(panel.angle) * ORBIT_RADIUS,
              ]}
              rotation={[
                (i % 3) * 0.14 - 0.14,
                -panel.angle + Math.PI / 2,
                (i % 2) * 0.16 - 0.08,
              ]}
            >
              <MeshTransmissionMaterial {...GLASS_PROPS} />
            </RoundedBox>
          </Float>
        ))}
      </group>
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh>
          <icosahedronGeometry args={[1.05, 48]} />
          <MeshDistortMaterial
            color="#145fe4"
            emissive="#0d49c9"
            emissiveIntensity={0.55}
            metalness={0.75}
            roughness={0.22}
            distort={0.38}
            speed={1.7}
          />
        </mesh>
      </Float>
      <pointLight color="#2b70ed" intensity={9} distance={8} decay={2} />
    </group>
  );
}

/* A few free-floating panels outside the ring for asymmetry. */
const FREE_PANELS: { position: Vec3; size: Vec3; rotation: Vec3 }[] = [
  { position: [-4.6, 1.7, -2.2], size: [1.5, 0.95, 0.06], rotation: [0.12, 0.5, -0.06] },
  { position: [5.0, -1.9, -1.2], size: [1.2, 0.78, 0.06], rotation: [-0.1, -0.45, 0.1] },
  { position: [-3.4, -2.4, -0.8], size: [0.85, 0.85, 0.85], rotation: [0.4, 0.3, 0.2] },
  { position: [5.4, 2.2, -2.6], size: [0.9, 0.9, 0.9], rotation: [0.2, 0.6, -0.3] },
];

function FreePanels() {
  return (
    <>
      {FREE_PANELS.map((panel, i) => (
        <Float
          key={i}
          speed={0.7 + i * 0.2}
          rotationIntensity={0.5}
          floatIntensity={1.2}
        >
          <RoundedBox
            args={panel.size}
            radius={0.07}
            position={panel.position}
            rotation={panel.rotation}
          >
            <MeshTransmissionMaterial {...GLASS_PROPS} />
          </RoundedBox>
        </Float>
      ))}
    </>
  );
}

function ParallaxRig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const targetY = state.pointer.x * 0.16 + Math.sin(t * 0.1) * 0.03;
    const targetX = -state.pointer.y * 0.1 + Math.cos(t * 0.12) * 0.02;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      2.2,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      2.2,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
}

function FieldLights() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer
        intensity={2.6}
        position={[0, 5, 3]}
        scale={[10, 2, 1]}
        color="#dbe9ff"
      />
      <Lightformer
        intensity={1.6}
        position={[-5, 0, 2]}
        rotation-y={Math.PI / 2}
        scale={[6, 2, 1]}
        color="#2b70ed"
      />
      <Lightformer
        intensity={1.0}
        position={[5, -2, 1]}
        rotation-y={-Math.PI / 2}
        scale={[5, 2, 1]}
        color="#70a7ff"
      />
    </Environment>
  );
}

function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(min-width: 1024px)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false
  );
}

export function HeroScene() {
  const reduce = useReducedMotion();
  const enabled = useIsDesktop();

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 9.5], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduce ? "never" : "always"}
      >
        <ParallaxRig>
          <GradientBackdrop />
          <group position={[1.4, 0.15, 0]}>
            <OrbitRing />
          </group>
          <FreePanels />
        </ParallaxRig>
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={0.9} color="#e6efff" />
        <FieldLights />
      </Canvas>
    </div>
  );
}

/* Small liquid-metal core used behind the contact section's glass form. */
export function LiquidCore() {
  const reduce = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.6], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduce ? "never" : "always"}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={1} color="#e6efff" />
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[1.4, 48]} />
          <MeshDistortMaterial
            color="#145fe4"
            emissive="#0d49c9"
            emissiveIntensity={0.45}
            metalness={0.8}
            roughness={0.18}
            distort={0.42}
            speed={1.9}
          />
        </mesh>
      </Float>
      <Environment resolution={128} frames={1}>
        <Lightformer
          intensity={3}
          position={[0, 4, 3]}
          scale={[8, 2, 1]}
          color="#dbe9ff"
        />
        <Lightformer
          intensity={1.6}
          position={[-4, 0, 2]}
          scale={[4, 3, 1]}
          color="#2b70ed"
        />
        <Lightformer
          intensity={1.1}
          position={[4, -2, 2]}
          scale={[4, 2, 1]}
          color="#70a7ff"
        />
      </Environment>
    </Canvas>
  );
}
