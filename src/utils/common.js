/**
 * Возвращает найденный элемент из массива объектов
 * @param {Array} items - исходный массив элементов
 * @param {any} value - искомое значение
 * @param {string} [field='id'] - поле в объекте для поиска
 * @returns {Object} найденный элемент массива (объект)
 */
const getArrayElement = (items, value, field = 'id') => items.find((element) => element[`${field}`] === value);

export {getArrayElement};
