export const convertNumberToCircle = (num) => {
  if (num >= 100) {
    return '🔔'; //'🚨'
  } else if (num < 100 && num >= 80) {
    return '🔴';
  } else if (num < 80 && num >= 60) {
    return '🟠';
  } else if (num < 60 && num >= 40) {
    return '🟡';
  } else if (num < 40 && num >= 20) {
    return '🟢';
  } else if (num < 20 && num > 0) {
    return '🔵';
  } else {
    return '⚫️';
  }
};
