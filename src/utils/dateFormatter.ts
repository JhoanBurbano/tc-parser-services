export const formatToDDMMYYYY = (date: string): string => {
  const [year, month, day] = date.split('/').map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error('Invalid date format');
  }
  return `${day}-${month}-${year}`;
};
