import React from 'react';

// ממיר את הציורים הקיימים (צבעים פסטליים וקווי מתאר עבים) למראה ריאליסטי:
// פלטה טבעית ומעומעמת, קווי מתאר דקים וכהים, והארה וצל בעזרת מסנן SVG.
const MAP = {
  '#FFFFFF': '#E8ECEE', '#FFFDF8': '#D9DAD6', '#FFF6E8': '#D3CEC2', '#FFFBE3': '#EDE4BE', '#FFF6D6': '#F1E8C6',
  '#FFF2B8': '#CFC594', '#F0DFA0': '#B9AE7A', '#FFF0B8': '#CBC089', '#EFEAE2': '#CFCAC1',
  '#FFB3C1': '#7B8794', '#FF9DB0': '#66717D', '#FF8FA8': '#58626D', '#FFE3EA': '#26333F', '#FFC9DC': '#7B8794',
  '#FFD36E': '#CDAA5A', '#FFC24B': '#B98A33', '#EAB44F': '#7C5E2E',
  '#FF8A7A': '#A4573F', '#FF9A86': '#8E5A47',
  '#B98560': '#6E4F37', '#D9A06B': '#8E6643', '#F0B880': '#A7794C', '#BF8350': '#4F3624', '#A06E4A': '#5A3F2B',
  '#F5C28A': '#B58A5A', '#F5B97A': '#A8794A', '#FFD9A6': '#C9AA80', '#FFB899': '#7A5B48',
  '#8FD9B6': '#5E7F6E', '#7CCFA6': '#4F7A63', '#6FCB9F': '#46755A', '#5FB98A': '#3B6A4B', '#5CC48D': '#3B6A4B',
  '#BFEBD7': '#7E9A8C', '#D4F1DF': '#8FA89C',
  '#CFF0E0': '#9FBAC2', '#CBEFDF': '#9FBAC2', '#D6F2E4': '#A9C3CA', '#E3F6EC': '#BAC9CF', '#E4F5E9': '#B7BEC4',
  '#CDB8F0': '#6D7388', '#D9C8F5': '#7C8493', '#EADDFB': '#98A0AD',
  '#7A6454': '#24262B', '#8A7060': '#3A3B40', '#A6948A': '#7D7A76', '#B9A090': '#8C8A86', '#EADCC8': '#BDB7AA',
  '#FFD9C2': '#7D6E63', '#FFD9C0': '#B3A697', '#F6BE9C': '#8F8478', '#F9DCC8': '#7D6E63', '#F0C3A4': '#6C5E53',
  '#EAD9C2': '#BFBBB1', '#EBCDAA': '#8E8372', '#E9B985': '#6B573F', '#F4CFA2': '#7A5E43', '#FFE9D2': '#A39B8E',
  '#FFD9B5': '#8C8478', '#FFE3B8': '#A89C8A', '#F2D3B3': '#8E8373', '#FFDDC4': '#D6DEE4', '#FFF0C2': '#C3D4E2',
  '#F2E0C9': '#A09B92', '#E8CFB0': '#8A857C', '#C8E9B5': '#5A7A3F', '#A9D894': '#4D6E36', '#DDF3C9': '#6E8F52',
};
const INK = '#6B4F3A';

export function realize(node) {
  if (Array.isArray(node)) return node.map((n, i) => realize(React.isValidElement(n) && n.key == null ? React.cloneElement(n, { key: i }) : n));
  if (!React.isValidElement(node) || typeof node.type !== 'string') return node;
  const p = node.props;
  const over = {};
  const up = (v) => (typeof v === 'string' ? v.toUpperCase() : v);
  if (typeof p.fill === 'string' && MAP[up(p.fill)]) over.fill = MAP[up(p.fill)];
  if (typeof p.stroke === 'string') {
    if (up(p.stroke) === INK) {
      over.stroke = '#14100c';
      over.strokeOpacity = 0.55;
      over.strokeWidth = Math.max(0.8, (parseFloat(p.strokeWidth) || 2) * 0.42);
    } else if (MAP[up(p.stroke)]) {
      over.stroke = MAP[up(p.stroke)];
    }
  }
  const kids = p.children === undefined ? undefined : React.Children.map(p.children, (c) => realize(c));
  return kids === undefined ? React.cloneElement(node, over) : React.cloneElement(node, over, kids);
}

// הגדרות משותפות: מסנן הארה + צל, גרגר וגינון קצוות.
export function RealismDefs() {
  return (
    <defs>
      <filter id="rl-item" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2.4" result="bump" />
        <feSpecularLighting in="bump" surfaceScale="3" specularConstant="0.5" specularExponent="22" lightingColor="#ffffff" result="spec">
          <fePointLight x="70" y="-70" z="170" />
        </feSpecularLighting>
        <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
        <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k1="0" k2="1" k3="0.55" k4="0" result="lit" />
        <feDropShadow in="lit" dx="3" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
      </filter>
      <filter id="rl-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.9 0.9 0.9 0 -0.55" />
      </filter>
      <filter id="rl-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <radialGradient id="rl-vignette" cx="0.5" cy="0.48" r="0.75">
        <stop offset="0.55" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.55" />
      </radialGradient>
    </defs>
  );
}
