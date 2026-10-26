import React from 'react';
import { realize, RealismDefs } from '../realism';

// מציג את החפץ מהסצנה כאייקון קטן (חיתוך של אותו ציור)
export default function ItemIcon({ item, size = 72 }) {
  const [x, y, w, h] = item.bbox;
  const pad = 8;
  return (
    <svg
      className="item-icon"
      width={size}
      height={size}
      viewBox={`${x - pad} ${y - pad} ${w + pad * 2} ${h + pad * 2}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <RealismDefs />
      <g filter="url(#rl-item)">{realize(item.draw())}</g>
    </svg>
  );
}
