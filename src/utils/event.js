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

function sortByDay(eventA, eventB) {
  return dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
}

function sortByTime(eventA, eventB) {
  return dayjs(eventA.dateFrom).diff(dayjs(eventA.dateTo)) - dayjs(eventB.dateFrom).diff(dayjs(eventB.dateTo));
}

function sortByPrice(eventA, eventB) {
  return eventB.basePrice - eventA.basePrice;
}

export { getFormattingDate, getDuration, sortByDay, sortByPrice, sortByTime };
