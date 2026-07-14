/*
 * ГАЛЕРЕЯ (PG-5). Все фото — официальные, с rapsodia.ru (сняты
 * 12.07.2026, раздел «Галерея» и главная живого сайта). Подпись — по
 * факту, что на фото [COPY §5]. Новые фото: файл в public/photos/ +
 * запись сюда с реальными w/h (для масонри без обрезки).
 */

export type GalleryPhoto = {
  src: string;
  caption: string;
  w: number;
  h: number;
};

// Оригиналы: пейзаж 2500×1667, портрет 1667×2500.
const L = { w: 2500, h: 1667 };
const P = { w: 1667, h: 2500 };

export const gallery: GalleryPhoto[] = [
  { src: "/photos/scena-koncert.jpg", caption: "Сцена во время живого выступления", ...L },
  { src: "/photos/pech-ogon.jpg", caption: "Дровяная печь", ...L },
  { src: "/photos/blyuda-pekarnya.jpg", caption: "Блюда и хлеб из своей пекарни", ...P },
  { src: "/photos/kuhnya-pech.webp", caption: "Открытая кухня", ...L },
  { src: "/photos/zal-banket.webp", caption: "Зал в вечернем режиме", ...L },
  { src: "/photos/kommunalnyj-stol.webp", caption: "«Коммунальный» стол для компании", ...L },
  { src: "/photos/stol-vecher.jpg", caption: "Стол у сцены вечером", ...L },
  { src: "/photos/zal-dnem.webp", caption: "Зал днём", ...L },
  { src: "/photos/servirovka-vecher.webp", caption: "Сервировка перед вечером", ...L },
];
