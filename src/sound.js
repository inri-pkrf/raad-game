// צלילים מסונתזים בעזרת Web Audio - אין צורך בקבצי שמע חיצוניים.
// כל הפונקציות עטופות בהגנה כדי שבעיה באודיו (דפדפן חוסם, אין התקן שמע וכו') לא תפיל את המשחק.
let ctx = null;
let muted = false;

function getCtx() {
  try {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ctx = new AC();
    }
    if (ctx && ctx.state === 'suspended') {
      const p = ctx.resume();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
  } catch (e) {
    ctx = null;
  }
  return ctx;
}

function tone(freq, start, dur, type = 'sine', vol = 0.16) {
  try {
    const c = getCtx();
    if (!c || muted) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const t = c.currentTime + start;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(vol, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  } catch (e) {
    /* מתעלמים - צליל הוא תוספת בלבד */
  }
}

export function unlockAudio() {
  getCtx();
}

export function setMuted(value) {
  muted = value;
}

export const sounds = {
  // תשובה נכונה: שלושה צלילים עולים, צלולים וברורים
  correct() {
    tone(587, 0, 0.2, 'sine', 0.3);
    tone(740, 0.11, 0.2, 'sine', 0.3);
    tone(988, 0.22, 0.5, 'sine', 0.28);
  },
  // תשובה שגויה: זמזום נמוך וחד
  wrong() {
    tone(160, 0, 0.22, 'sawtooth', 0.22);
    tone(120, 0.2, 0.34, 'sawtooth', 0.22);
  },
  // כל לחיצה: נקישה קצרה
  click() {
    tone(720, 0, 0.06, 'triangle', 0.16);
    tone(540, 0.03, 0.07, 'triangle', 0.1);
  },
  hint() {
    tone(660, 0, 0.12, 'sine', 0.16);
    tone(880, 0.1, 0.18, 'sine', 0.16);
  },
  win() {
    [392, 523, 659, 784].forEach((f, i) => tone(f, i * 0.18, 0.6, 'sine', 0.2));
  },
  lose() {
    [330, 262].forEach((f, i) => tone(f, i * 0.25, 0.6, 'triangle', 0.22));
  },
};
