import React, { useEffect, useMemo, useRef, useState } from 'react';
import Scene from './Scene';
import Modal from './Modal';
import ItemIcon from './ItemIcon';
import { TARGET } from '../scenes';
import { sounds, setMuted } from '../sound';

function WarnIcon() {
  return (
    <svg viewBox="0 0 48 44" width="40" height="36" aria-hidden="true">
      <path d="M24 4 L45 40 H3 Z" fill="#e0932a" stroke="#10151a" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 16 V28" stroke="#10151a" strokeWidth="4" strokeLinecap="round" />
      <circle cx="24" cy="34" r="2.6" fill="#10151a" />
    </svg>
  );
}

export default function Game({ env, level, onWin, onLose, onExit }) {
  const items = useMemo(
    () => env.items.filter((it) => it.kind === 'hazard' || it.level <= level.index),
    [env, level]
  );
  const hazards = useMemo(() => items.filter((it) => it.kind === 'hazard'), [items]);

  const [found, setFound] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(level.hints);
  const [popup, setPopup] = useState(null);
  const [boxOpen, setBoxOpen] = useState(false);
  const [hintId, setHintId] = useState(null);
  const [shakeId, setShakeId] = useState(null);
  const [toast, setToast] = useState(null);
  const [plusKey, setPlusKey] = useState(0);
  const [soundOff, setSoundOff] = useState(false);
  const [ended, setEnded] = useState(false);
  const timers = useRef([]);

  const later = (fn, ms) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
    return t;
  };

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    []
  );

  const foundItems = found.map((id) => hazards.find((h) => h.id === id)).filter(Boolean);
  const blocked = popup || boxOpen || ended;

  const pick = (item) => {
    if (blocked || found.includes(item.id)) return;
    setToast(null);
    setHintId(null);

    if (item.kind === 'hazard') {
      sounds.correct();
      setFound((f) => [...f, item.id]);
      setPlusKey((k) => k + 1);
      setPopup(item);
      return;
    }

    // חפץ שאינו מסוכן
    sounds.wrong();
    setShakeId(item.id);
    later(() => setShakeId(null), 600);
    const next = mistakes + 1;
    setMistakes(next);
    setToast({ key: Date.now(), label: item.label, text: item.text });
    later(() => setToast(null), 4500);

    if (level.lives !== null && next >= level.lives) {
      setEnded(true);
      later(() => {
        sounds.lose();
        onLose();
      }, 1400);
    }
  };

  const understood = () => {
    sounds.click();
    setPopup(null);
    if (found.length >= TARGET) {
      setEnded(true);
      later(() => {
        sounds.win();
        onWin(foundItems);
      }, 250);
    }
  };

  const useHint = () => {
    if (blocked || hintsLeft <= 0) return;
    const remaining = hazards.filter((h) => !found.includes(h.id));
    if (!remaining.length) return;
    const target = remaining[Math.floor(Math.random() * remaining.length)];
    sounds.hint();
    setHintsLeft((n) => n - 1);
    setHintId(target.id);
    later(() => setHintId(null), 3200);
  };

  const openBox = () => {
    if (popup || ended) return;
    sounds.click();
    setBoxOpen(true);
  };

  const closeBox = () => {
    sounds.click();
    setBoxOpen(false);
  };

  const toggleSound = () => {
    const next = !soundOff;
    setSoundOff(next);
    setMuted(next);
  };

  const slots = Array.from({ length: TARGET }, (_, i) => foundItems[i] || null);

  return (
    <div className="screen game">
      <div className="game-top">
        <button className="box-btn" onClick={openBox} aria-label="רשימת החפצים שזוהו">
          <WarnIcon />
          <span className="box-text">
            <small>חפצים שזוהו</small>
            <strong>
              {found.length}/{TARGET}
            </strong>
          </span>
          {plusKey > 0 && (
            <span className="plus-one" key={plusKey} aria-hidden="true">
              +1
            </span>
          )}
        </button>

        {level.lives !== null && (
          <div className="lives" aria-label={`נותרו ${level.lives - mistakes} טעויות מותרות`}>
            <small>טעויות</small>
            <span className="pips">
              {Array.from({ length: level.lives }, (_, i) => (
                <span key={i} className={i < mistakes ? 'pip used' : 'pip'} />
              ))}
            </span>
          </div>
        )}

        <div className="top-actions">
          <button className="chip-btn" onClick={toggleSound} aria-label={soundOff ? 'הפעלת צליל' : 'השתקה'}>
            {soundOff ? 'צליל כבוי' : 'צליל פעיל'}
          </button>
          <button className="chip-btn" onClick={onExit} aria-label="יציאה לבחירת סביבה">
            יציאה
          </button>
        </div>
      </div>

      <p className="game-prompt">
        {env.name}: לחצו על חפצים שעלולים ליפול, להתהפך או להישבר
      </p>

      <div className="scene-card">
        <Scene env={env} items={items} found={found} hintId={hintId} shakeId={shakeId} onPick={pick} />
      </div>

      <div className="game-bottom">
        {level.hints > 0 ? (
          <button className="btn btn-soft" onClick={useHint} disabled={hintsLeft <= 0 || !!blocked}>
            רמז ({hintsLeft})
          </button>
        ) : (
          <span className="no-hints">ברמה זו אין רמזים</span>
        )}
      </div>

      {toast && (
        <div className="toast" key={toast.key} role="status">
          <strong>{toast.label} – לא מסוכן</strong>
          <span>{toast.text}</span>
        </div>
      )}

      {popup && (
        <Modal label={popup.title}>
          <div className="danger-badge">זוהה חפץ מסוכן</div>
          <div className="popup-icon">
            <ItemIcon item={popup} size={190} />
          </div>
          <h2 className="h2 popup-title">{popup.title}</h2>
          <p className="popup-text">{popup.text}</p>
          <div className="tip-box">
            <strong>מה עושים?</strong>
            <span>{popup.tip}</span>
          </div>
          <button className="btn btn-primary" onClick={understood}>
            הבנתי
          </button>
        </Modal>
      )}

      {boxOpen && (
        <Modal label="החפצים שזוהו" onBackdrop={() => setBoxOpen(false)}>
          <h2 className="h2">החפצים שזוהו</h2>
          <p className="popup-text center">
            זוהו {found.length} מתוך {TARGET}
          </p>
          <div className="slot-grid">
            {slots.map((it, i) =>
              it ? (
                <div className="slot filled" key={it.id}>
                  <ItemIcon item={it} size={110} />
                  <span>{it.label}</span>
                </div>
              ) : (
                <div className="slot empty" key={`e${i}`}>
                  <span className="q">?</span>
                </div>
              )
            )}
          </div>
          <button className="btn btn-primary" onClick={closeBox}>
            חזרה למשחק
          </button>
        </Modal>
      )}
    </div>
  );
}
