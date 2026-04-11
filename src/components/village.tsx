"use client";

import { useRef, useState, useMemo, Suspense, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { BlurFade } from "@/components/ui/blur-fade";

// ─── Data ───────────────────────────────────────────────────────────────

interface Founder {
  name: string;
  building: string;
  avatar: string;
}

const founders: Founder[] = [
  { name: "Arjun Mehta", building: "AI-powered legal ops", avatar: "/pfp1.webp" },
  { name: "Priya Sharma", building: "Fintech for SMBs", avatar: "/pfp2.webp" },
  { name: "Rahul Dev", building: "Developer tooling", avatar: "/pfp3.webp" },
  { name: "Sneha Iyer", building: "Health-tech platform", avatar: "/pfp1.webp" },
  { name: "Karan Patel", building: "Logistics infra", avatar: "/pfp2.webp" },
  { name: "Diya Nair", building: "EdTech for Tier-2", avatar: "/pfp3.webp" },
  { name: "Vikram Rao", building: "Climate analytics", avatar: "/pfp1.webp" },
  { name: "Ananya Gupta", building: "Creator economy tools", avatar: "/pfp2.webp" },
  { name: "Rohan Joshi", building: "B2B SaaS", avatar: "/pfp3.webp" },
  { name: "Meera Krishnan", building: "Agri-supply chain", avatar: "/pfp1.webp" },
  { name: "Aditya Verma", building: "Cybersecurity SaaS", avatar: "/pfp2.webp" },
  { name: "Tara Bhat", building: "Social commerce", avatar: "/pfp3.webp" },
  { name: "Nikhil Sood", building: "Robotics startup", avatar: "/pfp1.webp" },
  { name: "Riya Kapoor", building: "Mental health app", avatar: "/pfp2.webp" },
  { name: "Siddharth Rao", building: "Web3 infra", avatar: "/pfp3.webp" },
  { name: "Kavya Reddy", building: "D2C brand platform", avatar: "/pfp1.webp" },
  { name: "Aman Singh", building: "Real estate tech", avatar: "/pfp2.webp" },
  { name: "Nandini Das", building: "HR automation", avatar: "/pfp3.webp" },
];

interface PlotData {
  position: [number, number, number];
  founder?: Founder;
  isEmpty?: boolean;
  scale?: number;
  rotation?: number;
}

const plots: PlotData[] = [
  // ── Cluster 1: Left island ──
  { position: [-6, 0, -2], founder: founders[0], scale: 0.9, rotation: 0.2 },
  { position: [-5, 0, -0.5], founder: founders[1], scale: 1.0, rotation: -0.3 },
  { position: [-7.2, 0, 0.5], founder: founders[2], scale: 0.85, rotation: 0.5 },
  { position: [-5.5, 0, 1.2], founder: founders[3], scale: 0.95, rotation: 0.1 },
  { position: [-4, 0, -1.5], founder: founders[4], scale: 0.8, rotation: -0.4 },
  { position: [-6.8, 0, -1], founder: founders[5], scale: 1.05, rotation: 0.7 },
  // ── Cluster 2: Right island ──
  { position: [5, 0, -1.5], founder: founders[6], scale: 0.95, rotation: -0.2 },
  { position: [6.5, 0, -0.5], founder: founders[7], scale: 1.0, rotation: 0.4 },
  { position: [4.5, 0, 0.5], founder: founders[8], scale: 0.85, rotation: -0.1 },
  { position: [6, 0, 1], founder: founders[9], scale: 0.9, rotation: 0.6 },
  { position: [7.5, 0, 0], founder: founders[10], scale: 0.8, rotation: -0.5 },
  { position: [5.5, 0, -2.5], founder: founders[11], scale: 1.0, rotation: 0.3 },
  // ── Cluster 3: Center-front island ──
  { position: [-0.5, 0, 2.5], founder: founders[12], scale: 1.0, rotation: 0.1 },
  { position: [1, 0, 3.5], founder: founders[13], scale: 0.9, rotation: -0.3 },
  { position: [-1.5, 0, 3.8], founder: founders[14], scale: 0.85, rotation: 0.4 },
  { position: [0.5, 0, 4.5], founder: founders[15], scale: 0.95, rotation: -0.6 },
  { position: [2, 0, 2.8], founder: founders[16], scale: 0.8, rotation: 0.2 },
  { position: [-2.5, 0, 2.8], founder: founders[17], scale: 1.05, rotation: -0.1 },
  // ── Empty plots ──
  { position: [-3.5, 0, 1.8], isEmpty: true, scale: 0.7 },
  { position: [8, 0, 1.5], isEmpty: true, scale: 0.7 },
  { position: [2.5, 0, 5], isEmpty: true, scale: 0.7 },
  { position: [-3, 0, 4.5], isEmpty: true, scale: 0.7 },
  { position: [3.5, 0, 1.5], isEmpty: true, scale: 0.7 },
];

// Trees — denser forest
const treePositions: { pos: [number, number, number]; scale: number; type: number }[] = [
  // Cluster 1 surroundings
  { pos: [-8, 0, -2.5], scale: 1.2, type: 0 },
  { pos: [-8.5, 0, 0], scale: 0.8, type: 1 },
  { pos: [-4.5, 0, -3], scale: 1.0, type: 0 },
  { pos: [-7.5, 0, 2], scale: 0.9, type: 1 },
  { pos: [-3.5, 0, -0.5], scale: 0.7, type: 2 },
  { pos: [-8, 0, 1.5], scale: 1.1, type: 0 },
  { pos: [-5, 0, 2.5], scale: 0.6, type: 2 },
  { pos: [-9, 0, -1], scale: 1.3, type: 0 },
  { pos: [-8.8, 0, -3.5], scale: 0.9, type: 1 },
  { pos: [-4, 0, 2], scale: 0.75, type: 2 },
  { pos: [-7, 0, -3.5], scale: 1.0, type: 1 },
  { pos: [-9.5, 0, 1], scale: 0.85, type: 0 },
  // Between clusters
  { pos: [-2, 0, -1], scale: 1.3, type: 0 },
  { pos: [-1, 0, 0.5], scale: 0.9, type: 1 },
  { pos: [0, 0, -0.5], scale: 1.0, type: 0 },
  { pos: [2, 0, 0], scale: 0.8, type: 1 },
  { pos: [3, 0, -1], scale: 1.1, type: 0 },
  { pos: [-1, 0, 1.5], scale: 0.7, type: 2 },
  { pos: [1.5, 0, 1], scale: 0.6, type: 2 },
  { pos: [-2.5, 0, -2.5], scale: 1.1, type: 0 },
  { pos: [0.5, 0, -1.8], scale: 0.85, type: 1 },
  { pos: [1, 0, -2.8], scale: 0.95, type: 0 },
  { pos: [-0.5, 0, -3], scale: 0.7, type: 2 },
  { pos: [2.5, 0, -2.5], scale: 1.0, type: 1 },
  // Cluster 2 surroundings
  { pos: [8.5, 0, -2], scale: 1.0, type: 0 },
  { pos: [9, 0, 1], scale: 0.9, type: 1 },
  { pos: [4, 0, -3], scale: 1.2, type: 0 },
  { pos: [7, 0, 2], scale: 0.8, type: 1 },
  { pos: [8.5, 0, 2.5], scale: 0.7, type: 2 },
  { pos: [9.5, 0, -0.5], scale: 1.1, type: 0 },
  { pos: [8, 0, -3.5], scale: 0.9, type: 1 },
  { pos: [9.5, 0, 2], scale: 0.75, type: 0 },
  { pos: [4.5, 0, 2.5], scale: 0.65, type: 2 },
  // Cluster 3 surroundings
  { pos: [-3.5, 0, 5], scale: 1.0, type: 0 },
  { pos: [3, 0, 5.5], scale: 0.9, type: 1 },
  { pos: [-4, 0, 3.5], scale: 0.8, type: 0 },
  { pos: [4, 0, 4], scale: 1.1, type: 1 },
  { pos: [0, 0, 6], scale: 0.7, type: 2 },
  { pos: [-2, 0, 5.5], scale: 0.6, type: 2 },
  { pos: [2.5, 0, 6], scale: 0.8, type: 0 },
  { pos: [-1, 0, 6.5], scale: 0.9, type: 1 },
  { pos: [1.5, 0, 5.8], scale: 0.75, type: 0 },
  { pos: [-3, 0, 6], scale: 0.65, type: 2 },
  { pos: [3.5, 0, 6.2], scale: 0.85, type: 1 },
  // Far edges — thick forest border
  { pos: [-10, 0, -3], scale: 1.4, type: 0 },
  { pos: [10, 0, -3], scale: 1.3, type: 0 },
  { pos: [-9, 0, 4], scale: 1.0, type: 1 },
  { pos: [9, 0, 4], scale: 1.1, type: 1 },
  { pos: [0, 0, 7.5], scale: 1.2, type: 0 },
  { pos: [-6, 0, 5], scale: 0.9, type: 0 },
  { pos: [7, 0, 5], scale: 1.0, type: 0 },
  { pos: [-11, 0, 0], scale: 1.5, type: 0 },
  { pos: [-10.5, 0, 2], scale: 1.2, type: 1 },
  { pos: [11, 0, 0], scale: 1.4, type: 0 },
  { pos: [10.5, 0, 2], scale: 1.1, type: 1 },
  { pos: [-7, 0, 6.5], scale: 1.0, type: 0 },
  { pos: [7, 0, 7], scale: 1.1, type: 0 },
  { pos: [0, 0, 8.5], scale: 1.3, type: 0 },
  { pos: [-5, 0, 7.5], scale: 0.9, type: 1 },
  { pos: [5, 0, 7.5], scale: 1.0, type: 1 },
  { pos: [-11, 0, -2], scale: 1.1, type: 1 },
  { pos: [11, 0, -2], scale: 1.0, type: 1 },
  { pos: [-10, 0, -4.5], scale: 1.3, type: 0 },
  { pos: [10, 0, -4.5], scale: 1.2, type: 0 },
  { pos: [0, 0, -4], scale: 1.1, type: 0 },
  { pos: [-3, 0, -4], scale: 0.9, type: 1 },
  { pos: [3, 0, -4], scale: 0.95, type: 1 },
];

// Street light positions
const streetLightPositions: [number, number, number][] = [
  [-3, 0, 0.7], [-1.5, 0, 1.3],
  [3, 0, 1], [4.2, 0, -0.3],
  [-1.5, 0, -1.8], [1, 0, -2.2], [3, 0, -2],
  [-5.5, 0, -0.8], [-6.5, 0, 0.8],
  [5.5, 0, -0.8], [7, 0, 0.8],
  [-0.8, 0, 3.2], [1.5, 0, 4],
];

// ─── Shared materials (reuse instead of creating per-mesh) ─────────────

const matTrunk = new THREE.MeshStandardMaterial({ color: "#3d2e1a", roughness: 0.9 });
const matCanopy = new THREE.MeshStandardMaterial({ color: "#243d1e", roughness: 0.8 });
const matCanopyHighlight = new THREE.MeshStandardMaterial({ color: "#2d4a25", roughness: 0.75, transparent: true, opacity: 0.7 });
const matPine1 = new THREE.MeshStandardMaterial({ color: "#1e3518", roughness: 0.8 });
const matPine2 = new THREE.MeshStandardMaterial({ color: "#284520", roughness: 0.8 });
const matBush1 = new THREE.MeshStandardMaterial({ color: "#22361c", roughness: 0.85 });
const matBush2 = new THREE.MeshStandardMaterial({ color: "#2a4220", roughness: 0.85 });
const matStone = new THREE.MeshStandardMaterial({ color: "#1c1c18", roughness: 0.95 });
const matWood = new THREE.MeshStandardMaterial({ color: "#2a1f14", roughness: 0.85 });
const matRoof = new THREE.MeshStandardMaterial({ color: "#1a1410", roughness: 0.8, metalness: 0.1 });
const matPole = new THREE.MeshStandardMaterial({ color: "#3a3020", metalness: 0.6, roughness: 0.4 });
const matLanternBox = new THREE.MeshStandardMaterial({ color: "#2a2015", metalness: 0.5, roughness: 0.5 });
const matLanternGlow = new THREE.MeshStandardMaterial({ color: "#d4af37", emissive: "#d4af37", emissiveIntensity: 5 });
const matPath = new THREE.MeshStandardMaterial({ color: "#2a2418", roughness: 0.85 });
const matPathEdge = new THREE.MeshStandardMaterial({ color: "#1e1a10", roughness: 0.9, transparent: true, opacity: 0.5 });
const matGround = new THREE.MeshStandardMaterial({ color: "#0c0b08", roughness: 0.95 });
const matIsland = new THREE.MeshStandardMaterial({ color: "#161410", roughness: 0.9 });
const matGrass = new THREE.MeshStandardMaterial({ color: "#1a2815", roughness: 0.9, transparent: true, opacity: 0.6 });
const matGroundGlow = new THREE.MeshStandardMaterial({ color: "#d4af37", transparent: true, opacity: 0.06 });
const matDoor = new THREE.MeshStandardMaterial({ color: "#8b7320", emissive: "#8b7320", emissiveIntensity: 0.5 });

// Window materials — static, no per-frame updates needed
const matWindowFront = new THREE.MeshStandardMaterial({ color: "#d4af37", emissive: "#d4af37", emissiveIntensity: 3, transparent: true, opacity: 0.95 });
const matWindowSide = new THREE.MeshStandardMaterial({ color: "#d4af37", emissive: "#d4af37", emissiveIntensity: 2.5, transparent: true, opacity: 0.9 });
const matWindowBack = new THREE.MeshStandardMaterial({ color: "#d4af37", emissive: "#d4af37", emissiveIntensity: 1.8, transparent: true, opacity: 0.8 });
const matWindowFrontHover = new THREE.MeshStandardMaterial({ color: "#d4af37", emissive: "#d4af37", emissiveIntensity: 6, transparent: true, opacity: 0.95 });
const matWindowSideHover = new THREE.MeshStandardMaterial({ color: "#d4af37", emissive: "#d4af37", emissiveIntensity: 5, transparent: true, opacity: 0.9 });
const matWindowBackHover = new THREE.MeshStandardMaterial({ color: "#d4af37", emissive: "#d4af37", emissiveIntensity: 4, transparent: true, opacity: 0.8 });

const matPlotRing = new THREE.MeshStandardMaterial({ color: "#333", transparent: true, opacity: 0.3 });
const matPlotRingHover = new THREE.MeshStandardMaterial({ color: "#d4af37", emissive: "#d4af37", emissiveIntensity: 0.5, transparent: true, opacity: 0.8 });
const matPlotPlus = new THREE.MeshStandardMaterial({ color: "#444", transparent: true, opacity: 0.5 });
const matPlotPlusHover = new THREE.MeshStandardMaterial({ color: "#d4af37", transparent: true, opacity: 0.5 });

// ─── Shared geometries ─────────────────────────────────────────────────

const geoSmallSphere = new THREE.SphereGeometry(1, 6, 5);
const geoCone = new THREE.ConeGeometry(1, 1, 4);
const geoBox = new THREE.BoxGeometry(1, 1, 1);
const geoPlane = new THREE.PlaneGeometry(1, 1);
const geoCylinder = new THREE.CylinderGeometry(1, 1, 1, 5);
const geoRing = new THREE.RingGeometry(0.25, 0.32, 12);
const geoCircle = new THREE.CircleGeometry(0.5, 10);
const geoLanternBulb = new THREE.SphereGeometry(0.025, 4, 4);

// ─── 3D Components ──────────────────────────────────────────────────────

function StreetLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 0.35, 0]} scale={[0.025, 0.7, 0.025]} material={matPole} geometry={geoCylinder} />
      {/* Arm */}
      <mesh position={[0.08, 0.68, 0]} rotation={[0, 0, Math.PI / 6]} scale={[0.015, 0.18, 0.015]} material={matPole} geometry={geoCylinder} />
      {/* Lantern housing */}
      <mesh position={[0.14, 0.72, 0]} scale={[0.06, 0.08, 0.06]} material={matLanternBox} geometry={geoBox} />
      {/* Lantern glow bulb */}
      <mesh position={[0.14, 0.72, 0]} material={matLanternGlow} geometry={geoLanternBulb} />
      {/* Ground glow circle — emissive, no real light */}
      <mesh position={[0.05, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} material={matGroundGlow} geometry={geoCircle} />
    </group>
  );
}

function VillageTree({ position, scale, type }: { position: [number, number, number]; scale: number; type: number }) {
  const trunkHeight = 0.3 * scale;
  const canopySize = type === 1 ? 0.4 * scale : 0.5 * scale;

  return (
    <group position={position}>
      <mesh position={[0, trunkHeight / 2, 0]} scale={[0.04 * scale, trunkHeight, 0.04 * scale]} material={matTrunk} geometry={geoCylinder} />
      {type === 0 ? (
        <>
          <mesh position={[0, trunkHeight + canopySize * 0.6, 0]} scale={[canopySize, canopySize, canopySize]} material={matCanopy} geometry={geoSmallSphere} />
          <mesh position={[0, trunkHeight + canopySize * 0.8, 0]} scale={[canopySize * 0.7, canopySize * 0.7, canopySize * 0.7]} material={matCanopyHighlight} geometry={geoSmallSphere} />
        </>
      ) : type === 1 ? (
        <>
          <mesh position={[0, trunkHeight + 0.15, 0]} scale={[canopySize * 0.8, canopySize * 1.6, canopySize * 0.8]} material={matPine1} geometry={geoCone} />
          <mesh position={[0, trunkHeight + canopySize * 1.2, 0]} scale={[canopySize * 0.5, canopySize, canopySize * 0.5]} material={matPine2} geometry={geoCone} />
        </>
      ) : (
        <>
          <mesh position={[0, 0.12 * scale, 0]} scale={[0.2 * scale, 0.2 * scale, 0.2 * scale]} material={matBush1} geometry={geoSmallSphere} />
          <mesh position={[0.08 * scale, 0.1 * scale, 0.05 * scale]} scale={[0.14 * scale, 0.14 * scale, 0.14 * scale]} material={matBush2} geometry={geoSmallSphere} />
        </>
      )}
    </group>
  );
}

function HouseModel({
  plot,
  onHover,
  onUnhover,
  isHovered,
}: {
  plot: PlotData;
  onHover: () => void;
  onUnhover: () => void;
  isHovered: boolean;
}) {
  const s = plot.scale || 1;

  if (plot.isEmpty) {
    return (
      <group position={plot.position}>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.02, 0]}
          onPointerEnter={(e) => { e.stopPropagation(); onHover(); }}
          onPointerLeave={onUnhover}
          material={isHovered ? matPlotRingHover : matPlotRing}
          geometry={geoRing}
        />
        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.02, 0.2, 1]} material={isHovered ? matPlotPlusHover : matPlotPlus} geometry={geoPlane} />
        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={[0.02, 0.2, 1]} material={isHovered ? matPlotPlusHover : matPlotPlus} geometry={geoPlane} />
        {isHovered && (
          <Html position={[0, 0.8, 0]} center style={{ pointerEvents: "none" }}>
            <div className="bg-[#0e0e0c]/95 backdrop-blur-xl border border-[#d4af37]/30 rounded-lg px-3 py-2 whitespace-nowrap shadow-2xl">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37]/80">
                Your plot?
              </span>
            </div>
          </Html>
        )}
      </group>
    );
  }

  return (
    <group
      position={plot.position}
      rotation={[0, plot.rotation || 0, 0]}
      onPointerEnter={(e) => { e.stopPropagation(); onHover(); }}
      onPointerLeave={onUnhover}
    >
      {/* Foundation */}
      <mesh position={[0, 0.05, 0]} scale={[0.7 * s, 0.1, 0.6 * s]} material={matStone} geometry={geoBox} />
      {/* Walls */}
      <mesh position={[0, 0.35 * s, 0]} scale={[0.6 * s, 0.5 * s, 0.5 * s]} material={matWood} geometry={geoBox} />
      {/* Roof */}
      <mesh position={[0, 0.7 * s, 0]} rotation={[0, Math.PI / 4, 0]} scale={[0.5 * s, 0.35 * s, 0.5 * s]} material={matRoof} geometry={geoCone} />
      {/* Chimney */}
      <mesh position={[0.15 * s, 0.85 * s, -0.1 * s]} scale={[0.08 * s, 0.25 * s, 0.08 * s]} material={matStone} geometry={geoBox} />

      {/* Windows — emissive only, NO point lights */}
      <mesh position={[0, 0.35 * s, 0.26 * s]} scale={[0.12 * s, 0.15 * s, 1]} material={isHovered ? matWindowFrontHover : matWindowFront} geometry={geoPlane} />
      <mesh position={[0.31 * s, 0.35 * s, 0]} rotation={[0, Math.PI / 2, 0]} scale={[0.1 * s, 0.12 * s, 1]} material={isHovered ? matWindowSideHover : matWindowSide} geometry={geoPlane} />
      <mesh position={[0, 0.35 * s, -0.26 * s]} rotation={[0, Math.PI, 0]} scale={[0.1 * s, 0.12 * s, 1]} material={isHovered ? matWindowBackHover : matWindowBack} geometry={geoPlane} />
      {/* Door */}
      <mesh position={[-0.12 * s, 0.18 * s, 0.26 * s]} scale={[0.1 * s, 0.22 * s, 1]} material={matDoor} geometry={geoPlane} />

      {/* Hover tooltip */}
      {isHovered && plot.founder && (
        <Html position={[0, 1.2 * s, 0]} center style={{ pointerEvents: "none" }}>
          <div className="bg-[#0e0e0c]/95 backdrop-blur-xl border border-[#d4af37]/20 rounded-xl px-4 py-3 min-w-[190px] shadow-2xl shadow-black/80 whitespace-nowrap">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#d4af37]/40 flex-shrink-0">
                <img
                  src={plot.founder.avatar}
                  alt={plot.founder.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">
                  {plot.founder.name}
                </p>
                <p className="text-[#d4af37]/60 text-[10px] font-bold tracking-[0.1em] uppercase mt-0.5">
                  Resident
                </p>
              </div>
            </div>
            <div className="border-t border-white/5 pt-2 mt-1">
              <p className="text-neutral-400 text-xs font-light">
                Building{" "}
                <span className="text-[#d4af37] font-medium">
                  {plot.founder.building}
                </span>
              </p>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Island({ position, radius }: { position: [number, number, number]; radius: number }) {
  const circleGeo = useMemo(() => new THREE.CircleGeometry(radius, 24), [radius]);
  const ringGeo = useMemo(() => new THREE.RingGeometry(radius - 0.3, radius + 0.15, 24), [radius]);
  return (
    <group>
      <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} material={matIsland} geometry={circleGeo} />
      <mesh position={[position[0], position[1] - 0.001, position[2]]} rotation={[-Math.PI / 2, 0, 0]} material={matGrass} geometry={ringGeo} />
    </group>
  );
}

function Path({ points, width = 0.18 }: { points: [number, number, number][]; width?: number }) {
  const tubeGeom = useMemo(() => {
    const pts = points.map((p) => new THREE.Vector3(...p));
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 24, width, 5, false);
  }, [points, width]);

  const edgeGeom = useMemo(() => {
    const pts = points.map((p) => new THREE.Vector3(...p));
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 24, width + 0.06, 5, false);
  }, [points, width]);

  return (
    <group>
      <mesh geometry={tubeGeom} material={matPath} />
      <mesh geometry={edgeGeom} material={matPathEdge} />
    </group>
  );
}

// Single useFrame for camera — no per-object frame callbacks
function AutoRotate() {
  const { camera } = useThree();
  const angle = useRef(0);

  useFrame((_, delta) => {
    angle.current += delta * 0.05;
    const radius = 14;
    const height = 10;
    camera.position.x = Math.sin(angle.current) * radius;
    camera.position.z = Math.cos(angle.current) * radius;
    camera.position.y = height;
    camera.lookAt(0, 0, 1.5);
  });

  return null;
}

// ─── Scene ──────────────────────────────────────────────────────────────

function VillageScene() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleHover = useCallback((i: number) => setHoveredIndex(i), []);
  const handleUnhover = useCallback(() => setHoveredIndex(null), []);

  return (
    <>
      {/* Lighting — only 4 lights total instead of ~49 */}
      <ambientLight intensity={0.4} color="#c8a878" />
      <directionalLight position={[5, 10, -3]} intensity={0.6} color="#ffeedd" />
      <directionalLight position={[-4, 8, 5]} intensity={0.25} color="#ffe0b0" />
      <hemisphereLight color="#ffd090" groundColor="#1a1208" intensity={0.3} />

      {/* 3 cluster point lights — one per village, replaces all individual house lights */}
      <pointLight position={[-5.8, 2, -0.5]} color="#ffcc66" intensity={8} distance={8} decay={2} />
      <pointLight position={[6, 2, -0.5]} color="#ffcc66" intensity={8} distance={8} decay={2} />
      <pointLight position={[0, 2, 3.8]} color="#ffcc66" intensity={8} distance={8} decay={2} />

      <fog attach="fog" args={["#060604", 12, 28]} />

      <AutoRotate />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} material={matGround}>
        <planeGeometry args={[40, 40]} />
      </mesh>

      {/* Islands */}
      <Island position={[-5.8, 0.01, -0.5]} radius={3.5} />
      <Island position={[6, 0.01, -0.5]} radius={3.5} />
      <Island position={[0, 0.01, 3.8]} radius={3.5} />

      {/* Paths */}
      <Path points={[[-4, 0.02, 1.5], [-3, 0.02, 1.2], [-2, 0.02, 1.5], [-1, 0.02, 1.8], [0, 0.02, 2.3]]} width={0.2} />
      <Path points={[[4, 0.02, 0.8], [3.2, 0.02, 1.2], [2.5, 0.02, 1.8], [2, 0.02, 2.5]]} width={0.2} />
      <Path points={[[-3.5, 0.02, -1.5], [-2, 0.02, -1.8], [-0.5, 0.02, -2.2], [1, 0.02, -2.3], [2.5, 0.02, -2.1], [4, 0.02, -1.8]]} width={0.22} />
      <Path points={[[-7, 0.02, -1.5], [-6, 0.02, -0.8], [-5.5, 0.02, 0], [-5.8, 0.02, 0.8]]} width={0.12} />
      <Path points={[[5, 0.02, -2], [5.8, 0.02, -1], [6.2, 0.02, 0], [6, 0.02, 0.8]]} width={0.12} />
      <Path points={[[-2, 0.02, 3], [-0.5, 0.02, 3.3], [0.8, 0.02, 3.8], [1.8, 0.02, 3.2]]} width={0.12} />

      {/* Street lights — visual only, no pointLight per lamp */}
      {streetLightPositions.map((pos, i) => (
        <StreetLight key={`sl-${i}`} position={pos} />
      ))}

      {/* Trees */}
      {treePositions.map((t, i) => (
        <VillageTree key={`t-${i}`} position={t.pos} scale={t.scale} type={t.type} />
      ))}

      {/* Houses */}
      {plots.map((plot, i) => (
        <HouseModel
          key={`h-${i}`}
          plot={plot}
          isHovered={hoveredIndex === i}
          onHover={() => handleHover(i)}
          onUnhover={handleUnhover}
        />
      ))}
    </>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────

export function Village() {
  const occupiedCount = plots.filter((p) => p.founder).length;
  const emptyCount = plots.filter((p) => p.isEmpty).length;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-[#060604]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-16">
        <BlurFade inView delay={0.1} direction="up">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase block mb-4">
              The Village
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4">
              Already inside the{" "}
              <span className="font-[family-name:var(--font-headline)] italic font-normal shiny-gold">
                civilisation.
              </span>
            </h2>
            <p className="text-neutral-400 text-base font-light max-w-lg mx-auto">
              Each glowing house is a founder. Hover to see who&apos;s building
              what. The village keeps growing.
            </p>
          </div>
        </BlurFade>

        <div className="relative w-full rounded-2xl overflow-hidden border border-white/5" style={{ height: "70vh", minHeight: 500 }}>
          <Canvas
            camera={{ position: [0, 10, 14], fov: 40 }}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            style={{ background: "#060604" }}
            gl={{ antialias: true, powerPreference: "high-performance" }}
          >
            <Suspense fallback={null}>
              <VillageScene />
            </Suspense>
          </Canvas>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060604] to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#060604] to-transparent" />
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#060604] to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#060604] to-transparent" />
          </div>
        </div>

        <BlurFade inView delay={0.3} direction="up">
          <div className="mt-12 flex items-center justify-center gap-8 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">{occupiedCount}</p>
              <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase mt-1">Houses claimed</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-2xl md:text-3xl font-bold shiny-gold tracking-tight">{emptyCount}</p>
              <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase mt-1">Plots remaining</p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
