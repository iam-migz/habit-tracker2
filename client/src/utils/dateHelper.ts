export function getDatesInMonth(month: number, year: number, currDay: number) {
  const dates: Date[] = [];
  const dateCtr = new Date(year, month, currDay);
  while (dateCtr.getMonth() === month && currDay >= dateCtr.getDate()) {
    dates.push(new Date(dateCtr));
    dateCtr.setDate(dateCtr.getDate() - 1);
  }
  return dates;
}

export function getDayName(date: Date) {
  return date.toLocaleDateString('en-PH', { weekday: 'short' });
}

export function getMonthName(date: Date) {
  return date.toLocaleDateString('en-PH', { month: 'long' });
}
