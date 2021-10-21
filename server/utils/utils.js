import { sizePlot } from './const'

export const generateSnake = () => {
  let body = []
  const directions = ['top', 'bottom', 'left', 'right']
  let head
  let direction
  while (true) {
    body = []
    direction = directions[Math.floor(Math.random() * directions.length)]
    body.push({x: Math.floor(Math.random() * sizePlot), y: Math.floor(Math.random() * sizePlot)})
    switch (direction) {
      case 'top':
        body.push({x: body[0].x, y: body[0].y+1})
        body.push({x: body[0].x, y: body[0].y+2})
        body.push({x: body[0].x, y: body[0].y+3})
        break;
      case 'bottom':
        body.push({x: body[0].x, y: body[0].y-1})
        body.push({x: body[0].x, y: body[0].y-2})
        body.push({x: body[0].x, y: body[0].y-3})
        break;
      case 'left':
        body.push({x: body[0].x+1, y: body[0].y})
        body.push({x: body[0].x+2, y: body[0].y})
        body.push({x: body[0].x+3, y: body[0].y})
        break;
      case 'right':
        body.push({x: body[0].x-1, y: body[0].y})
        body.push({x: body[0].x-2, y: body[0].y})
        body.push({x: body[0].x-3, y: body[0].y})
        break;
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