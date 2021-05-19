import { epochToDate } from './dateFilters';
import { convertNumberToCircle } from './emojiFilters';

export const ymd = (dt) => {
  return epochToDate(dt);
};

export const percentCircle = (num) => {
  return convertNumberToCircle(num);
};
