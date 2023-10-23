export const toISO = (date) => {
  if (date instanceof Date) {
    return new Date(date).toISOString();
  }
  return date;
};
