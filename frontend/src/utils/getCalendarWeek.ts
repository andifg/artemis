function getCalendarWeek(date: Date): string {
  const tempDate = new Date(date.getTime());
  tempDate.setHours(0, 0, 0, 0);

  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));

  const firstThursday = new Date(tempDate.getFullYear(), 0, 1);

  const weekNumber = Math.ceil(
    ((tempDate.getTime() - firstThursday.getTime()) / 86400000 + 1) / 7,
  );

  return String(weekNumber);
}

export { getCalendarWeek };
