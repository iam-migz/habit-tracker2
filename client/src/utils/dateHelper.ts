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
