import { generateSnake } from '../../utils/utils'
import { addSnake } from '../../utils/snakes'
import { createApple } from '../../utils/apple'
import { SIZE_MAP, SPEED } from '../../configGame'
const startGame = (socket, data, cb) => {
  const snake = generateSnake()
  const apples = createApple()
  const dataGame = {
    snake: {
      ...snake,
      id: socket.id,
      theme: data.theme,
      username: data.username,
      appleEat: 0,
      speed: SPEED,
    },
    map: {
      size: SIZE_MAP,
      apples: apples,
    }
  }
  addSnake(dataGame.snake)
  cb(dataGame)
}
export default startGame