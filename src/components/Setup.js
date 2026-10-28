import React from 'react';
import { ENVIRONMENTS, LEVELS } from '../scenes';
import { HomeIcon, OfficeIcon, OutdoorIcon, WaveIcon } from './Icons';

const ENV_ICONS = { home: HomeIcon, office: OfficeIcon, outdoor: OutdoorIcon };
const LEVEL_AMP = { easy: 3, medium: 7, hard: 11 };

export default function Setup({ envId, levelId, onEnv, onLevel, onPlay, onBack }) {
  return (
    <div className="screen setup">
      <button className="link-btn" onClick={onBack}>
        ← חזרה
      </button>

      <h1 className="title small">בחירת סביבה</h1>
      <div className="env-grid">
        {ENVIRONMENTS.map((env) => {
          const Icon = ENV_ICONS[env.id] || HomeIcon;
          const selected = envId === env.id;
          return (
            <button key={env.id} className={`env-tile ${selected ? 'selected' : ''}`} onClick={() => onEnv(env.id)} aria-pressed={selected}>
              <span className="env-ico">
                <Icon />
              </span>
              <strong>{env.name}</strong>
              <small>{env.desc}</small>
              <span className="tile-check" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <h1 className="title small">בחירת רמת קושי</h1>
      <div className="level-list">
        {LEVELS.map((lv) => {
          const selected = levelId === lv.id;
          return (
            <button key={lv.id} className={`level-row ${selected ? 'selected' : ''}`} onClick={() => onLevel(lv.id)} aria-pressed={selected}>
              <span className="level-wave">
                <WaveIcon amp={LEVEL_AMP[lv.id] || 5} />
              </span>
              <span className="level-text">
                <strong>{lv.name}</strong>
                <small>{lv.desc}</small>
              </span>
              <span className="tile-check" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <button className="btn btn-primary btn-xl" onClick={onPlay}>
        התחלה
      </button>
    </div>
  );
}
