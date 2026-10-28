import React from 'react';
import { TARGET } from '../scenes';

// קו סייסמוגרף מונפש: בסיס שקט שמתחלף בפעילות ואחר כך חוזר לשקט
function Seismograph() {
  const pts = [];
  for (let x = 0; x <= 400; x += 4) {
    const env = Math.exp(-Math.pow((x - 170) / 70, 2));
    const amp = 2 + env * 26;
    const y = 40 + Math.sin(x * 1.9) * amp * 0.6 + Math.sin(x * 0.63 + 1) * amp * 0.4;
    pts.push(`${x},${y.toFixed(1)}`);
  }
  const d = `M${pts.join(' L')}`;
  return (
    <div className="seismo" aria-hidden="true">
      <svg viewBox="0 0 400 80" preserveAspectRatio="none">
        <g className="seismo-track">
          <path d={d} />
          <path d={d} transform="translate(400 0)" />
        </g>
        <line x1="0" x2="400" y1="40" y2="40" className="seismo-axis" />
      </svg>
    </div>
  );
}

const steps = [
  'בוחרים סביבה ורמת קושי.',
  'רואים איך נראה המקום לפני רעידת אדמה, ואיך הוא נראה אחריה.',
  'לוחצים על החפצים המסוכנים בתמונה. על כל חפץ מתקבל הסבר קצר.',
  `הסימולציה מסתיימת לאחר שזוהו ${TARGET} חפצים מסוכנים.`,
];



export default function Intro({ onStart }) {
  return (
    <div className="screen intro">
      <div className="intro-head">
        <span className="eyebrow">סימולציית זיהוי סכנות</span>
        <h1 className="title">היערכות לרעידת אדמה</h1>
        <p className="lead">
          רוב הפציעות ברעידת אדמה נגרמות מחפצים שנופלים, מתהפכים או מתנפצים. הסימולציה מלמדת לזהות אותם מראש.
        </p>
      </div>



      <Seismograph />

      <div className="card instructions">
        <h2 className="h2">איך זה עובד</h2>
        <ol className="steps">
          {steps.map((text, i) => (
            <li key={i}>
              <span className="step-num" aria-hidden="true">
                {i + 1}
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </div>

      <button className="btn btn-primary btn-xl" onClick={onStart}>
        תחילת הסימולציה
      </button>
    </div>
  );
}
