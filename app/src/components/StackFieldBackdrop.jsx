import React from 'react';

const devicon = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg`;

const solanaSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397 311" fill="none"><path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zM64.6 3.8C67 1.4 70.3 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1L333.1 73.8c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8zm267.8 117c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-63-62.7z" fill="%2314F195"/></svg>`;

const LEFT_TILES = [
  { name: 'Python', icon: devicon('python/python-original') },
  { name: 'PyTorch', icon: devicon('pytorch/pytorch-original') },
  { name: 'OpenCV', icon: devicon('opencv/opencv-original') },
  { name: 'Docker', icon: devicon('docker/docker-original') },
  { name: 'Solana', icon: solanaSvg },
  { name: 'Linux', icon: devicon('linux/linux-original') },
];

const RIGHT_TILES = [
  { name: 'FastAPI', icon: devicon('fastapi/fastapi-original') },
  { name: 'TypeScript', icon: devicon('typescript/typescript-original') },
  { name: 'C++', icon: devicon('cplusplus/cplusplus-original') },
  { name: 'React', icon: devicon('react/react-original') },
  { name: 'PostgreSQL', icon: devicon('postgresql/postgresql-original') },
  { name: 'Git', icon: devicon('git/git-original') },
];

export default function StackFieldBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="sagar-stackfield-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Left Flank Rail */}
      <div
        className="sagar-stack-rail sagar-stack-rail-left"
        style={{
          position: 'absolute',
          top: '12%',
          left: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {LEFT_TILES.map((tile, i) => (
          <div
            key={tile.name}
            className="sagar-stack-tile"
            style={{
              animationDelay: `${i * 0.4}s`,
            }}
            title={tile.name}
          >
            <img src={tile.icon} alt={tile.name} width={20} height={20} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Right Flank Rail */}
      <div
        className="sagar-stack-rail sagar-stack-rail-right"
        style={{
          position: 'absolute',
          top: '16%',
          right: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {RIGHT_TILES.map((tile, i) => (
          <div
            key={tile.name}
            className="sagar-stack-tile"
            style={{
              animationDelay: `${(i + 1) * 0.45}s`,
            }}
            title={tile.name}
          >
            <img src={tile.icon} alt={tile.name} width={20} height={20} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
