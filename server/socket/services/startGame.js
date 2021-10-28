import { DIRECTIONS_FUNC, generateSnake } from '../../utils/utils'
import { addSnake, getAllSnakes, getSnake } from '../../utils/snakes'
import { createApple } from '../../utils/apple'
import { SIZE_MAP, SPEED } from '../../configGame'
import emitMove from './emitMove'
const startGame = (socket, data, cb) => {
  const snake = generateSnake()
  const apples = createApple()
  const snakeHeadX = snake.position[0]?.x
  const snakeHeadY = snake.position[0]?.y
  const snakeBodyX = snake.position[1]?.x
  const snakeBodyY = snake.position[1]?.y
  const dataGame = {
    snake: {
      ...snake,
      id: socket.id,
      theme: data.theme,
      username: data.username,
      appleEat: 0,
      speed: SPEED,
      dir: DIRECTIONS_FUNC([
        snakeHeadX === snakeBodyX ? 0 : snakeHeadX - snakeBodyX,
        snakeHeadY === snakeBodyY ? 0 : snakeHeadY - snakeBodyY,
      ])
    },
    map: {
      size: SIZE_MAP,
      apples: apples,
    }
  }
  addSnake(dataGame.snake)
  cb(dataGame)
  const timer = setInterval(() => {
    if (!getAllSnakes().length) {
      clearInterval(timer)
      return
    }
    emitMove(socket)
  }, getSnake(socket.id).speed)
}
export default startGame