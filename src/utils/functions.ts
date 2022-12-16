export function getHoursDiff(startDate, endDate) {
  const msInHour = 1000 * 60 * 60;

  return Math.round(Math.abs(endDate - startDate) / msInHour);
}
