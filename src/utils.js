import dayjs from 'dayjs';

//const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const shuffleArray = (array) => array
  .map((a) => ({ sort: Math.random(), value: a }))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value);

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


export {shuffleArray, getFormattingDate, getDuration};
