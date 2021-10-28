import { DIRECTIONS } from '../../utils/const'
import { checkXY, delSnake, getSnake, setSnake } from '../../utils/snakes'
import { checkEatApple, createApple } from '../../utils/apple'
import { SIZE_MAP } from '../../configGame'

const emitMove = (socket) => {
  const snake = getSnake(socket.id)
  if (!snake) return
  const dir = DIRECTIONS[snake.dir]
  if (!dir) return
  const snakeCopy = JSON.parse(JSON.stringify(snake.position))
  let appleEat = snake.appleEat
  const newSnakeHead = { x: snakeCopy[0]?.x + dir[0], y: snakeCopy[0]?.y + dir[1] }
  snakeCopy.unshift(newSnakeHead)
  const apple = checkEatApple(snakeCopy[0])
  if (apple) appleEat += apple.size
  if (!apple && !appleEat) snakeCopy.pop()
  if (
    snakeCopy[0].x < 0 || snakeCopy[0].y < 0 ||
    snakeCopy[0].x > SIZE_MAP || snakeCopy[0].y > SIZE_MAP ||
    checkXY(snakeCopy[0])
  ) {
    delSnake(socket.id)
  } else {
    setSnake(socket.id, snakeCopy, appleEat - 1)
    createApple()
  }
}
export default emitMove