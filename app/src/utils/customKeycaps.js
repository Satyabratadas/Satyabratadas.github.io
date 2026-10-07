import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

/**
 * Custom 3D Keycap Geometries & Mapping
 * Replaces all 9 generic / Ojas skills with Satyabrata's authentic top skills:
 * 1. vue -> Python (Core Language & AI Systems)
 * 2. prettier -> PyTorch (Deep Learning & Computer Vision)
 * 3. wordpress -> OpenCV (Real-Time Vision & MediaPipe)
 * 4. vim -> Swift (Production iOS apps on App Store, 20K+ MAU)
 * 5. npm -> C++ (High-Performance CS & 178+ LeetCode)
 * 6. nginx -> FastAPI (Asynchronous Python Web APIs)
 * 7. firebase -> MediaPipe (40 FPS Iris & Face Tracking)
 * 8. vercel -> Grafana (Real-time Metrics & Telemetry)
 * 9. html -> SQL (Relational Databases & Architecture)
 */

export const REPLACED_KEY_MAP = {
  vue: 'python',
  prettier: 'pytorch',
  wordpress: 'opencv',
  vim: 'swift',
  npm: 'cpp',
  nginx: 'fastapi',
  firebase: 'mediapipe',
  vercel: 'grafana',
  html: 'sql',
};

// Reverse map: from skill name to physical spline key name
export const SKILL_TO_PHYSICAL_KEY = {
  python: 'vue',
  pytorch: 'prettier',
  opencv: 'wordpress',
  swift: 'vim',
  cpp: 'npm',
  fastapi: 'nginx',
  mediapipe: 'firebase',
  grafana: 'vercel',
  sql: 'html',
  // Original authentic keys
  js: 'js',
  ts: 'ts',
  react: 'react',
  reactnative: 'react',
  nodejs: 'nodejs',
  express: 'express',
  restapi: 'express',
  postgres: 'postgres',
  mysql: 'postgres',
  mongodb: 'mongodb',
  databases: 'postgres',
  docker: 'docker',
  linux: 'linux',
  git: 'git',
  cicd: 'github',
  github: 'github',
  aws: 'aws',
  gcp: 'aws',
  tailwind: 'tailwind',
  nextjs: 'nextjs',
  realtime: 'nextjs',
  websockets: 'html',
  etl: 'postgres',
  css: 'css',
  ios: 'vim',
  tensorflow: 'prettier',
  scikitlearn: 'vue',
  pandas: 'vue',
  llm: 'vue',
  rag: 'vue',
};

const SVG_ICONS = {
  python: `<svg viewBox="0 0 128 128">
    <path d="M63.5 6.4c-26.2 0-24.6 11.4-24.6 11.4l.05 11.8h25.2v3.6H28.2S10.5 31 10.5 57.3c0 26.3 15.5 25.4 15.5 25.4h9.2v-12.8s-.5-15.5 15.1-15.5h25.7s14.6.2 14.6-14.2V26.2s2.1-19.8-27.1-19.8zm-13.8 8.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8z"/>
    <path d="M64.5 121.6c26.2 0 24.6-11.4 24.6-11.4l-.05-11.8H63.9v-3.6h35.9s17.7 2.2 17.7-24.1c0-26.3-15.5-25.4-15.5-25.4h-9.2v12.8s.5 15.5-15.1 15.5H52.1s-14.6-.2-14.6 14.2v14s-2.1 19.8 27 19.8zm13.8-8.1a4.9 4.9 0 1 1 0-9.8 4.9 4.9 0 0 1 0 9.8z"/>
  </svg>`,

  pytorch: `<svg viewBox="0 0 128 128">
    <path d="M83.4 15.8a3 3 0 0 0-4.1.6L68 29.5a43.5 43.5 0 1 0 20.3 35.8c0-1.8-.1-3.6-.4-5.4l-7.3 7.3a34.8 34.8 0 1 1-13.7-29.2l6.8-6.9a43.6 43.6 0 0 0-18.7-4.2c-2.4 0-4.7.2-7 .6l8.8-8.8a3 3 0 0 0 .5-4l-3-3.6a3 3 0 0 0-4.2-.4l-24 24a3 3 0 0 0-.8 2.8 3 3 0 0 0 1.7 2.2 52.2 52.2 0 1 1 45.4 39.8c0 1.3-.1 2.6-.3 3.9l11.4-11.4a3 3 0 0 0 .8-2.6 3 3 0 0 0-1.7-2.3A52.4 52.4 0 0 0 92 41.5l8.6-8.7a3 3 0 0 0 .5-4l-17.7-13zm15.7 13.9a5.8 5.8 0 1 1 0-11.6 5.8 5.8 0 0 1 0 11.6z"/>
  </svg>`,

  opencv: `<svg viewBox="0 0 128 128">
    <path d="M64 12 A24 24 0 1 0 64 60 A24 24 0 1 0 64 12 Z M64 24 A12 12 0 1 1 64 48 A12 12 0 1 1 64 24 Z"/>
    <path d="M38 62 A24 24 0 1 0 38 110 A24 24 0 1 0 38 62 Z M38 74 A12 12 0 1 1 38 98 A12 12 0 1 1 38 74 Z"/>
    <path d="M90 62 A24 24 0 1 0 90 110 A24 24 0 1 0 90 62 Z M90 74 A12 12 0 1 1 90 98 A12 12 0 1 1 90 74 Z"/>
  </svg>`,

  swift: `<svg viewBox="0 0 128 128">
    <path d="M104 96C88 110 64 113 41 104c24-13 35-34 38-54-10 6-22 13-35 17 7-10 15-22 16-35-10 6-20 15-27 24 4-9 9-19 16-27C35 36 21 51 14 70c-1 3-3 9-2 12 1 2 4 4 6 3 11-3 21-10 31-18-12 13-25 25-41 35 6 3 14 5 21 5 27 0 51-15 64-37-2 6-5 12-9 17z"/>
  </svg>`,

  cpp: `<svg viewBox="0 0 128 128">
    <path d="M 52,28 C 30,28 14,44 14,64 C 14,84 30,100 52,100 C 62,100 70,96 76,88 L 64,76 C 60,82 56,84 52,84 C 41,84 30,75 30,64 C 30,53 41,44 52,44 C 56,44 60,46 64,52 L 76,40 C 70,32 62,28 52,28 Z"/>
    <path d="M 82,56 L 82,46 L 90,46 L 90,56 L 100,56 L 100,64 L 90,64 L 90,74 L 82,74 L 82,64 L 72,64 L 72,56 Z"/>
    <path d="M 106,56 L 106,46 L 114,46 L 114,56 L 124,56 L 124,64 L 114,64 L 114,74 L 106,74 L 106,64 L 96,64 L 96,56 Z"/>
  </svg>`,

  fastapi: `<svg viewBox="0 0 128 128">
    <path d="M72 16 L32 68 H62 L52 112 L96 56 H66 L72 16 Z"/>
  </svg>`,

  mediapipe: `<svg viewBox="0 0 128 128">
    <path d="M64 24 A 14 14 0 1 0 64 52 A 14 14 0 1 0 64 24 Z"/>
    <path d="M38 72 A 12 12 0 1 0 38 96 A 12 12 0 1 0 38 72 Z"/>
    <path d="M90 72 A 12 12 0 1 0 90 96 A 12 12 0 1 0 90 72 Z"/>
    <path d="M61 48 L35 76 L41 82 L67 54 Z"/>
    <path d="M67 48 L93 76 L87 82 L61 54 Z"/>
    <path d="M48 81 H80 V87 H48 Z"/>
  </svg>`,

  grafana: `<svg viewBox="0 0 128 128">
    <path d="M64 16 C38 16 16 38 16 64 C16 90 38 112 64 112 C80 112 94 104 102 92 L92 84 C86 92 76 98 64 98 C45 98 30 83 30 64 C30 45 45 30 64 30 C78 30 90 39 95 52 L108 48 C101 30 84 16 64 16 Z M64 44 C53 44 44 53 44 64 C44 75 53 84 64 84 C71 84 77 80 80 75 L70 69 C69 71 67 72 64 72 C60 72 56 68 56 64 C56 60 60 56 64 56 C67 56 70 58 71 61 L81 55 C78 48 72 44 64 44 Z"/>
  </svg>`,

  sql: `<svg viewBox="0 0 128 128">
    <path d="M 64,22 C 42,22 24,28 24,36 C 24,44 42,50 64,50 C 86,50 104,44 104,36 C 104,28 86,22 64,22 Z M 64,32 C 80,32 94,36 94,36 C 94,36 80,40 64,40 C 48,40 34,36 34,36 C 34,36 48,32 64,32 Z"/>
    <path d="M 24,44 L 24,58 C 24,66 42,72 64,72 C 86,72 104,66 104,58 L 104,44 C 94,52 80,56 64,56 C 48,56 34,52 24,44 Z"/>
    <path d="M 24,66 L 24,80 C 24,88 42,94 64,94 C 86,94 104,88 104,80 L 104,66 C 94,74 80,78 64,78 C 48,78 34,74 24,66 Z"/>
  </svg>`,
};

/**
 * Replaces the 3D keycaps in the Spline scene with Satyabrata's authentic top skills
 * by swapping each replaced key's legend geometry with a clean vector ShapeGeometry.
 * This guarantees 100% native lighting, shading, and material compatibility.
 */
export function applyAuthenticKeycaps(spline) {
  if (!spline || !spline._scene) return;

  const scene = spline._scene;
  const loader = new SVGLoader();

  Object.entries(REPLACED_KEY_MAP).forEach(([originalKeyName, skillName]) => {
    let keyLegend = null;

    scene.traverse((node) => {
      if (node.name === originalKeyName) {
        node.traverse((child) => {
          if (child.name === 'legend' || child.name === `legend-${skillName}`) {
            keyLegend = child;
          }
        });
      }
    });

    if (keyLegend && SVG_ICONS[skillName]) {
      try {
        const svgData = loader.parse(SVG_ICONS[skillName]);
        const shapes = [];
        svgData.paths.forEach((p) => {
          if (typeof p.toShapes === 'function') {
            shapes.push(...p.toShapes(true));
          } else {
            shapes.push(...SVGLoader.createShapes(p));
          }
        });

        if (shapes.length > 0) {
          const geom = new THREE.ShapeGeometry(shapes);
          geom.computeBoundingBox();
          const bb = geom.boundingBox;
          const cx = (bb.max.x + bb.min.x) / 2;
          const cy = (bb.max.y + bb.min.y) / 2;
          geom.translate(-cx, -cy, 0);

          const sizeX = bb.max.x - bb.min.x;
          const sizeY = bb.max.y - bb.min.y;
          const maxDim = Math.max(sizeX, sizeY);
          const targetSize = 145;
          const scale = targetSize / maxDim;
          geom.scale(scale, -scale, scale);
          geom.translate(0, 0, 1.8);
          geom.computeVertexNormals();

          if (keyLegend.material) {
            keyLegend.material.side = THREE.DoubleSide;
          }

          if (keyLegend.geometry) {
            keyLegend.geometry.dispose();
          }
          keyLegend.geometry = geom;
          keyLegend.visible = true;
          keyLegend.name = `legend-${skillName}`;
        }
      } catch (err) {
        console.warn(`Failed to generate 3D keycap shape for ${skillName}:`, err);
      }
    }
  });
}
