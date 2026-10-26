import React from 'react';
import { ENVIRONMENTS, LEVELS } from '../scenes';

export default function Setup({ envId, levelId, onEnv, onLevel, onPlay, onBack }) {
  return (
    <div className="screen setup">
      <button className="link-btn" onClick={onBack}>
        ← חזרה
      </button>

      <h1 className="title small">בחירת סביבה</h1>
      <div className="choice-list">
        {ENVIRONMENTS.map((env) => (
          <button
            key={env.id}
            className={`choice-card ${envId === env.id ? 'selected' : ''}`}
            onClick={() => onEnv(env.id)}
            aria-pressed={envId === env.id}
          >
            <span className="mark" aria-hidden="true" />
            <span className="choice-text">
              <strong>{env.name}</strong>
              <small>{env.desc}</small>
            </span>
          </button>
        ))}
      </div>

      <h1 className="title small">בחירת רמת קושי</h1>
      <div className="choice-list">
        {LEVELS.map((lv) => (
          <button
            key={lv.id}
            className={`choice-card ${levelId === lv.id ? 'selected' : ''}`}
            onClick={() => onLevel(lv.id)}
            aria-pressed={levelId === lv.id}
          >
            <span className="mark" aria-hidden="true" />
            <span className="choice-text">
              <strong>{lv.name}</strong>
              <small>{lv.desc}</small>
            </span>
          </button>
        ))}
      </div>

      <button className="btn btn-primary btn-xl" onClick={onPlay}>
        התחלה
      </button>
    </div>
  );
}
