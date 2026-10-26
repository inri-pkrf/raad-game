import React from 'react';

// רקעים בסגנון ריאליסטי: תאורה, מעברי צבע, מרקמים ופרספקטיבה.
// שימו לב: קו הרצפה (y≈385-396) ונקודות הצבע תואמים למיקומי החפצים ב-home/office/outdoor.

export function HomeBg() {
  const seams = Array.from({ length: 9 }, (_, i) => i * 50);
  return (
    <g>
      <defs>
        <linearGradient id="h-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5f594f" />
          <stop offset="0.4" stopColor="#a39b8e" />
          <stop offset="1" stopColor="#857d71" />
        </linearGradient>
        <radialGradient id="h-glow" cx="0.42" cy="0.26" r="0.55">
          <stop offset="0" stopColor="#fff3d2" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff3d2" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="h-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6d4e36" />
          <stop offset="1" stopColor="#33231a" />
        </linearGradient>
        <linearGradient id="h-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8d2c6" />
          <stop offset="1" stopColor="#a39c8f" />
        </linearGradient>
        <filter id="h-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <rect width="400" height="520" fill="url(#h-wall)" />
      <rect width="400" height="520" fill="url(#h-glow)" />
      <rect width="400" height="16" fill="#d3cdc1" />
      <rect y="16" width="400" height="6" fill="#000" opacity="0.25" />
      <rect y="379" width="400" height="17" fill="url(#h-base)" />
      <rect y="396" width="400" height="124" fill="url(#h-floor)" />
      {seams.map((x) => (
        <line key={x} x1={x} y1="396" x2={200 + (x - 200) * 1.9} y2="520" stroke="#1d130c" strokeOpacity="0.45" strokeWidth="1.2" />
      ))}
      {[424, 456, 494].map((y, i) => (
        <path key={y} d={`M0 ${y} H400`} stroke="#1d130c" strokeOpacity="0.28" strokeWidth="1" strokeDasharray={`${70 + i * 18} ${40 + i * 10}`} />
      ))}
      <polygon points="110,396 300,396 400,520 40,520" fill="#ffe9bd" opacity="0.14" filter="url(#h-soft)" />
      <rect y="396" width="400" height="10" fill="#000" opacity="0.28" />
    </g>
  );
}

export function OfficeBg() {
  return (
    <g>
      <defs>
        <linearGradient id="o-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9aa2a9" />
          <stop offset="0.5" stopColor="#b9c0c6" />
          <stop offset="1" stopColor="#8c949b" />
        </linearGradient>
        <linearGradient id="o-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a4f57" />
          <stop offset="1" stopColor="#262930" />
        </linearGradient>
        <linearGradient id="o-ceil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9cac6" />
          <stop offset="1" stopColor="#9fa19d" />
        </linearGradient>
        <filter id="o-carpet" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.8 0.8 0.8 0 -0.35" />
        </filter>
      </defs>
      <rect width="400" height="520" fill="url(#o-wall)" />
      {[100, 200, 300].map((x) => (
        <rect key={x} x={x - 1} y="53" width="2" height="330" fill="#000" opacity="0.1" />
      ))}
      <rect width="400" height="50" fill="url(#o-ceil)" />
      {Array.from({ length: 8 }, (_, c) => (
        <line key={c} x1={c * 50} y1="0" x2={c * 50} y2="50" stroke="#6d6f6b" strokeOpacity="0.7" strokeWidth="1.5" />
      ))}
      <line x1="0" y1="25" x2="400" y2="25" stroke="#6d6f6b" strokeOpacity="0.7" strokeWidth="1.5" />
      <rect y="50" width="400" height="8" fill="#000" opacity="0.25" />
      <rect y="376" width="400" height="18" fill="#2b2e33" />
      <rect y="376" width="400" height="2" fill="#fff" opacity="0.2" />
      <rect y="394" width="400" height="126" fill="url(#o-floor)" />
      <rect y="394" width="400" height="126" filter="url(#o-carpet)" opacity="0.35" />
      <rect y="394" width="400" height="12" fill="#000" opacity="0.3" />
    </g>
  );
}

export function OutdoorBg() {
  return (
    <g>
      <defs>
        <linearGradient id="s-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5f8fc2" />
          <stop offset="0.6" stopColor="#a9c6dd" />
          <stop offset="1" stopColor="#dbe5ea" />
        </linearGradient>
        <radialGradient id="s-sun" cx="0.55" cy="0.12" r="0.45">
          <stop offset="0" stopColor="#fff7d6" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff7d6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="s-walk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8a399" />
          <stop offset="1" stopColor="#85807a" />
        </linearGradient>
        <linearGradient id="s-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5d7e42" />
          <stop offset="1" stopColor="#35502a" />
        </linearGradient>
        <filter id="s-cloud" x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="s-haze" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="1.3" />
        </filter>
        <filter id="s-turf" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7 0.35" numOctaves="3" seed="11" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.9 0.9 0.9 0 -0.4" />
        </filter>
      </defs>
      <rect width="400" height="520" fill="url(#s-sky)" />
      <rect width="400" height="400" fill="url(#s-sun)" />
      <g fill="#ffffff" opacity="0.7" filter="url(#s-cloud)">
        <ellipse cx="70" cy="58" rx="58" ry="14" />
        <ellipse cx="110" cy="46" rx="34" ry="12" />
        <ellipse cx="320" cy="92" rx="52" ry="12" />
        <ellipse cx="205" cy="30" rx="40" ry="8" />
      </g>
      <g fill="#7f93a4" opacity="0.55" filter="url(#s-haze)">
        <rect x="0" y="290" width="38" height="110" />
        <rect x="42" y="260" width="30" height="140" />
        <rect x="76" y="305" width="44" height="95" />
        <rect x="124" y="275" width="26" height="125" />
        <rect x="154" y="318" width="52" height="82" />
        <rect x="210" y="285" width="34" height="115" />
      </g>
      <rect y="398" width="400" height="44" fill="url(#s-walk)" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={i * 40} y1="406" x2={i * 40 - 6} y2="442" stroke="#000" strokeOpacity="0.18" strokeWidth="1.2" />
      ))}
      <rect y="398" width="400" height="8" fill="#6c6860" />
      <rect y="398" width="400" height="2" fill="#fff" opacity="0.25" />
      <rect y="442" width="400" height="78" fill="url(#s-grass)" />
      <rect y="442" width="400" height="78" filter="url(#s-turf)" opacity="0.55" />
      <rect y="442" width="400" height="6" fill="#000" opacity="0.28" />
    </g>
  );
}
