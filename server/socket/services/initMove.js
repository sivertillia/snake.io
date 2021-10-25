import { DIRECTIONS, sizePlot } from '../../utils/const'
import { allSnakes, checkEatApple, checkXY, createApple, delSnake, getSnake, setSnake } from '../../utils/snakes'

const initMove = (socket, data, cb) => {
  const snake = getSnake(socket.id)
  if (snake) {
    const dir = DIRECTIONS[data.dir]
    const snakeCopy = JSON.parse(JSON.stringify(snake.position))
    const newSnakeHead = {x: snakeCopy[0]?.x + dir[0], y: snakeCopy[0]?.y + dir[1]}
    snakeCopy.unshift(newSnakeHead)
    if (!checkEatApple(snakeCopy[0])) snakeCopy.pop()

    const snakes = allSnakes(socket.id)
    if (data.dir === 'stop') {
      console.log('stop')
      const apples = createApple()
      cb({
        status: true,
        snake: snake.position,
        rivalSnakes: snakes,
        apples: apples,
      })
      return
    }
    if (snakeCopy[0].x < 0 || snakeCopy[0].y < 0 || snakeCopy[0].x > sizePlot || snakeCopy[0].y > sizePlot || checkXY(snakeCopy[0])) {
      delSnake(socket.id)
      cb({
        status: false,
      })
    } else {
      setSnake(socket.id, snakeCopy)
      const apples = createApple()
      cb({
        status: true,
        snake: snakeCopy,
        rivalSnakes: snakes,
        apples: apples,
      })
    }
  }
}
export default initMove