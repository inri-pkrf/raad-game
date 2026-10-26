import React from 'react';
import { INK } from './common';

export function Background() {
  return (
    <g>
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF0C2" />
          <stop offset="1" stopColor="#FFDDC4" />
        </linearGradient>
      </defs>
      <rect width="400" height="520" fill="url(#skyGrad)" />
      <circle cx="215" cy="38" r="22" fill="#FFD36E" />
      <circle cx="215" cy="38" r="30" fill="#FFD36E" opacity="0.3" />
      <g fill="#FFFFFF" opacity="0.85">
        <ellipse cx="60" cy="40" rx="30" ry="12" />
        <ellipse cx="84" cy="32" rx="20" ry="11" />
        <ellipse cx="320" cy="52" rx="26" ry="10" />
        <ellipse cx="340" cy="44" rx="16" ry="9" />
      </g>
      <rect y="400" width="400" height="42" fill="#F2E0C9" />
      <rect y="398" width="400" height="8" fill="#E8CFB0" />
      <rect y="442" width="400" height="78" fill="#C8E9B5" />
      <path d="M0 442 Q50 436 100 442 T200 442 T300 442 T400 442" fill="none" stroke="#A9D894" strokeWidth="3" />
    </g>
  );
}

const sw = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' };
const sw2 = { stroke: INK, strokeWidth: 2.2, strokeLinejoin: 'round', strokeLinecap: 'round' };

export const items = [
  // ---------- חפצים מסוכנים ----------
  {
    id: 'building',
    kind: 'hazard',
    label: 'קירות וחלונות של בניין',
    bbox: [245, 78, 152, 324],
    title: 'קירות וחלונות של בניין',
    text: 'ליד הקירות החיצוניים של בניין נופלים בזמן רעידה זכוכית, טיח ואבנים. המקום הכי מסוכן הוא ממש בצמוד לבניין, ולכן לא רצים החוצה ולא נשארים ליד הקירות.',
    tip: 'בחוץ מתרחקים מבניינים אל שטח פתוח, ומשתדלים לא להישאר סמוך לקירות ולחלונות.',
    draw: () => (
      <g>
        <rect x="247" y="86" width="146" height="314" fill="#FFD9C0" {...sw} />
        <rect x="241" y="78" width="158" height="14" rx="3" fill="#F6BE9C" {...sw2} />
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => (
            <g key={`${r}-${c}`}>
              <rect x={262 + c * 44} y={106 + r * 72} width="34" height="48" rx="3" fill="#FFFFFF" {...sw2} />
              <rect x={266 + c * 44} y={110 + r * 72} width="26" height="40" fill="#CFF0E0" />
              <path d={`M${270 + c * 44} ${144 + r * 72} L${280 + c * 44} ${116 + r * 72}`} stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          ))
        )}
        <rect x="350" y="106" width="34" height="48" rx="3" fill="#FFFFFF" {...sw2} />
        <rect x="354" y="110" width="26" height="40" fill="#CFF0E0" />
        <rect x="350" y="178" width="34" height="48" rx="3" fill="#FFFFFF" {...sw2} />
        <rect x="354" y="182" width="26" height="40" fill="#CFF0E0" />
        <rect x="298" y="344" width="40" height="56" rx="3" fill="#FFFFFF" {...sw2} />
        <rect x="303" y="349" width="30" height="46" fill="#CFF0E0" />
        <path d="M308 388 L318 358" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'balconypots',
    kind: 'hazard',
    label: 'עציצים על מעקה',
    bbox: [286, 186, 98, 40],
    title: 'עציצים על מעקה מרפסת',
    text: 'עציצים שמונחים על מעקה או בקצה המרפסת עלולים ליפול לרחוב בזמן הרעידה, על מי שעובר מתחת.',
    tip: 'מניחים עציצים על הרצפה ולא בקצה המעקה, ומקבעים אותם היטב.',
    draw: () => (
      <g>
        <rect x="286" y="214" width="98" height="9" rx="3" fill="#B98560" {...sw2} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M${294 + i * 32} 198 H${316 + i * 32} L${313 + i * 32} 214 H${297 + i * 32} Z`} fill="#FF8A7A" {...sw2} />
            <circle cx={305 + i * 32} cy="192" r="8" fill={i % 2 ? '#FFB3C1' : '#FFD36E'} stroke={INK} strokeWidth="2" />
          </g>
        ))}
      </g>
    ),
  },
  {
    id: 'sign',
    kind: 'hazard',
    label: 'שלט תלוי מעל חנות',
    bbox: [252, 318, 76, 50],
    title: 'שלט תלוי',
    text: 'שלט שתלוי מעל מדרכה או חנות מתנדנד ברעידה, ועלול להתנתק ולנחות על העוברים והשבים.',
    tip: 'מתרחקים משלטים תלויים ומקומות עם קירות חיצוניים וחלונות, ועוברים אל שטח פתוח.',
    draw: () => (
      <g>
        <path d="M250 326 H300" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <path d="M262 326 V338 M292 326 V338" stroke={INK} strokeWidth="2.5" />
        <rect x="256" y="338" width="44" height="26" rx="5" fill="#FFD36E" {...sw} />
        <circle cx="278" cy="351" r="6" fill="#FF8A7A" stroke={INK} strokeWidth="2" />
      </g>
    ),
  },
  {
    id: 'outdoorac',
    kind: 'hazard',
    label: 'מזגן על קיר חיצוני',
    bbox: [344, 254, 50, 52],
    title: 'מזגן על הקיר החיצוני',
    text: 'יחידת מזגן חיצונית תלויה גבוה על קיר הבניין. אם היא לא מקובעת היטב, היא עלולה ליפול על המדרכה.',
    tip: 'לא עומדים מתחת ליחידות מזגן או ליד קירות חיצוניים בזמן רעידה.',
    draw: () => (
      <g>
        <path d="M350 300 L358 288 M388 300 L380 288" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <rect x="348" y="258" width="42" height="34" rx="5" fill="#EFEAE2" {...sw} />
        <circle cx="369" cy="275" r="11" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
        <path d="M369 275 L369 266 M369 275 L377 279 M369 275 L361 279" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'tree',
    kind: 'hazard',
    label: 'עץ גדול',
    bbox: [133, 166, 114, 236],
    title: 'עץ גדול',
    text: 'ענפים גדולים יכולים להישבר ולהיפול, ועצים שאינם יציבים עלולים להתמוטט.',
    tip: 'בחוץ מתרחקים מעצים גדולים, מבניינים ומעמודים אל שטח פתוח.',
    draw: () => (
      <g>
        <path d="M184 400 L186 300 H202 L204 400 Z" fill="#B98560" {...sw} />
        <path d="M194 330 L170 306 M194 316 L216 292" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        <circle cx="160" cy="232" r="30" fill="#8FD9B6" {...sw} />
        <circle cx="222" cy="228" r="30" fill="#8FD9B6" {...sw} />
        <circle cx="190" cy="200" r="34" fill="#7CCFA6" {...sw} />
        <circle cx="190" cy="258" r="34" fill="#7CCFA6" {...sw} />
        <circle cx="176" cy="204" r="5" fill="#FFB3C1" />
        <circle cx="214" cy="250" r="5" fill="#FFB3C1" />
        <circle cx="152" cy="246" r="5" fill="#FFB3C1" />
      </g>
    ),
  },
  {
    id: 'powerpole',
    kind: 'hazard',
    label: 'עמוד חשמל',
    bbox: [76, 50, 68, 352],
    title: 'עמוד חשמל וכבלים',
    text: 'עמוד חשמל יכול להתכופף או ליפול, והכבלים שעליו עלולים להתנתק ולהיות חיים. זה מסוכן מאוד.',
    tip: 'מתרחקים מעמודי חשמל, מקווי חשמל ומכל כבל שנופל, ואף פעם לא נוגעים בהם.',
    draw: () => (
      <g>
        <path d="M0 70 Q40 84 110 70 T400 74" fill="none" stroke={INK} strokeWidth="2" opacity="0.7" pointerEvents="none" />
        <path d="M0 84 Q40 98 110 84 T400 88" fill="none" stroke={INK} strokeWidth="2" opacity="0.7" pointerEvents="none" />
        <rect x="104" y="58" width="12" height="342" fill="#B98560" {...sw} />
        <rect x="80" y="68" width="60" height="9" rx="3" fill="#A06E4A" {...sw2} />
        <rect x="88" y="86" width="44" height="7" rx="3" fill="#A06E4A" {...sw2} />
        <circle cx="86" cy="64" r="3.5" fill="#FFD36E" stroke={INK} strokeWidth="1.5" />
        <circle cx="134" cy="64" r="3.5" fill="#FFD36E" stroke={INK} strokeWidth="1.5" />
      </g>
    ),
  },
  {
    id: 'streetlight',
    kind: 'hazard',
    label: 'פנס רחוב',
    bbox: [6, 106, 46, 296],
    title: 'פנס רחוב',
    text: 'עמוד פנס גבוה וצר עלול להתכופף או ליפול, והראש הכבד שלו מסוכן למי שנמצא מתחתיו.',
    tip: 'בחוץ מתרחקים מפנסי רחוב, עמודים ושלטים גבוהים, ומחפשים שטח פתוח.',
    draw: () => (
      <g>
        <rect x="24" y="124" width="9" height="276" fill="#A6948A" {...sw} />
        <path d="M28 128 Q28 108 12 110" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        <rect x="6" y="108" width="22" height="12" rx="5" fill="#FFD36E" {...sw2} />
        <path d="M10 124 L8 140 M16 124 L16 142 M22 124 L24 140" stroke="#FFD36E" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <rect x="18" y="392" width="22" height="9" rx="3" fill="#A6948A" {...sw2} />
      </g>
    ),
  },

  // ---------- חפצים שאינם מסוכנים ----------
  {
    id: 'lawn',
    kind: 'safe',
    level: 0,
    label: 'שטח פתוח',
    bbox: [90, 446, 230, 66],
    text: 'ההפך מסכנה: שטח פתוח, הרחק מבניינים, עצים ועמודים, הוא המקום הבטוח ביותר להיות בו בחוץ בזמן רעידת אדמה.',
    draw: () => (
      <g>
        <ellipse cx="205" cy="480" rx="115" ry="32" fill="#DDF3C9" {...sw2} />
        <circle cx="160" cy="476" r="4" fill="#FFB3C1" />
        <circle cx="200" cy="490" r="4" fill="#FFD36E" />
        <circle cx="245" cy="474" r="4" fill="#FFFFFF" stroke="#CDB8F0" strokeWidth="1.5" />
        <circle cx="270" cy="488" r="4" fill="#FFB3C1" />
      </g>
    ),
  },
  {
    id: 'bench',
    kind: 'safe',
    level: 0,
    label: 'ספסל',
    bbox: [38, 404, 66, 36],
    text: 'ספסל נמוך וכבד אינו צפוי ליפול על מישהו.',
    draw: () => (
      <g>
        <rect x="44" y="414" width="54" height="8" rx="3" fill="#F0B880" {...sw2} />
        <rect x="44" y="406" width="54" height="6" rx="3" fill="#F0B880" {...sw2} />
        <path d="M50 422 V436 M92 422 V436" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'bush',
    kind: 'safe',
    level: 0,
    label: 'שיח נמוך',
    bbox: [120, 404, 52, 38],
    text: 'שיח נמוך לא יכול ליפול ולא לפגוע באף אחד.',
    draw: () => (
      <g>
        <circle cx="134" cy="426" r="14" fill="#7CCFA6" {...sw2} />
        <circle cx="152" cy="424" r="16" fill="#8FD9B6" {...sw2} />
        <circle cx="162" cy="430" r="10" fill="#7CCFA6" {...sw2} />
      </g>
    ),
  },
  {
    id: 'bin',
    kind: 'safe',
    level: 1,
    label: 'פח אשפה',
    bbox: [208, 402, 34, 40],
    text: 'פח אשפה נמוך אינו מסוכן.',
    draw: () => (
      <g>
        <path d="M214 410 H238 L234 438 H218 Z" fill="#FFB3C1" {...sw2} />
        <rect x="211" y="404" width="30" height="7" rx="3" fill="#FF9DB0" {...sw2} />
      </g>
    ),
  },
  {
    id: 'flowerbed',
    kind: 'safe',
    level: 1,
    label: 'ערוגת פרחים',
    bbox: [262, 404, 84, 38],
    text: 'ערוגת פרחים נמוכה אינה מסוכנת.',
    draw: () => (
      <g>
        <rect x="266" y="424" width="76" height="14" rx="5" fill="#D9A06B" {...sw2} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <path d={`M${276 + i * 14} 424 V412`} stroke="#5FB98A" strokeWidth="2.5" />
            <circle cx={276 + i * 14} cy="410" r="5" fill={['#FF8A7A', '#FFD36E', '#FFB3C1', '#CDB8F0', '#FF8A7A'][i]} stroke={INK} strokeWidth="1.5" />
          </g>
        ))}
      </g>
    ),
  },
  {
    id: 'mailbox',
    kind: 'safe',
    level: 2,
    label: 'תיבת דואר',
    bbox: [352, 400, 30, 42],
    text: 'תיבת דואר נמוכה וקטנה אינה מסוכנת.',
    draw: () => (
      <g>
        <rect x="364" y="418" width="6" height="22" fill={INK} />
        <rect x="354" y="402" width="26" height="18" rx="6" fill="#FF8A7A" {...sw2} />
        <rect x="360" y="410" width="14" height="3" rx="1.5" fill="#FFF6E8" />
      </g>
    ),
  },
];
