export const CANVAS_SIZE = [930, 930]
export const SCALE = 30
export const SPEED = 100

export const themes = [
  {label: 'Black/Green', value: {head: 'black', body: 'green'}},
  {label: 'Red/Yellow', value: {head: 'red', body: 'yellow'}},
  {label: 'Red/Black', value: {head: 'red', body: 'black'}},
]

export const snake = {
  head: [12, 10],
  direction: 'top',
  body: [
    [12, 11],
    [12, 12],
    [12, 13],
  ]
}


export const DIRECTIONS = {
  38: 'up', // up
  40: 'down', // down
  37: 'left', // left
  39: 'right' // right
};

export const DIRECTIONS_FUNC = (array) => {
  if (arraysAreEqual(array, [0, -1])) return 'up'
  if (arraysAreEqual(array, [0, 1])) return 'down'
  if (arraysAreEqual(array, [-1, 0])) return 'left'
  if (arraysAreEqual(array, [1, 0])) return 'right'
};

function arraysAreEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((_, i) => arr1[i] === arr2[i]);
}