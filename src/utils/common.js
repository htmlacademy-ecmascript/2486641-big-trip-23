function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function getArrayElement(array, value, field = 'id') {
  return array.find((element) => element[`${field}`] === value);
}

export {updateItem, getArrayElement};
