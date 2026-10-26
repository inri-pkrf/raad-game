import * as home from './home';
import * as office from './office';
import * as outdoor from './outdoor';
import { HomeBg, OfficeBg, OutdoorBg } from './backgrounds';

export const TARGET = 5; // כמה חפצים מסוכנים צריך למצוא

export const ENVIRONMENTS = [
  {
    id: 'home',
    name: 'בית',
    desc: 'סלון בבית מגורים',
    tint: '#FFD9C2',
    Background: HomeBg,
    items: home.items,
  },
  {
    id: 'office',
    name: 'משרד',
    desc: 'חלל עבודה משותף',
    tint: '#D4F1DF',
    Background: OfficeBg,
    items: office.items,
  },
  {
    id: 'outdoor',
    name: 'בחוץ',
    desc: 'רחוב עירוני ושטח פתוח',
    tint: '#FFF0B8',
    Background: OutdoorBg,
    items: outdoor.items,
  },
];

export const LEVELS = [
  {
    id: 'easy',
    index: 0,
    name: 'קל',
    desc: 'פחות פריטים בתמונה, 3 רמזים, ללא הגבלת טעויות',
    hints: 3,
    lives: null,
  },
  {
    id: 'medium',
    index: 1,
    name: 'בינוני',
    desc: 'יותר פריטים בתמונה, רמז אחד, עד 5 טעויות',
    hints: 1,
    lives: 5,
  },
  {
    id: 'hard',
    index: 2,
    name: 'קשה',
    desc: 'מספר הפריטים המלא, ללא רמזים, עד 3 טעויות',
    hints: 0,
    lives: 3,
  },
];
