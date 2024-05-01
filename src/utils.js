import dayjs from 'dayjs';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getFormattingDate = (date, format) => {
  if (date) {
    const result = dayjs(date).format(format);
    return result;
  }
  return '';
};

export {getRandomArrayElement, getFormattingDate};
