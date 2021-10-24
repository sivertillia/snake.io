import { DIRECTIONS, sizePlot, snakes } from '../../utils/const'

const initMove = (socket, data, cb) => {
  console.log(data)
  const snake = snakes.filter(snakeOne => snakeOne.id === data.id)
  console.log('Snake:', snake)
  const dir = DIRECTIONS[data.dir]
  const snakeCopy = JSON.parse(JSON.stringify(snake[0].position))
  const newSnakeHead = {x: snakeCopy[0]?.x + dir[0], y: snakeCopy[0]?.y + dir[1]}
  snakeCopy.unshift(newSnakeHead)
  snakeCopy.pop()
  snake[0].position = snakeCopy
  if (snakeCopy[0].x < 0 || snakeCopy[0].y < 0 || snakeCopy[0].x > sizePlot || snakeCopy[0].y > sizePlot) {
    snake[0] = null
    cb({
      status: false,
    })
  } else {
    cb({
      status: true,
      snake: snakeCopy,
    })
  }
}
export default initMove