export const epochToDate = (dt) => {
  let newYear = new Date(dt * 1000).getFullYear();
  let newMonth = new Date(dt * 1000).getMonth() + 1;
  let newDay = new Date(dt * 1000).getDate();
  return [
    newYear,
    newMonth.toString().padStart(2, '0'),
    newDay.toString().padStart(2, '0'),
  ].join('-');
};
