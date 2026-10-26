// תמונות צילום לכל סביבה ורמת קושי.
// הקבצים נמצאים ב-public/images/ ושמם: <סביבה>-<רמה>.jpg (למשל home-easy.jpg).
// הקואורדינטות כאן הן בפיקסלים של התמונה עצמה (1000x1300), בלי קשר למסך.
// כל שורה: [מזהה חפץ, [x, y, רוחב, גובה]]. הסדר הוא מאחור לפנים: חפץ שמופיע
// בהמשך הרשימה יקבל את הלחיצה כשהאזורים חופפים.
// הטקסטים (כותרת, הסבר, טיפ) נלקחים מהחפץ עם אותו מזהה בקובצי home/office/outdoor.js.

export const PHOTO_SIZE = [1000, 1300];
export const SCENE_SIZE = [400, 520];

// אם חסרה תמונה לרמה מסוימת, משתמשים בתמונה אחרת במקומה.
export const PHOTO_FALLBACK = {
  'outdoor-medium': 'outdoor-easy',
};

// חפצים שמופיעים רק בתמונות ואין להם הגדרה בקובצי הסצנות.
export const EXTRA_ITEMS = {
  printer: {
    id: 'printer',
    kind: 'hazard',
    label: 'מדפסת כבדה על ארון',
    title: 'מדפסת כבדה על ארון גבוה',
    text: 'ציוד כבד שמונח גבוה על ארון עלול להחליק ולהישמט בזמן הרעידה, ולפגוע במי שנמצא מתחתיו.',
    tip: 'מניחים ציוד כבד נמוך, על שולחן יציב או בתחתית ארון, ומקבעים אותו.',
  },
};

export const PHOTOS = {
  'home-easy': [
    ['rug', [160, 872, 840, 400]],
    ['sofa', [0, 642, 264, 620]],
    ['bookcase', [0, 220, 152, 420]],
    ['window', [255, 260, 335, 495]],
    ['mirror', [833, 208, 124, 222]],
    ['lamp', [452, 0, 140, 205]],
    ['tv', [848, 428, 152, 530]],
    ['cushion', [695, 1005, 305, 168]],
  ],
  'home-medium': [
    ['rug', [170, 838, 830, 438]],
    ['sofa', [0, 610, 258, 600]],
    ['bookcase', [0, 248, 158, 392]],
    ['window', [253, 288, 305, 450]],
    ['lamp', [443, 12, 120, 248]],
    ['mirror', [773, 318, 84, 216]],
    ['shelf', [778, 148, 222, 160]],
    ['tv', [846, 430, 154, 480]],
    ['plant', [648, 578, 136, 208]],
    ['table', [348, 758, 322, 242]],
    ['cushion', [680, 972, 312, 172]],
  ],
  'home-hard': [
    ['rug', [0, 820, 1000, 430]],
    ['sofa', [0, 580, 250, 590]],
    ['bookcase', [0, 248, 152, 370]],
    ['window', [238, 290, 288, 428]],
    ['lamp', [418, 26, 118, 234]],
    ['mirror', [726, 318, 82, 208]],
    ['shelf', [738, 140, 262, 162]],
    ['ac', [866, 0, 134, 120]],
    ['tv', [840, 418, 160, 456]],
    ['plant', [598, 553, 130, 204]],
    ['table', [330, 735, 340, 275]],
    ['basket', [880, 828, 120, 212]],
    ['cushion', [678, 988, 300, 172]],
  ],
  'office-easy': [
    ['rug', [88, 1012, 912, 288]],
    ['glasswall', [0, 48, 126, 985]],
    ['ceilinglight', [126, 0, 750, 175]],
    ['wallscreen', [386, 226, 268, 158]],
    ['shelfboxes', [772, 176, 228, 190]],
    ['filecabinet', [185, 438, 172, 514]],
    ['desk', [345, 735, 655, 480]],
    ['chair', [590, 608, 282, 475]],
    ['plant', [58, 788, 142, 190]],
  ],
  'office-medium': [
    ['rug', [58, 1010, 942, 290]],
    ['glasswall', [0, 98, 98, 880]],
    ['ceilinglight', [98, 0, 780, 178]],
    ['wallscreen', [382, 228, 270, 156]],
    ['shelfboxes', [796, 180, 204, 188]],
    ['filecabinet', [250, 436, 152, 502]],
    ['watercooler', [118, 416, 116, 512]],
    ['desk', [378, 725, 622, 480]],
    ['chair', [535, 605, 265, 485]],
    ['bin', [288, 950, 115, 205]],
    ['plant', [8, 800, 142, 178]],
  ],
  'office-hard': [
    ['rug', [70, 1015, 930, 285]],
    ['glasswall', [0, 82, 110, 908]],
    ['ceilinglight', [110, 0, 770, 180]],
    ['wallscreen', [384, 230, 270, 158]],
    ['shelfboxes', [780, 160, 220, 210]],
    ['printer', [790, 370, 210, 128]],
    ['filecabinet', [246, 443, 146, 507]],
    ['watercooler', [128, 481, 102, 458]],
    ['desk', [265, 752, 735, 475]],
    ['chair', [483, 635, 270, 465]],
    ['bin', [183, 962, 120, 182]],
    ['laptop', [465, 678, 215, 115]],
    ['plant', [10, 812, 142, 180]],
  ],
  'outdoor-easy': [
    ['lawn', [0, 880, 1000, 420]],
    ['bench', [105, 915, 355, 175]],
    ['building', [118, 245, 672, 620]],
    ['streetlight', [0, 198, 76, 835]],
    ['tree', [598, 0, 402, 615]],
    ['powerpole', [440, 60, 95, 872]],
    ['sign', [785, 598, 92, 95]],
    ['bush', [575, 870, 425, 290]],
  ],
  'outdoor-hard': [
    ['lawn', [0, 880, 1000, 420]],
    ['bench', [118, 918, 350, 170]],
    ['building', [138, 243, 640, 622]],
    ['streetlight', [0, 196, 92, 838]],
    ['tree', [640, 0, 360, 600]],
    ['powerpole', [462, 60, 90, 885]],
    ['sign', [760, 596, 90, 76]],
    ['bush', [575, 880, 370, 270]],
  ],
};

// מחזיר את התמונה ואת החפצים הלחיצים שלה, או null אם אין תמונה (אז מוצג הציור).
export function getPhotoSetup(env, levelId) {
  const wanted = `${env.id}-${levelId}`;
  const key = PHOTOS[wanted] ? wanted : PHOTO_FALLBACK[wanted];
  if (!key || !PHOTOS[key]) return null;
  const sx = SCENE_SIZE[0] / PHOTO_SIZE[0];
  const sy = SCENE_SIZE[1] / PHOTO_SIZE[1];
  const url = `${process.env.PUBLIC_URL || ''}/images/${key}.jpg`;
  const items = PHOTOS[key]
    .map(([id, [x, y, w, h]]) => {
      const base = env.items.find((it) => it.id === id) || EXTRA_ITEMS[id];
      if (!base) return null;
      return { ...base, bbox: [x * sx, y * sy, w * sx, h * sy], photo: url };
    })
    .filter(Boolean);
  return { url, items };
}
