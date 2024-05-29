/**
 * Возвращает найденый элемент из массива объектов
 * @param {Array} array - исходный массив
 * @param {any} value - искомое значение
 * @param {string} [field='id'] - поле в объекте для поиска
 * @returns {Object} найденный элемент массива (объект)
 */
const getArrayElement = (array, value, field = 'id') => array.find((element) => element[`${field}`] === value);

export {getArrayElement};
