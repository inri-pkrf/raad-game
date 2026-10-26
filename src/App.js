import React, { useCallback, useEffect, useRef, useState } from 'react';
import Intro from './components/Intro';
import Setup from './components/Setup';
import Game from './components/Game';
import ErrorBoundary from './components/ErrorBoundary';
import FullscreenButton from './components/FullscreenButton';
import { Win, Lose } from './components/Result';
import { ENVIRONMENTS, LEVELS } from './scenes';
import { sounds, unlockAudio } from './sound';

// טוטם: אחרי זמן ללא נגיעה במסך חוזרים אוטומטית למסך הפתיחה
const IDLE_MS = 60000; // סך הזמן ללא פעילות
const WARN_MS = 15000; // כמה שניות לפני האיפוס מציגים אזהרה

function Shell() {
  const [screen, setScreen] = useState('intro'); // intro | setup | game | win | lose
  const [envId, setEnvId] = useState('home');
  const [levelId, setLevelId] = useState('easy');
  const [round, setRound] = useState(0); // מאפס את המשחק בכל סיבוב חדש
  const [foundItems, setFoundItems] = useState([]);
  const [warnSec, setWarnSec] = useState(null);
  const lastActive = useRef(Date.now());
  const screenRef = useRef(screen);
  screenRef.current = screen;

  const env = ENVIRONMENTS.find((e) => e.id === envId) || ENVIRONMENTS[0];
  const level = LEVELS.find((l) => l.id === levelId) || LEVELS[0];

  const resetAll = useCallback(() => {
    setScreen('intro');
    setEnvId('home');
    setLevelId('easy');
    setFoundItems([]);
    setWarnSec(null);
    setRound((r) => r + 1);
    lastActive.current = Date.now();
  }, []);

  useEffect(() => {
    const bump = () => {
      lastActive.current = Date.now();
      setWarnSec(null);
    };
    const events = ['pointerdown', 'touchstart', 'keydown'];
    events.forEach((ev) => window.addEventListener(ev, bump, true));
    const noMenu = (e) => e.preventDefault();
    window.addEventListener('contextmenu', noMenu);

    const timer = setInterval(() => {
      if (screenRef.current === 'intro') {
        setWarnSec(null);
        return;
      }
      const idle = Date.now() - lastActive.current;
      if (idle >= IDLE_MS) resetAll();
      else if (idle >= IDLE_MS - WARN_MS) setWarnSec(Math.ceil((IDLE_MS - idle) / 1000));
    }, 1000);

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, bump, true));
      window.removeEventListener('contextmenu', noMenu);
      clearInterval(timer);
    };
  }, [resetAll]);

  // צליל לכל לחיצה במסך (חפצים בתמונה משמיעים צליל משלהם - נכון / שגוי)
  useEffect(() => {
    const tap = (e) => {
      unlockAudio();
      const t = e.target;
      if (t && t.closest && t.closest('.hs')) return;
      sounds.click();
    };
    window.addEventListener('pointerdown', tap, true);
    return () => window.removeEventListener('pointerdown', tap, true);
  }, []);

  const play = () => {
    unlockAudio();
    setRound((r) => r + 1);
    setScreen('game');
  };

  return (
    <main className="app-shell">
      {screen !== 'game' && <FullscreenButton className="fs-float" />}

      {screen === 'intro' && (
        <Intro
          key={round}
          onStart={() => {
            unlockAudio();
            setScreen('setup');
          }}
        />
      )}

      {screen === 'setup' && (
        <Setup
          envId={envId}
          levelId={levelId}
          onEnv={setEnvId}
          onLevel={setLevelId}
          onPlay={play}
          onBack={() => setScreen('intro')}
        />
      )}

      {screen === 'game' && (
        <Game
          key={round}
          env={env}
          level={level}
          onExit={() => setScreen('setup')}
          onWin={(items) => {
            setFoundItems(items);
            setScreen('win');
          }}
          onLose={() => setScreen('lose')}
        />
      )}

      {screen === 'win' && (
        <Win env={env} level={level} foundItems={foundItems} onAgain={play} onMenu={() => setScreen('setup')} onHome={resetAll} />
      )}

      {screen === 'lose' && <Lose onAgain={play} onMenu={() => setScreen('setup')} onHome={resetAll} />}

      {warnSec !== null && (
        <div className="modal-backdrop" role="alertdialog" aria-label="המשחק עומד להתאפס">
          <div className="modal-card idle-card">
            <h2 className="h2">האם אתם עדיין כאן?</h2>
            <p className="popup-text center">המסך יחזור להתחלה בעוד {warnSec} שניות.</p>
            <button className="btn btn-primary" onClick={() => setWarnSec(null)}>
              המשך
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function App() {
  const [boundaryKey, setBoundaryKey] = useState(0);
  return (
    <ErrorBoundary key={boundaryKey} onReset={() => setBoundaryKey((k) => k + 1)}>
      <Shell />
    </ErrorBoundary>
  );
}
