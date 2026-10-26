import React from 'react';

export default function Modal({ children, onBackdrop, label }) {
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && onBackdrop) onBackdrop();
      }}
    >
      <div className="modal-card" role="dialog" aria-modal="true" aria-label={label}>
        {children}
      </div>
    </div>
  );
}
