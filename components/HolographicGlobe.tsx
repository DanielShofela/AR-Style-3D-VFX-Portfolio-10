import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Fix: The `ReactThreeFiber` namespace is deprecated in modern versions of @react-three/fiber.
// Replaced with `JSX.IntrinsicElements['shaderMaterial']` to correctly extend the base shader material
// props with custom uniforms, resolving the type errors.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      hologramMaterial: JSX.IntrinsicElements['shaderMaterial'] & { uTime?: number; uColor?: THREE.Color };
    }
  }
}

const HologramMaterial = shaderMaterial(
  // Uniforms
  { uTime: 0, uColor: new THREE.Color(0.0, 0.8, 1.0) },
  // Vertex Shader
  /*glsl*/`
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;

    // Simplex 3D noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      
      float displacement = snoise(position * 2.0 + uTime * 0.2) * 0.1;
      vec3 newPosition = position + normal * displacement;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // Fragment Shader
  /*glsl*/`
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColor;

    void main() {
      // Fresnel effect
      float fresnel = 1.0 - dot(normalize(vPosition), vNormal);
      fresnel = pow(fresnel, 2.5);

      // Scan lines
      float scanline = sin(vPosition.y * 30.0 + uTime * 5.0) * 0.1 + 0.95;

      // Glitch effect
      float glitch = sin(vPosition.y * 100.0 + uTime * 20.0) * cos(vPosition.x * 50.0 + uTime * 10.0) * 0.03;

      float alpha = fresnel * scanline + glitch;
      alpha = clamp(alpha, 0.1, 1.0);

      gl_FragColor = vec4(uColor, alpha);
    }
  `
);

extend({ HologramMaterial });

const HolographicGlobe: React.FC = () => {
  // Fix: Refactored to use the extended component and update uniforms via props.
  // Fix: Use a more precise type for the material ref.
  const materialRef = useRef<InstanceType<typeof HologramMaterial>>(null);

  useFrame((_, delta) => {
    if (materialRef.current) {
      // The `shaderMaterial` from drei makes uniforms accessible as properties.
      materialRef.current.uTime += delta;
    }
  });

  return (
    <mesh>
      <icosahedronGeometry args={[1.5, 20]} />
      {/* Fix: Use the extended <hologramMaterial /> component for better integration. */}
      <hologramMaterial
        ref={materialRef}
        attach="material"
        side={THREE.DoubleSide}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export default HolographicGlobe;