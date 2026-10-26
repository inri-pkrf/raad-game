import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/assistant/400.css';
import '@fontsource/assistant/600.css';
import '@fontsource/assistant/700.css';
import '@fontsource/karantina/400.css';
import '@fontsource/karantina/700.css';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(<App />);

// במצב טוטם (הוסיפו ?kiosk=1 לכתובת) מסתירים את סמן העכבר
if (/[?&]kiosk=1/.test(window.location.search)) document.body.classList.add('kiosk-cursor');
