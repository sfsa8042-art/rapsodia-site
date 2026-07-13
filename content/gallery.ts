/*
 * ГАЛЕРЕЯ (PG-5). Все фото — официальные, с rapsodia.ru (сняты
 * 12.07.2026, раздел «Галерея» и главная живого сайта). Подпись — по
 * факту, что на фото [COPY §5]. Новые фото: файл в public/photos/ +
 * запись сюда.
 */

export type GalleryPhoto = {
  src: string;
  caption: string;
};

export const gallery: GalleryPhoto[] = [
  { src: "/photos/pech-ogon.jpg", caption: "Дровяная печь" },
  { src: "/photos/kuhnya-pech.webp", caption: "Открытая кухня" },
  { src: "/photos/scena-koncert.jpg", caption: "Сцена во время живого выступления" },
  { src: "/photos/zal-banket.webp", caption: "Зал в вечернем режиме" },
  { src: "/photos/kommunalnyj-stol.webp", caption: "«Коммунальный» стол для компании" },
  { src: "/photos/zal-dnem.webp", caption: "Зал днём" },
  { src: "/photos/servirovka-vecher.webp", caption: "Сервировка перед вечером" },
  { src: "/photos/blyuda-pekarnya.jpg", caption: "Блюда и хлеб из своей пекарни" },
  { src: "/photos/stol-vecher.jpg", caption: "Стол у сцены вечером" },
];
