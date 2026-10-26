import React, { useEffect, useState } from 'react';
import { FullscreenIcon, ExitFullscreenIcon } from './Icons';

const getElement = () => document.fullscreenElement || document.webkitFullscreenElement || null;

// כפתור אייקון להפעלה וכיבוי של מסך מלא. אם הדפדפן לא תומך (למשל באייפון) הכפתור לא מוצג.
export default function FullscreenButton({ className = '' }) {
  const [isFull, setIsFull] = useState(!!getElement());
  const root = document.documentElement;
  const supported = !!(root.requestFullscreen || root.webkitRequestFullscreen);

  useEffect(() => {
    const update = () => setIsFull(!!getElement());
    document.addEventListener('fullscreenchange', update);
    document.addEventListener('webkitfullscreenchange', update);
    return () => {
      document.removeEventListener('fullscreenchange', update);
      document.removeEventListener('webkitfullscreenchange', update);
    };
  }, []);

  if (!supported) return null;

  const toggle = () => {
    try {
      let p;
      if (getElement()) {
        p = document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen();
      } else {
        p = root.requestFullscreen ? root.requestFullscreen() : root.webkitRequestFullscreen();
      }
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch (e) {
      /* אם הדפדפן חוסם מסך מלא - מתעלמים */
    }
  };

  return (
    <button
      className={`icon-btn ${className}`}
      onClick={toggle}
      aria-label={isFull ? 'יציאה ממסך מלא' : 'מסך מלא'}
      title={isFull ? 'יציאה ממסך מלא' : 'מסך מלא'}
    >
      {isFull ? <ExitFullscreenIcon /> : <FullscreenIcon />}
    </button>
  );
}
