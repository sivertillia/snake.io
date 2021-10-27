import { SIZE_MAP, SIZE_SNAKE } from '../configGame'

export const generateSnake = () => {
  let body = []
  const directions = ['top', 'bottom', 'left', 'right']
  let direction
  while (true) {
    body = []
    direction = directions[Math.floor(Math.random() * directions.length)]
    body.push({x: Math.floor(Math.random() * SIZE_MAP), y: Math.floor(Math.random() * SIZE_MAP)})
    for (let i = 1; SIZE_SNAKE > i; i++) {
      switch (direction) {
        case 'top':
          body.push({x: body[0].x, y: body[0].y+i})
          break;
        case 'bottom':
          body.push({x: body[0].x, y: body[0].y-i})
          break;
        case 'left':
          body.push({x: body[0].x+i, y: body[0].y})
          break;
        case 'right':
          body.push({x: body[0].x-i, y: body[0].y})
          break;
      }
    }
    let restart = false
    for (const {x, y} of body) {
      if ((x >= SIZE_MAP || y >= SIZE_MAP || x <= 1 || y <= 1)) restart = true
    }
    if (restart) continue
    break;
  }

  return { position: body }
}

