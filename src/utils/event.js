import dayjs from 'dayjs';
import { SortType } from '../const';

const getFormattingDate = (date, format) => {
  if (date) {
    const result = dayjs(date).format(format);
    return result;
  }
  return '';
};

const getDuration = (dateFrom, dateTo) => {
  const minutes = String(dayjs(dateTo).diff(dayjs(dateFrom), 'minutes') % 60).padStart(2, '0');
  const hours = String(dayjs(dateTo).diff(dayjs(dateFrom), 'hours') % 24).padStart(2, '0');
  const days = String(dayjs(dateTo).diff(dayjs(dateFrom), 'days')).padStart(2, '0');
  if (days === 0 && hours === 0){
    return `${minutes}M`;
  } else if (days === 0) {
    return `${hours}H ${minutes}M`;
  }
  return `${days}D ${hours}H ${minutes}M`;
};

const SortRules = {
  [SortType.DAY]: (eventA, eventB) => dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom)),
  [SortType.TIME]: (eventA, eventB) => dayjs(eventA.dateFrom).diff(dayjs(eventA.dateTo)) - dayjs(eventB.dateFrom).diff(dayjs(eventB.dateTo)),
  [SortType.PRICE]: (eventA, eventB) => eventB.basePrice - eventA.basePrice,
};

export { getFormattingDate, getDuration, SortRules };
