export function getYear(d: Date) {
  return d.getFullYear();
}

export function getMonth(d: Date) {
  return d.getMonth();
}

export function getDate(d: Date) {
  return d.getDate();
}

export function getHours(d: Date) {
  return d.getHours();
}

export function getMinutes(d: Date) {
  return d.getMinutes();
}

export function getDayOfWeek(d: Date) {
  return d.getDay();
}

export function getDayStart(d: Date) {
  const dayStart = new Date(getYear(d), getMonth(d), getDate(d));
  dayStart.setHours(0, 0, 0, 0);
  return dayStart;
}

export function getDayEnd(d: Date) {
  const dayEnd = new Date(getYear(d), getMonth(d), getDate(d) + 1);
  dayEnd.setHours(0, 0, 0, -1);
  return dayEnd;
}

export function getMonthStart(d: Date) {
  return new Date(getYear(d), getMonth(d), 1);
}

export function getPreviousMonthStart(d: Date) {
  return new Date(getYear(d), getMonth(d) - 1, 1);
}

export function getNextMonthStart(d: Date) {
  return new Date(getYear(d), getMonth(d) + 1, 1);
}

export function getDaysInMonth(d: Date) {
  return new Date(getYear(d), getMonth(d) + 1, 0).getDate();
}

export function getPreviousDaysInMonth(d: Date) {
  return new Date(getYear(d), getMonth(d), 0).getDate();
}

export function getDatesInSixWeeks(d: Date) {
  const dates: Date[] = Array(42);

  const startDayOfWeek = getDayOfWeek(getMonthStart(d));
  const daysInMonth = getDaysInMonth(d);
  const previousDaysInMonth = getPreviousDaysInMonth(d);

  const year = getYear(d);
  const month = getMonth(d);

  let i = 0;
  for (let j = startDayOfWeek - 1; j >= 0; j--, i++) dates[i] = new Date(year, month - 1, previousDaysInMonth - j);
  for (let j = 1; j <= daysInMonth; j++, i++) dates[i] = new Date(year, month, j);
  for (let j = 1; i < 42; j++, i++) dates[i] = new Date(year, month + 1, j);

  return dates;
}

export function getCompareDate(d1: Date, d2: Date) {
  return d1.valueOf() - d2.valueOf();
}

export function isSameMonth(d1: Date, d2: Date) {
  return d1.getMonth() === d2.getMonth();
}

export function isSameDate(d1: Date, d2: Date) {
  return d1.valueOf() === d2.valueOf();
}

export function getFormatDate(d: Date, type: 'yyyy-MM-dd' | 'hh:mm' = 'yyyy-MM-dd') {
  if (type === 'yyyy-MM-dd') {
    return d.toISOString().slice(0, 10);
  }
  return `${getHours(d).toString().padStart(2, '0')}:${getMinutes(d).toString().padStart(2, '0')}`;
}
