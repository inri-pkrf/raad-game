import React from 'react';
import { INK, Books } from './common';

export function Background() {
  const dots = Array.from({ length: 6 }).flatMap((_, r) =>
    Array.from({ length: 9 }).map((__, c) => (
      <circle key={`${r}-${c}`} cx={20 + c * 44 + (r % 2) * 22} cy={40 + r * 58} r="2.5" fill="#FFD9B5" />
    ))
  );
  return (
    <g>
      <rect width="400" height="520" fill="#FFE9D2" />
      {dots}
      <rect width="400" height="14" fill="#FFF6E8" />
      <rect y="385" width="400" height="135" fill="#F4CFA2" />
      <rect y="383" width="400" height="12" fill="#FFF6E8" stroke="#EBCDAA" />
      {[418, 452, 488].map((y) => (
        <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#E9B985" strokeWidth="2" />
      ))}
    </g>
  );
}

const sw = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' };
const sw2 = { stroke: INK, strokeWidth: 2.2, strokeLinejoin: 'round', strokeLinecap: 'round' };

export const items = [
  // ---------- חפצים מסוכנים ----------
  {
    id: 'bookcase',
    kind: 'hazard',
    label: 'ארון גבוה לא מעוגן',
    bbox: [14, 118, 96, 270],
    title: 'ארון גבוה שלא מעוגן',
    text: 'ארונות וספריות גבוהים וצרים נוטים להתהפך כשהרצפה רועדת, ועלולים ליפול על מי שנמצא לידם. קריסה של מדפים וחפצים כבדים היא אחת הסיבות העיקריות לפציעות ברעידת אדמה.',
    tip: 'מעגנים ארונות וספריות לקיר בעזרת זוויתנים או רצועות, ומניחים את החפצים הכבדים במדפים התחתונים.',
    draw: () => (
      <g>
        <rect x="16" y="120" width="92" height="265" rx="6" fill="#D9A06B" {...sw} />
        <rect x="24" y="128" width="76" height="249" rx="3" fill="#BF8350" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <Books x={27} y={130 + i * 50} h={38} count={4 + (i % 3)} offset={i * 2} />
            <rect x="24" y={168 + i * 50} width="76" height="8" fill="#D9A06B" stroke={INK} strokeWidth="1.8" />
          </g>
        ))}
      </g>
    ),
  },
  {
    id: 'window',
    kind: 'hazard',
    label: 'חלון זכוכית',
    bbox: [98, 80, 160, 132],
    title: 'חלון מזכוכית',
    text: 'זכוכית יכולה להיסדק ולהתנפץ בזמן רעידה, והשברים החדים מתפזרים לכל עבר וגורמים לחתכים קשים.',
    tip: 'מתרחקים מחלונות ומדלתות זכוכית, ונשארים רחוק מהם גם אחרי הרעידה עד שמנקים את השברים.',
    draw: () => (
      <g>
        <rect x="100" y="82" width="156" height="6" rx="3" fill="#B98560" {...sw2} />
        <rect x="128" y="92" width="100" height="116" rx="4" fill="#FFFFFF" {...sw} />
        <rect x="134" y="98" width="42" height="50" fill="#CFF0E0" />
        <rect x="180" y="98" width="42" height="50" fill="#CFF0E0" />
        <rect x="134" y="152" width="42" height="50" fill="#CFF0E0" />
        <rect x="180" y="152" width="42" height="50" fill="#CFF0E0" />
        <path d="M140 140 L158 106 M150 142 L162 120 M186 194 L206 160" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        <rect x="108" y="86" width="22" height="124" rx="7" fill="#FFB3C1" {...sw2} />
        <rect x="226" y="86" width="22" height="124" rx="7" fill="#FFB3C1" {...sw2} />
        <path d="M119 96 V200 M237 96 V200" stroke="#FF8FA8" strokeWidth="2.5" />
      </g>
    ),
  },
  {
    id: 'mirror',
    kind: 'hazard',
    label: 'מראה תלויה',
    bbox: [296, 82, 78, 116],
    title: 'מראה תלויה על הקיר',
    text: 'מראה גדולה עלולה להתנתק מהקיר ולהתנפץ על הרצפה לרסיסים חדים. גם מסגרות תמונה עם זכוכית מסוכנות מאותה סיבה.',
    tip: 'לא עומדים ולא יושבים מתחת למראות ולתמונות תלויות, ומתקינים אותן בעזרת וו חזק ויציב.',
    draw: () => (
      <g>
        <path d="M312 102 L335 86 L358 102" fill="none" {...sw2} />
        <circle cx="335" cy="86" r="3.5" fill={INK} />
        <rect x="300" y="100" width="70" height="95" rx="10" fill="#EAB44F" {...sw} />
        <rect x="308" y="108" width="54" height="79" rx="6" fill="#E3F6EC" stroke={INK} strokeWidth="2" />
        <path d="M318 170 L340 120 M332 176 L350 138" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'lamp',
    kind: 'hazard',
    label: 'מנורה תלויה',
    bbox: [144, 0, 62, 82],
    title: 'נברשת ותאורה תלויה',
    text: 'גוף תאורה שתלוי מהתקרה מתנדנד ברעידה, ועלול להתנתק ולרדת על הראש ועל הרצפה.',
    tip: 'מתרחקים מנברשות ומתאורה תלויה, ומתכסים מתחת לשולחן יציב.',
    draw: () => (
      <g>
        <line x1="175" y1="12" x2="175" y2="42" {...sw2} />
        <path d="M150 74 L161 42 L189 42 L200 74 Z" fill="#FFD36E" {...sw} />
        <ellipse cx="175" cy="74" rx="25" ry="5" fill="#FFF0B8" stroke={INK} strokeWidth="2.5" />
        <path d="M164 54 L168 68" stroke="#FFF6D6" strokeWidth="4" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'tv',
    kind: 'hazard',
    label: 'טלוויזיה על רגליים צרות',
    bbox: [284, 244, 104, 144],
    title: 'טלוויזיה על מעמד צר',
    text: 'מסך כבד שעומד על מעמד צר וגבוה יכול להחליק ולהתהפך קדימה, ולפגוע במי שיושב מולו.',
    tip: 'מקבעים את הטלוויזיה למעמד או לקיר בעזרת רצועות, ומציבים אותה רחוק ממקומות ישיבה ושינה.',
    draw: () => (
      <g>
        <rect x="298" y="326" width="6" height="59" fill="#B98560" {...sw2} />
        <rect x="368" y="326" width="6" height="59" fill="#B98560" {...sw2} />
        <rect x="292" y="318" width="88" height="9" rx="3" fill="#D9A06B" {...sw2} />
        <rect x="330" y="306" width="12" height="12" fill="#8A7060" {...sw2} />
        <rect x="290" y="248" width="92" height="60" rx="7" fill="#7A6454" {...sw} />
        <rect x="296" y="254" width="80" height="48" rx="3" fill="#FFE3EA" />
        <circle cx="316" cy="272" r="7" fill="#FFD36E" />
        <path d="M296 296 Q316 280 336 292 T376 284 V302 H296 Z" fill="#BFEBD7" />
      </g>
    ),
  },
  {
    id: 'shelf',
    kind: 'hazard',
    label: 'מדף עם חפצים כבדים',
    bbox: [12, 44, 100, 72],
    title: 'מדף גבוה עם חפצים כבדים',
    text: 'אגרטלים, ספרים וקישוטים שמונחים גבוה על מדף עלולים להישמט ולנחות על הראש בזמן הרעידה.',
    tip: 'חפצים כבדים ושבירים מניחים נמוך, ומקבעים את המדף לקיר היטב.',
    draw: () => (
      <g>
        <path d="M30 100 V114 L44 100" fill="#B98560" {...sw2} />
        <path d="M82 100 V114 L96 100" fill="#B98560" {...sw2} />
        <rect x="16" y="92" width="92" height="9" rx="2" fill="#B98560" {...sw2} />
        <path d="M44 92 C28 82 32 62 46 58 L60 58 C74 62 78 82 62 92 Z" fill="#FF8A7A" {...sw2} />
        <path d="M53 58 C49 46 44 44 40 40 M53 58 C54 46 60 42 64 38" fill="none" stroke="#5FB98A" strokeWidth="3" strokeLinecap="round" />
        <circle cx="40" cy="40" r="4" fill="#FFD36E" />
        <circle cx="64" cy="38" r="4" fill="#FFB3C1" />
        <rect x="78" y="84" width="28" height="8" rx="1.5" fill="#8FD9B6" {...sw2} />
        <rect x="80" y="76" width="24" height="8" rx="1.5" fill="#CDB8F0" {...sw2} />
        <rect x="82" y="68" width="20" height="8" rx="1.5" fill="#FFD36E" {...sw2} />
      </g>
    ),
  },
  {
    id: 'ac',
    kind: 'hazard',
    label: 'מזגן תלוי',
    bbox: [266, 16, 120, 50],
    title: 'מזגן על הקיר',
    text: 'מזגן הוא מכשיר כבד שתלוי גבוה על הקיר. אם הוא לא מקובע היטב, הוא עלול להתנתק ולהתרסק למטה.',
    tip: 'מוודאים שהמזגן מקובע לקיר היטב, ולא ישנים או יושבים ישירות מתחתיו.',
    draw: () => (
      <g>
        <rect x="270" y="20" width="112" height="40" rx="10" fill="#FFFDF8" {...sw} />
        <rect x="278" y="44" width="96" height="6" rx="3" fill="#EADCC8" />
        <path d="M280 30 H340" stroke="#EADCC8" strokeWidth="4" strokeLinecap="round" />
        <circle cx="366" cy="31" r="3.5" fill="#5FB98A" />
      </g>
    ),
  },

  // ---------- חפצים שאינם מסוכנים ----------
  {
    id: 'sofa',
    kind: 'safe',
    level: 0,
    label: 'ספה',
    bbox: [114, 298, 164, 92],
    text: 'ספה היא רהיט נמוך ויציב, והיא לא צפויה ליפול או להתנפץ.',
    draw: () => (
      <g>
        <rect x="130" y="302" width="130" height="48" rx="14" fill="#FFB3C1" {...sw} />
        <rect x="124" y="336" width="142" height="44" rx="10" fill="#FF9DB0" {...sw} />
        <rect x="118" y="324" width="20" height="58" rx="9" fill="#FFB3C1" {...sw} />
        <rect x="252" y="324" width="20" height="58" rx="9" fill="#FFB3C1" {...sw} />
        <path d="M195 340 V376" stroke={INK} strokeWidth="2" opacity="0.5" />
        <rect x="126" y="380" width="8" height="8" fill={INK} />
        <rect x="256" y="380" width="8" height="8" fill={INK} />
      </g>
    ),
  },
  {
    id: 'rug',
    kind: 'safe',
    level: 0,
    label: 'שטיח',
    bbox: [95, 435, 210, 56],
    text: 'שטיח שוכב על הרצפה ולכן אין לו לאן ליפול.',
    draw: () => (
      <g>
        <ellipse cx="200" cy="463" rx="105" ry="27" fill="#BFEBD7" {...sw2} />
        <ellipse cx="200" cy="463" rx="80" ry="19" fill="none" stroke="#8FD9B6" strokeWidth="4" />
        <ellipse cx="200" cy="463" rx="52" ry="11" fill="#FFF6E8" />
      </g>
    ),
  },
  {
    id: 'cushion',
    kind: 'safe',
    level: 0,
    label: 'כרית ישיבה',
    bbox: [30, 433, 44, 44],
    text: 'כרית רכה על הרצפה אינה מסוכנת בכלל.',
    draw: () => (
      <g>
        <circle cx="52" cy="455" r="20" fill="#FFB3C1" {...sw} />
        <circle cx="52" cy="455" r="3.5" fill={INK} />
        <path d="M52 455 L38 447 M52 455 L66 447 M52 455 L38 464 M52 455 L66 464" stroke={INK} strokeWidth="1.6" opacity="0.5" />
      </g>
    ),
  },
  {
    id: 'table',
    kind: 'safe',
    level: 1,
    label: 'שולחן קפה נמוך',
    bbox: [144, 392, 112, 34],
    text: 'שולחן נמוך ויציב לא יכול ליפול על אף אחד.',
    draw: () => (
      <g>
        <rect x="152" y="410" width="7" height="14" fill="#B98560" {...sw2} />
        <rect x="241" y="410" width="7" height="14" fill="#B98560" {...sw2} />
        <rect x="146" y="398" width="108" height="13" rx="4" fill="#D9A06B" {...sw2} />
        <rect x="186" y="388" width="14" height="10" rx="2" fill="#FFFFFF" {...sw2} />
      </g>
    ),
  },
  {
    id: 'plant',
    kind: 'safe',
    level: 1,
    label: 'עציץ קטן על הרצפה',
    bbox: [324, 404, 64, 70],
    text: 'עציץ קטן שעומד על הרצפה נמוך וקל, ולכן הוא לא מסוכן.',
    draw: () => (
      <g>
        <path d="M338 440 H374 L368 472 H344 Z" fill="#FF8A7A" {...sw2} />
        <path d="M356 440 C340 428 336 416 340 408 C350 412 356 424 356 440 Z" fill="#8FD9B6" {...sw2} />
        <path d="M356 440 C370 430 374 418 370 410 C360 414 356 426 356 440 Z" fill="#6FCB9F" {...sw2} />
      </g>
    ),
  },
  {
    id: 'basket',
    kind: 'safe',
    level: 2,
    label: 'סל צעצועים',
    bbox: [10, 480, 64, 38],
    text: 'סל צעצועים נמוך שעומד על הרצפה אינו מסוכן.',
    draw: () => (
      <g>
        <circle cx="46" cy="486" r="8" fill="#FFD36E" {...sw2} />
        <path d="M14 488 H70 L66 514 H18 Z" fill="#D9A06B" {...sw2} />
        <path d="M18 497 H66 M20 506 H64" stroke={INK} strokeWidth="1.6" opacity="0.5" />
      </g>
    ),
  },
];
