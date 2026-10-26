import React from 'react';
import { TARGET } from '../scenes';

export function Win({ env, level, foundItems, onAgain, onMenu, onHome }) {
  return (
    <div className="screen result">
      <div className="result-head">
        <span className="eyebrow">סיכום</span>
        <h1 className="title">הסימולציה הושלמה</h1>
        <p className="lead">
          זיהיתם {TARGET} חפצים מסוכנים ({env.name}, רמה {level.name}).
        </p>
      </div>

      <div className="card">
        <h2 className="h2">החפצים שזוהו</h2>
        <ol className="found-list">
          {foundItems.map((it, i) => (
            <li key={it.id}>
              <span className="found-num" aria-hidden="true">
                {i + 1}
              </span>
              <span>{it.label}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="card remember">
        <h2 className="h2">מה עושים כשמרגישים רעידה?</h2>
        <ul>
          <li>אם אתם בתוך מבנה, עוברים למקום בטוח, כמו הממ"ד או חדר המדרגות.</li>
          <li>אם אי אפשר, מתכופפים, מגינים על הראש והצוואר, וצמודים לרהיט יציב או לקיר פנימי.</li>
          <li>מתרחקים מזכוכית, ממראות, מארונות ומכל דבר שעלול ליפול.</li>
          <li>לא משתמשים במעלית.</li>
          <li>אם אתם בחוץ, מתרחקים מבניינים, מעצים ומעמודים אל שטח פתוח.</li>
        </ul>
        <small>למידע רשמי ומלא: הנחיות פיקוד העורף לרעידת אדמה.</small>
      </div>

      <div className="btn-row">
        <button className="btn btn-primary" onClick={onAgain}>
          סימולציה נוספת
        </button>
        <button className="btn btn-soft" onClick={onMenu}>
          בחירת סביבה אחרת
        </button>
      </div>
      <button className="link-btn center" onClick={onHome}>
        סיום וחזרה למסך הראשי
      </button>
    </div>
  );
}

export function Lose({ onAgain, onMenu, onHome }) {
  return (
    <div className="screen result center-screen">
      <div className="result-head">
        <span className="eyebrow">סיכום</span>
        <h1 className="title">הסימולציה הסתיימה</h1>
        <p className="lead">
          מכסת הטעויות הסתיימה. כדאי לנסות שוב ולשים לב אילו חפצים עלולים ליפול, להתהפך או להישבר.
        </p>
      </div>
      <div className="btn-row">
        <button className="btn btn-primary" onClick={onAgain}>
          ניסיון נוסף
        </button>
        <button className="btn btn-soft" onClick={onMenu}>
          בחירת סביבה
        </button>
      </div>
      <button className="link-btn center" onClick={onHome}>
        סיום וחזרה למסך הראשי
      </button>
    </div>
  );
}
