# Рапсодия — сайт ресторана (rapsodia.ru)

Реализация Design System Package v2 (`Design_System_Rapsodia_v2.md`).
Стек: Next.js 16 (App Router, статическая генерация) + Tailwind CSS 4 +
TypeScript. Формы → Telegram Bot API. Развёрнутый отчёт этапа —
`Development_Rapsodia.md` (в пакете документов проекта).

## Поднять

```bash
npm install
cp .env.example .env.local   # заполнить TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID
npm run dev                  # http://localhost:3010
npm run build && npm start   # продакшн
```

`NEXT_PUBLIC_NOINDEX=1` — закрывает окружение от индексации (обязателен на
staging, убрать на проде).

## Структура = дизайн-система

| Слой | Где | Якоря |
|---|---|---|
| Токены | `app/globals.css` (`:root` / `[data-theme=dark]` / `@theme`) | DS §2, имена 1:1 |
| Компоненты | `components/` | CMP-1 Button (`ui.tsx`), CMP-2 Sticky CTA (`Header.tsx`+`MobileActionBar.tsx`), CMP-3 (`FormField.tsx`), CMP-4 (`MediaModule.tsx`), CMP-5 (`EventCard.tsx`), CMP-6 (`TeaserCard.tsx`), CMP-7 (`ui.tsx` GrillDivider), CMP-8 ссылки, CMP-9 (`Header/Footer.tsx`) |
| Блоки | `blocks/pg1.tsx`, `blocks/pg2.tsx` | BLK-PG1-01…07, BLK-PG2-01…05 |
| Страницы | `app/*/page.tsx` | PG-1 `/`, PG-2 `/banket`, PG-3 `/menu`, PG-4 `/afisha`, PG-5 `/galereya`, PG-6 `/o-nas`, PG-7 `/kontakty` |
| Тексты | `lib/content.ts` | Copywriting дословно — здесь НЕ редактировать смысл, только слоты FACT |

## Что редактирует клиент (контент, без разработчика)

- **Афиша** — `content/afisha.ts`: добавить объект `{date, time, title, genre}`.
  Пустой массив → сайт сам показывает честный режим «программа формируется».
  Прошедшие даты скрываются автоматически. Текущее наполнение снято с
  официального Telegram-канала (@fazendazel, пост «Афиша творческих
  вечеров на июль» от 12.07.2026) — на самой странице /afisha живого сайта
  дат нет, реальное расписание ведётся в Telegram.
- **Меню** — `content/menu.ts`: секции и позиции по правилам в комментарии.
- **Галерея** — фото в `public/gallery/` + запись в `content/gallery.ts`.
- **SLA ответа** (FACT-6) — `lib/content.ts` → `facts.sla`: заменить
  «в ближайшее время» на реальный срок; проставится в 3 местах сразу.
- **Карта и маршрут** — `lib/content.ts` → `site.yandexMap` (iframe
  карты-конструктора с меткой) и `site.yandexRoute` (маршрут к точке).
  Оба URL — официальные, сняты с живого rapsodia.ru (Яндекс.Карты
  oid=85995976245). Карта на `/kontakty` грузится `loading="lazy"`.

## Меню

Позиции в `content/menu.ts` — **официальный PDF клиента**
(`menyu-kuhni-rapsodiya-new.pdf` с rapsodia.ru, снят 12.07.2026):
7 разделов, 45 позиций, названия дословно. Сопоставление вес↔цена —
по порядку колонок PDF; **сверить с клиентом при приёмке** (CR-2).
Обновление меню — правка этого файла, страница пересобирается сама.

## Фотографии

Все фото в `public/photos/` — **официальные фотографии заведения,
скачанные с официального сайта rapsodia.ru** (главная и раздел «Галерея»,
сняты 12.07.2026, оригиналы 2500×1667): дровяная печь с огнём (hero),
открытая кухня, сцена во время выступления, зал, «коммунальный» стол,
сервировка, блюда. Тяжёлые PNG пережаты в JPEG q85 как источники —
next/image раздаёт AVIF/WebP нужных размеров сам.

**Чего нет и что осталось заглушкой:** фото детской комнаты и летней
веранды на официальных ресурсах отсутствуют — для них в текущих блоках
нет медиа-слотов, при появлении слота использовать вариант `missing`
CMP-4 (аккуратный placeholder «Съёмка готовится»), НЕ случайные фото из
интернета. Фото из VK-группы не выгружались (нет программного доступа
без API-ключа) — при необходимости запросить оригиналы у клиента.
Процессная съёмка «руки повара у гриля» по ТЗ Visual Direction §9
по-прежнему желательна — печь с огнём закрывает долг частично.

Всё остальное (тексты блоков, токены) — только через разработчика,
с оглядкой на пакеты Copywriting/Design System.

## Как собрать новую страницу

1. Файл `app/<путь>/page.tsx` с `metadata` (title/description/canonical).
2. Собрать из блоков/компонентов: секции `section-loose|base|dense`
   (ритм DS F2), заголовки `type-h2`, текст `type-body`, цифры
   `type-numeric`, разделы через `<GrillDivider/>`.
3. Один Primary на экран (CTA-закон): `ButtonLink`/`Button` variant
   по умолчанию primary — второй на странице только secondary/tertiary.
4. Добавить маршрут в `app/sitemap.ts` и (при необходимости) в `nav`
   (`lib/content.ts`).

## Как обновить токен

Единственное место — `app/globals.css`. Цвет: пара значений
(`:root` + `[data-theme=dark]`), у каждой пары в комментарии — измеренный
контраст; меняя значение, пересчитай пару (WCAG: текст ≥4.5:1, UI ≥3:1).
Хардкод значений в компонентах запрещён.

## Формы

FRM-1 `/api/booking`, FRM-2 `/api/banket`: серверная валидация, honeypot
(`website`) + порог 3 сек, доставка в Telegram (`lib/telegram.ts`).
При отказе Telegram пользователь видит ошибку с телефоном ресторана —
лид не теряется молча. Аналитика: события `frm*_submit/success/error`,
`cta_*` пушатся в `window.dataLayer` (`lib/track.ts`) — подключение
Метрики/GTM не требует правок компонентов.
