import React from 'react';

// משך כל שלב ברצף הפתיחה (באלפיות שנייה). משך שלב הרעידה חייב להתאים ל-4.4s באנימציות ב-index.css
export const T_BEFORE = 2800;
export const T_QUAKE = 4400;
export const T_AFTER = 2400;

// במה אחת בגודל 360x640 (כמו הסצנה עצמה): תמונת "לפני", רעידה, ותמונת "אחרי".
// phase: 'before' | 'quake' | 'after'
export default function QuakeStage({ preUrl, postUrl, phase }) {
  return (
    <svg
      className={`scene qs qs-${phase}`}
      viewBox="0 0 360 640"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={phase === 'before' ? 'החדר לפני הרעידה' : phase === 'quake' ? 'רעידת אדמה' : 'החדר אחרי הרעידה'}
    >
      <defs>
        <radialGradient id="qs-alert-grad" cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.45" stopColor="#b8412a" stopOpacity="0" />
          <stop offset="1" stopColor="#b8412a" stopOpacity="0.75" />
        </radialGradient>
        <linearGradient id="qs-haze-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#d9c7a0" stopOpacity="0.75" />
          <stop offset="1" stopColor="#d9c7a0" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g className="qs-world">
        <image className="qs-pre" href={preUrl} x="0" y="0" width="360" height="640" preserveAspectRatio="xMidYMid slice" />
        <image className="qs-post" href={postUrl} x="0" y="0" width="360" height="640" preserveAspectRatio="xMidYMid slice" />
      </g>

      <rect className="qs-haze" x="0" y="200" width="360" height="440" fill="url(#qs-haze-grad)" />

      <rect className="qs-alert" width="360" height="640" fill="url(#qs-alert-grad)" />
      <rect className="qs-flash" width="360" height="640" fill="#fff2cc" />
    </svg>
  );
}
