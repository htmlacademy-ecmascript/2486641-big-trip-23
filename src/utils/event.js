import dayjs from 'dayjs';

const getFormattingDate = (date, format) => {
  if (date) {
    const result = dayjs(date).format(format);
    return result;
  }
  return '';
};

const getDuration = (dateFrom, dateTo) => {
  const minutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minutes') % 60;
  const hours = dayjs(dateTo).diff(dayjs(dateFrom), 'hours') % 24;
  const days = dayjs(dateTo).diff(dayjs(dateFrom), 'days');
  if (days === 0 && hours === 0){
    return `${minutes}M`;
  } else if (days === 0) {
    return `${hours}H ${minutes}M`;
  }
  return `${days}D ${hours}H ${minutes}M`;
};

const sortByDay = (eventA, eventB) => dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));

const sortByTime = (eventA, eventB) => dayjs(eventA.dateFrom).diff(dayjs(eventA.dateTo)) - dayjs(eventB.dateFrom).diff(dayjs(eventB.dateTo));

const sortByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

export { getFormattingDate, getDuration, sortByDay, sortByPrice, sortByTime };
