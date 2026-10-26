import React from 'react';
import { ENVIRONMENTS, LEVELS } from '../scenes';
import { sounds } from '../sound';
import { realize, RealismDefs } from '../realism';

export default function Setup({ envId, levelId, onEnv, onLevel, onPlay, onBack }) {
  return (
    <div className="screen setup">
      <button className="link-btn" onClick={onBack}>
        ← חזרה
      </button>

      <h1 className="title small">בחירת סביבה</h1>
      <div className="env-grid">
        {ENVIRONMENTS.map((env) => {
          const { Background } = env;
          return (
            <button
              key={env.id}
              className={`env-card ${envId === env.id ? 'selected' : ''}`}
              onClick={() => {
                sounds.click();
                onEnv(env.id);
              }}
              aria-pressed={envId === env.id}
            >
              <span className="env-thumb" aria-hidden="true">
                <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice">
                  <RealismDefs />
                  <Background />
                  {env.items
                    .filter((it) => it.kind === 'hazard' || it.level === 0)
                    .map((it) => (
                      <g key={it.id} filter="url(#rl-item)">
                        {realize(it.draw())}
                      </g>
                    ))}
                  <rect width="400" height="520" fill="url(#rl-vignette)" />
                </svg>
              </span>
              <span className="env-name">{env.name}</span>
              <span className="env-desc">{env.desc}</span>
            </button>
          );
        })}
      </div>

      <h1 className="title small">בחירת רמת קושי</h1>
      <div className="level-list">
        {LEVELS.map((lv) => (
          <button
            key={lv.id}
            className={`level-card ${levelId === lv.id ? 'selected' : ''}`}
            onClick={() => {
              sounds.click();
              onLevel(lv.id);
            }}
            aria-pressed={levelId === lv.id}
          >
            <span className="level-num" aria-hidden="true">
              {lv.index + 1}
            </span>
            <span className="level-text">
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
