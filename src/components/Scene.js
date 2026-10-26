import React, { useState } from 'react';
import { realize, RealismDefs } from '../realism';

const DEBUG = typeof window !== 'undefined' && /[?&]debug=1/.test(window.location.search);

// photo: כתובת תמונת הצילום של הסצנה (או null - אז מוצג הציור). החפצים כבר מגיעים עם bbox במערכת 400x520.
export default function Scene({ env, items, photo, found, hintId, shakeId, onPick }) {
  const { Background } = env;
  const hasPhoto = !!photo;
  const [clickPos, setClickPos] = useState(null);

  const trackClick = (e) => {
    if (!DEBUG) return;
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    setClickPos(`x=${Math.round(p.x)} y=${Math.round(p.y)}`);
  };

  return (
    <svg
      className="scene"
      viewBox="0 0 400 520"
      preserveAspectRatio="xMidYMid meet"
      role="group"
      aria-label={`תמונת ${env.name}`}
      onPointerDown={trackClick}
    >
      <RealismDefs />
      {hasPhoto ? (
        <image href={photo} x="0" y="0" width="400" height="520" preserveAspectRatio="xMidYMid slice" />
      ) : (
        <Background />
      )}

      {items.map((item) => {
        const [x, y, w, h] = item.bbox;
        const isFound = found.includes(item.id);
        const cls = ['hs'];
        if (isFound) cls.push('found');
        if (shakeId === item.id) cls.push('shake');
        return (
          <g
            key={item.id}
            className={cls.join(' ')}
            role="button"
            tabIndex={isFound ? -1 : 0}
            aria-label={item.label}
            onClick={() => onPick(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPick(item);
              }
            }}
          >
            {!hasPhoto && (
              <g className="art" filter="url(#rl-item)">
                {realize(item.draw())}
              </g>
            )}
            <rect x={x} y={y} width={w} height={h} fill="transparent" />
            {hintId === item.id && (
              <rect className="hint-ring" x={x - 5} y={y - 5} width={w + 10} height={h + 10} rx="4" />
            )}
            {isFound && (
              <g className="found-mark">
                <rect className="found-ring" x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx="4" />
                <circle cx={x + w - 4} cy={y + 6} r="13" fill="#d9a441" stroke="#1a1610" strokeWidth="2.5" />
                <path
                  d={`M${x + w - 10} ${y + 6} l4.5 4.5 l8 -9`}
                  fill="none"
                  stroke="#1a1610"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}
            {DEBUG && (
              <g pointerEvents="none">
                <rect x={x} y={y} width={w} height={h} fill="none" stroke={item.kind === 'hazard' ? '#ff4040' : '#40c0ff'} strokeWidth="1" strokeDasharray="4 3" />
                <text x={x + 2} y={y + 10} fontSize="8" fill="#fff" stroke="#000" strokeWidth="0.4">
                  {item.id}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* אפקטים על כל התמונה: גרגר עדין והחשכת שוליים */}
      <rect width="400" height="520" filter="url(#rl-grain)" opacity="0.1" pointerEvents="none" />
      <rect width="400" height="520" fill="url(#rl-vignette)" pointerEvents="none" />

      {DEBUG && clickPos && (
        <text x="6" y="512" fontSize="11" fill="#ffe36b" stroke="#000" strokeWidth="0.6" pointerEvents="none">
          {clickPos}
        </text>
      )}
    </svg>
  );
}
