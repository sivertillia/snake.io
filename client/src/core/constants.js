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
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};