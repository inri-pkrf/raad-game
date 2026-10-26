import React from 'react';

export const INK = '#6B4F3A';
export const BOOK_COLORS = ['#7A3B2E', '#8A7240', '#3F5A4C', '#4A4F66', '#6B3F45', '#8B6A44'];
const BOOK_WIDTHS = [9, 7, 11, 8, 10, 7, 9];

// שורת ספרים קטנה
export function Books({ x, y, h, count = 6, offset = 0 }) {
  let cx = x;
  const books = [];
  for (let i = 0; i < count; i += 1) {
    const w = BOOK_WIDTHS[(i + offset) % BOOK_WIDTHS.length];
    const bh = h - ((i + offset) % 3) * 5;
    books.push(
      <rect
        key={i}
        x={cx}
        y={y + h - bh}
        width={w}
        height={bh}
        rx="1.5"
        fill={BOOK_COLORS[(i + offset) % BOOK_COLORS.length]}
        stroke="#14100c"
        strokeOpacity="0.5"
        strokeWidth="0.7"
      />
    );
    cx += w + 1;
  }
  return <g>{books}</g>;
}
