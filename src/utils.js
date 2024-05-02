import dayjs from 'dayjs';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getFormattingDate = (date, format) => {
  if (date) {
    const result = dayjs(date).format(format);
    return result;
  }
  return '';
};

const getDuration = (dateFrom, dateTo) => {
  const duration = dayjs(dateTo).diff(dayjs(dateFrom), 'minutes');
  const minutes = duration % 60;
  const hours = Math.floor((duration % (60 * 24)) / 60);
  const days = Math.floor(duration / 60 / 24);

  //const result = (hours > 0) ? `${hours}H ${minutes}M` : `${minutes}M`;
  //return result;
  //TODO: Реализовать правильный формат вывода
  return `${days}D ${hours}H ${minutes}M`;
};


export {getRandomArrayElement, getFormattingDate, getDuration};
