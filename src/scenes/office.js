import React from 'react';
import { INK, Books } from './common';

export function Background() {
  const tiles = [];
  for (let c = 0; c < 8; c += 1) {
    tiles.push(<line key={`v${c}`} x1={c * 50} y1="0" x2={c * 50} y2="50" stroke="#EAD9C2" strokeWidth="2" />);
  }
  return (
    <g>
      <rect width="400" height="520" fill="#E4F5E9" />
      <rect width="400" height="50" fill="#FFF6E8" />
      {tiles}
      <line x1="0" y1="25" x2="400" y2="25" stroke="#EAD9C2" strokeWidth="2" />
      <rect y="48" width="400" height="5" fill="#EAD9C2" />
      <rect y="385" width="400" height="135" fill="#F9DCC8" />
      <rect y="383" width="400" height="10" fill="#FFF6E8" stroke="#EBCDAA" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i} x1={i * 60} y1="393" x2={i * 60 - 40} y2="520" stroke="#F0C3A4" strokeWidth="2" />
      ))}
      <line x1="0" y1="450" x2="400" y2="450" stroke="#F0C3A4" strokeWidth="2" />
    </g>
  );
}

const sw = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' };
const sw2 = { stroke: INK, strokeWidth: 2.2, strokeLinejoin: 'round', strokeLinecap: 'round' };

export const items = [
  // ---------- חפצים מסוכנים ----------
  {
    id: 'ceilinglight',
    kind: 'hazard',
    label: 'תאורה ואריחי תקרה',
    bbox: [104, 6, 192, 46],
    title: 'תאורה ואריחי תקרה',
    text: 'גופי תאורה ואריחי תקרה אקוסטיים עלולים להתנתק ולרדת מלמעלה, גם בלי שהמבנה ניזוק.',
    tip: 'מתכסים מתחת לשולחן יציב כדי שהתקרה והתאורה לא יפגעו בראש.',
    draw: () => (
      <g>
        <rect x="110" y="12" width="180" height="32" rx="5" fill="#FFF2B8" {...sw} />
        <rect x="118" y="18" width="164" height="20" rx="3" fill="#FFFBE3" />
        <path d="M200 18 V38 M240 18 V38 M160 18 V38" stroke="#F0DFA0" strokeWidth="2" />
      </g>
    ),
  },
  {
    id: 'filecabinet',
    kind: 'hazard',
    label: 'ארון תיוק גבוה',
    bbox: [14, 118, 100, 270],
    title: 'ארון תיוק גבוה',
    text: 'ארון צר וגבוה נוטה להתהפך. כשמגירות נפתחות בזמן הרעידה הוא נהיה עוד פחות יציב ועלול ליפול קדימה.',
    tip: 'מעגנים ארונות גבוהים לקיר, והדבר החשוב ביותר: לא עובדים או יושבים ליד ארון שלא מעוגן.',
    draw: () => (
      <g>
        <rect x="16" y="122" width="92" height="263" rx="6" fill="#D9C8F5" {...sw} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x="24" y={130 + i * 50} width="76" height="42" rx="4" fill="#EADDFB" stroke={INK} strokeWidth="2" />
            <rect x="52" y={146 + i * 50} width="20" height="6" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.8" />
          </g>
        ))}
        <path d="M30 122 L36 106 L50 122 M70 122 L80 110 L92 122" fill="#FFFFFF" {...sw2} />
      </g>
    ),
  },
  {
    id: 'shelfboxes',
    kind: 'hazard',
    label: 'קופסאות על מדף גבוה',
    bbox: [120, 58, 150, 56],
    title: 'קופסאות כבדות על מדף גבוה',
    text: 'קופסאות וציוד שמאוחסנים גבוה על מדף עלולים להישמט ולהיפול על העובדים שמתחתיו.',
    tip: 'מאחסנים חפצים כבדים במדפים תחתונים, ומקבעים את המדפים לקיר.',
    draw: () => (
      <g>
        <rect x="124" y="108" width="142" height="8" rx="2" fill="#B98560" {...sw2} />
        <rect x="130" y="76" width="44" height="32" rx="3" fill="#F5C28A" {...sw2} />
        <path d="M140 76 V86 H164 V76" fill="none" stroke={INK} strokeWidth="1.8" />
        <rect x="178" y="84" width="38" height="24" rx="3" fill="#FFD9A6" {...sw2} />
        <rect x="190" y="62" width="36" height="22" rx="3" fill="#F5C28A" {...sw2} />
        <Books x={226} y={78} h={30} count={4} offset={2} />
      </g>
    ),
  },
  {
    id: 'wallscreen',
    kind: 'hazard',
    label: 'מסך תלוי על הקיר',
    bbox: [136, 128, 128, 82],
    title: 'מסך תלוי על הקיר',
    text: 'מסך גדול שתלוי גבוה הוא כבד. אם התלייה לא חזקה מספיק הוא עלול ליפול ולהתנפץ.',
    tip: 'תולים מסכים בעזרת מתקן הרכבה יציב, ולא יושבים ישירות מתחתיהם.',
    draw: () => (
      <g>
        <rect x="140" y="132" width="120" height="68" rx="6" fill="#7A6454" {...sw} />
        <rect x="146" y="138" width="108" height="56" rx="3" fill="#FFF6E8" />
        <path d="M154 184 L172 164 L190 176 L214 150 L246 170" fill="none" stroke="#FF8A7A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="172" cy="164" r="3.5" fill="#FF8A7A" />
        <circle cx="214" cy="150" r="3.5" fill="#FF8A7A" />
        <path d="M184 200 V206 H216 V200" fill="#8A7060" {...sw2} />
      </g>
    ),
  },
  {
    id: 'glasswall',
    kind: 'hazard',
    label: 'מחיצת זכוכית',
    bbox: [270, 74, 120, 200],
    title: 'מחיצת זכוכית',
    text: 'קיר זכוכית במשרד עלול להישבר ולהתפזר לשברים גדולים וחדים.',
    tip: 'מתרחקים ממחיצות זכוכית ומחלונות, וממשיכים להיזהר מהם גם אחרי שהרעידה נגמרה.',
    draw: () => (
      <g>
        <rect x="278" y="80" width="106" height="190" rx="4" fill="#D6F2E4" {...sw} />
        <path d="M331 80 V270 M278 175 H384" stroke={INK} strokeWidth="2.5" />
        <path d="M292 120 L316 90 M296 150 L324 112 M342 250 L372 206 M352 118 L372 98" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
        <rect x="274" y="266" width="114" height="8" rx="3" fill="#CDB8F0" {...sw2} />
      </g>
    ),
  },
  {
    id: 'watercooler',
    kind: 'hazard',
    label: 'מתקן מים עם בקבוק',
    bbox: [328, 278, 58, 110],
    title: 'מתקן מים עם בקבוק כבד',
    text: 'מתקן מים גבוה וצר עם בקבוק כבד עלול להתהפך. המים יכולים להציף את הרצפה ולהיות מסוכנים כשיש לידם חשמל.',
    tip: 'מציבים מתקן כזה צמוד לקיר ומקבעים אותו, ומתרחקים ממנו בזמן רעידה.',
    draw: () => (
      <g>
        <path d="M344 282 H368 V288 H372 V324 H340 V288 H344 Z" fill="#CBEFDF" {...sw2} />
        <path d="M344 300 H368" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        <rect x="334" y="324" width="46" height="62" rx="6" fill="#FFFDF8" {...sw} />
        <circle cx="350" cy="342" r="4.5" fill="#FF8A7A" stroke={INK} strokeWidth="1.5" />
        <circle cx="364" cy="342" r="4.5" fill="#8FD9B6" stroke={INK} strokeWidth="1.5" />
        <rect x="346" y="356" width="22" height="8" rx="2" fill="#EADCC8" />
      </g>
    ),
  },

  // ---------- חפצים שאינם מסוכנים / מקומות מחסה ----------
  {
    id: 'desk',
    kind: 'safe',
    level: 0,
    label: 'שולחן עבודה יציב',
    bbox: [120, 300, 176, 90],
    text: 'ההפך מסכנה: שולחן יציב הוא מקום מחסה טוב. מתכופפים מתחתיו, מגנים על הראש והצוואר ומחזיקים ברגל השולחן.',
    draw: () => (
      <g>
        <rect x="128" y="326" width="10" height="60" fill="#D9A06B" {...sw2} />
        <rect x="278" y="326" width="10" height="60" fill="#D9A06B" {...sw2} />
        <rect x="122" y="312" width="172" height="16" rx="5" fill="#F0B880" {...sw} />
        <path d="M138 345 H278" stroke={INK} strokeWidth="1.5" strokeDasharray="4 6" opacity="0.35" />
      </g>
    ),
  },
  {
    id: 'rug',
    kind: 'safe',
    level: 0,
    label: 'שטיח',
    bbox: [95, 425, 210, 62],
    text: 'שטיח שוכב על הרצפה ולכן אין לו לאן ליפול.',
    draw: () => (
      <g>
        <rect x="100" y="432" width="200" height="50" rx="14" fill="#FFD9C2" {...sw2} />
        <rect x="112" y="442" width="176" height="30" rx="8" fill="none" stroke="#FFB899" strokeWidth="4" />
      </g>
    ),
  },
  {
    id: 'plant',
    kind: 'safe',
    level: 0,
    label: 'עציץ קטן',
    bbox: [24, 424, 52, 62],
    text: 'עציץ קטן ונמוך שעומד על הרצפה לא מסוכן.',
    draw: () => (
      <g>
        <path d="M32 462 H62 L58 486 H36 Z" fill="#FF8A7A" {...sw2} />
        <path d="M47 462 C34 452 32 440 36 432 C44 436 47 448 47 462 Z" fill="#8FD9B6" {...sw2} />
        <path d="M47 462 C60 454 64 442 60 434 C52 438 47 450 47 462 Z" fill="#6FCB9F" {...sw2} />
      </g>
    ),
  },
  {
    id: 'chair',
    kind: 'safe',
    level: 1,
    label: 'כיסא משרדי',
    bbox: [186, 334, 70, 66],
    text: 'כיסא משרדי נמוך, ובדרך כלל לא נופל על אף אחד. כדאי רק לא לשבת עליו בזמן הרעידה, כי הוא על גלגלים.',
    draw: () => (
      <g>
        <rect x="192" y="336" width="48" height="26" rx="8" fill="#FFB3C1" {...sw} />
        <rect x="196" y="364" width="40" height="12" rx="5" fill="#FF9DB0" {...sw2} />
        <path d="M216 376 V388 M200 392 H232" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <circle cx="200" cy="394" r="4" fill={INK} />
        <circle cx="232" cy="394" r="4" fill={INK} />
      </g>
    ),
  },
  {
    id: 'bin',
    kind: 'safe',
    level: 1,
    label: 'פח אשפה',
    bbox: [298, 346, 30, 42],
    text: 'פח קטן ונמוך אינו מסוכן.',
    draw: () => (
      <g>
        <path d="M300 352 H326 L322 386 H304 Z" fill="#BFEBD7" {...sw2} />
        <path d="M312 358 V380" stroke={INK} strokeWidth="1.6" opacity="0.5" />
        <rect x="298" y="347" width="30" height="6" rx="3" fill="#8FD9B6" {...sw2} />
      </g>
    ),
  },
  {
    id: 'laptop',
    kind: 'safe',
    level: 2,
    label: 'מחשב נייד',
    bbox: [146, 290, 56, 24],
    text: 'מחשב נייד קל ושטוח, ולכן הוא לא צפוי לגרום לפציעה.',
    draw: () => (
      <g>
        <rect x="152" y="294" width="40" height="18" rx="3" fill="#7A6454" {...sw2} />
        <rect x="156" y="297" width="32" height="12" rx="1.5" fill="#FFF6E8" />
        <rect x="146" y="311" width="52" height="4" rx="2" fill="#B9A090" {...sw2} />
      </g>
    ),
  },
];
