/*
 * АФИША — редактируется клиентом/контент-менеджером (см. README).
 * Пустой массив = сайт автоматически показывает честный минимальный
 * режим BLK-PG1-03 («программа формируется»), не пустую сетку [UX 8].
 *
 * Формат даты: ISO (YYYY-MM-DD). Прошедшие события скрываются сами.
 * FACT-3: реальное расписание не передано клиентом — массив пуст.
 */

export type AfishaEvent = {
  date: string; // ISO
  time: string; // "20:00"
  title: string;
  genre?: string;
};

export const afisha: AfishaEvent[] = [];

export function upcoming(now = new Date()): AfishaEvent[] {
  const today = now.toISOString().slice(0, 10);
  return afisha
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}
