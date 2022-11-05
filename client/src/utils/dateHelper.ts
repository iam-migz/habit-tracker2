export function getDayName(date: Date): string {
  return date.toLocaleDateString('en-PH', { weekday: 'short' });
}

export function getMonthName(date: Date): string {
  return date.toLocaleDateString('en-PH', { month: 'long' });
}

// returns all the dates in a given month
export function getDatesInMonth(
  month: number,
  year: number,
  currDay: number,
): Date[] {
  const dates: Date[] = [];
  const dateCtr = new Date(year, month, currDay);
  while (dateCtr.getMonth() === month && currDay >= dateCtr.getDate()) {
    dates.push(new Date(dateCtr));
    dateCtr.setDate(dateCtr.getDate() - 1);
  }
  return dates;
}

export function getLastDayInPreviousMonth(dates: Date[]): Date {
  const lastElem = dates[dates.length - 1];
  const lastDate = new Date(lastElem);
  // third param day 0 goes back 1 day
  const previousMonth = new Date(
    lastDate.getFullYear(),
    lastDate.getMonth(),
    0,
  );
  return previousMonth;
}

export function areDatesConsecutive(a: Date, b: Date): boolean {
  return (
    Date.parse(new Date(b).toString()) - Date.parse(new Date(a).toString()) ===
    86400000
  );
}

// not including time in comparing dates
export function areDatesEqual(a: Date, b: Date): boolean {
  const ADate = new Date(a);
  const BDate = new Date(b);
  return (
    ADate.getFullYear() === BDate.getFullYear() &&
    ADate.getDate() === BDate.getDate()
  );
}
