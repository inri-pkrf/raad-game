import React, { useEffect, useMemo, useRef, useState } from 'react';
import Scene from './Scene';
import QuakeStage, { T_BEFORE, T_QUAKE, T_AFTER } from './QuakeStage';
import Modal from './Modal';
import FullscreenButton from './FullscreenButton';
import ItemIcon from './ItemIcon';
import { TARGET } from '../scenes';
import { getPhotoSetup } from '../photos';
import { LampIcon, SoundOnIcon, SoundOffIcon, ExitIcon } from './Icons';
import { sounds, setMuted } from '../sound';

function WarnIcon() {
  return (
    <svg viewBox="0 0 48 44" width="40" height="36" aria-hidden="true">
      <path d="M24 4 L45 40 H3 Z" fill="#d9a441" stroke="#1a1610" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 16 V28" stroke="#1a1610" strokeWidth="4" strokeLinecap="round" />
      <circle cx="24" cy="34" r="2.6" fill="#1a1610" />
    </svg>
  );
}

export default function Game({ env, level, onWin, onLose, onExit }) {
  // אם יש תמונת צילום לסביבה ולרמה הזאת - משתמשים בה ובחפצים שלה. אחרת - בציור.
  const photoSetup = useMemo(() => getPhotoSetup(env, level.id), [env, level]);
  const items = useMemo(
    () =>
      photoSetup
        ? photoSetup.items
        : env.items.filter((it) => it.kind === 'hazard' || it.level <= level.index),
    [env, level, photoSetup]
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
  // רצף פתיחה: before (החדר לפני) -> quake (רעידה) -> after (החדר אחרי) -> play (בוחרים סכנות)
  const [phase, setPhase] = useState(photoSetup ? 'before' : 'play');
  const timers = useRef([]);
  const introTimers = useRef([]);
  const stopQuake = useRef(null);

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

  // מפעיל את רצף הפתיחה: לפני הרעידה, הרעידה עצמה, ואחריה
  useEffect(() => {
    if (!photoSetup) return undefined;
    [photoSetup.preUrl, photoSetup.url].forEach((u) => {
      const im = new Image();
      im.src = u;
    });
    const t1 = setTimeout(() => {
      setPhase('quake');
      stopQuake.current = sounds.quake(T_QUAKE / 1000);
    }, T_BEFORE);
    const t2 = setTimeout(() => {
      setPhase('after');
      sounds.alert();
    }, T_BEFORE + T_QUAKE);
    const t3 = setTimeout(() => setPhase('play'), T_BEFORE + T_QUAKE + T_AFTER);
    introTimers.current = [t1, t2, t3];
    return () => {
      [t1, t2, t3].forEach(clearTimeout);
      if (stopQuake.current) stopQuake.current();
    };
  }, [photoSetup]);

  const skipIntro = () => {
    introTimers.current.forEach(clearTimeout);
    if (stopQuake.current) stopQuake.current();
    setPhase('play');
  };

  const foundItems = found.map((id) => hazards.find((h) => h.id === id)).filter(Boolean);
  const blocked = phase !== 'play' || popup || boxOpen || toast || ended;
  const intro = !!photoSetup && phase !== 'play';

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
    setToast({ key: Date.now(), label: item.label, text: item.text, last: level.lives !== null && next >= level.lives });
  };

  // סגירת ההודעה על חפץ לא מסוכן. אם זו הייתה הטעות האחרונה - עוברים למסך הסיום
  const closeToast = () => {
    const last = toast && toast.last;
    setToast(null);
    if (last) {
      setEnded(true);
      sounds.lose();
      onLose();
    }
  };

  const understood = () => {
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
    if (phase !== 'play' || popup || toast || ended) return;
    setBoxOpen(true);
  };

  const closeBox = () => {
    setBoxOpen(false);
  };

  const toggleSound = () => {
    const next = !soundOff;
    setSoundOff(next);
    setMuted(next);
  };

  const slots = Array.from({ length: TARGET }, (_, i) => foundItems[i] || null);

  return (
    <div className={`screen game${phase === 'quake' ? ' quaking' : ''}`}>
      <div className="game-top">
        {level.hints > 0 && (
          <button
            className="icon-btn lamp-btn"
            onClick={useHint}
            disabled={hintsLeft <= 0 || !!blocked}
            aria-label={`רמז, נותרו ${hintsLeft}`}
            title="רמז"
          >
            <LampIcon />
            <span className="badge">{hintsLeft}</span>
          </button>
        )}

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
          <FullscreenButton />
          <button className="icon-btn" onClick={toggleSound} aria-label={soundOff ? 'הפעלת צליל' : 'השתקה'} title={soundOff ? 'צליל כבוי' : 'צליל פעיל'}>
            {soundOff ? <SoundOffIcon /> : <SoundOnIcon />}
          </button>
          <button className="icon-btn" onClick={onExit} aria-label="יציאה לבחירת סביבה" title="יציאה">
            <ExitIcon />
          </button>
        </div>
      </div>

      <p className={`game-prompt prompt-${phase}`}>
        {phase === 'before' && `${env.name}: כך נראה המקום לפני הרעידה`}
        {phase === 'quake' && 'רעידת אדמה!'}
        {phase === 'after' && 'אחרי הרעידה'}
        {phase === 'play' && `${env.name}: לחצו על החפצים המסוכנים בתמונה`}
      </p>

      <div className="scene-card">
        {intro ? (
          <QuakeStage preUrl={photoSetup.preUrl} postUrl={photoSetup.url} phase={phase} />
        ) : (
          <Scene env={env} items={items} photo={photoSetup ? photoSetup.url : null} found={found} hintId={hintId} shakeId={shakeId} onPick={pick} />
        )}

        {intro && (
          <div className={`phase-card phase-${phase}`} key={phase} aria-live="polite">
            <div className="phase-plate">
              {phase === 'before' && (
                <>
                  <strong>  זהו עוד יום רגיל</strong>
                  <span> עד שברגע הכל משתנה </span>
                </>
              )}
              {phase === 'quake' && (
                <>
                  <strong>רעידת אדמה!</strong>
                  <span>כמה שניות שמשנות הכל</span>
                </>
              )}
              {phase === 'after' && (
                <>
                  <strong>אחרי הרעידה</strong>
                  <span>מה הם הסכנות? </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {intro && (
        <button className="skip-btn" onClick={skipIntro}>
          דלגו על הרעידה
        </button>
      )}

      {toast && (
        <div className="toast-wrap" key={toast.key}>
          <div className="toast" role="alertdialog">
            <div className="toast-badge">חפץ לא מסוכן</div>
            <strong>{toast.label}</strong>
            <span>{toast.text}</span>
            <button className="btn btn-primary toast-btn" onClick={closeToast}>
              הבנתי
            </button>
          </div>
        </div>
      )}

      {popup && (
        <Modal label={popup.title}>
          <div className="danger-badge">זוהה חפץ מסוכן</div>
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
