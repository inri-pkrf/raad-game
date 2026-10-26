import React, { useId } from 'react';
import { realize, RealismDefs } from '../realism';

// מציג את החפץ מהסצנה כאייקון קטן (חיתוך של תמונת הצילום, או של הציור אם אין תמונה)
export default function ItemIcon({ item, size = 72 }) {
  const [x, y, w, h] = item.bbox;
  const pad = 8;
  const clipId = `clip-${useId().replace(/:/g, '')}`;
  return (
    <svg
      className="item-icon"
      width={size}
      height={size}
      viewBox={`${x - pad} ${y - pad} ${w + pad * 2} ${h + pad * 2}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {item.photo ? (
        // חיתוך של תמונת הצילום בדיוק לפי מסגרת החפץ
        <>
          <clipPath id={clipId}>
            <rect x={x} y={y} width={w} height={h} />
          </clipPath>
          <image
            href={item.photo}
            x="0"
            y="0"
            width="400"
            height="520"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
        </>
      ) : (
        <>
          <RealismDefs />
          <g filter="url(#rl-item)">{realize(item.draw())}</g>
        </>
      )}
    </svg>
  );
}
