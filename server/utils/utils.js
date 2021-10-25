import { sizePlot, sizeSnake } from './const'
import { checkApple, checkXY } from './snakes'

export const generateSnake = () => {
  let body = []
  const directions = ['top', 'bottom', 'left', 'right']
  let direction
  while (true) {
    body = []
    direction = directions[Math.floor(Math.random() * directions.length)]
    body.push({x: Math.floor(Math.random() * sizePlot), y: Math.floor(Math.random() * sizePlot)})
    for (let i = 1; sizeSnake > i; i++) {
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
      if ((x >= sizePlot || y >= sizePlot || x <= 1 || y <= 1)) restart = true
    }
    if (restart) continue
    break;
  }

  return { position: body, speed: 250 }
}

export const generateApple = () => {
  let appleTemp
  while (true) {
    const apple = {x: Math.floor(Math.random() * sizePlot), y: Math.floor(Math.random() * sizePlot)}
    if (!checkXY(apple) && !checkApple(apple)) {
      appleTemp = apple
      break;
    }
  }
  return appleTemp;
}