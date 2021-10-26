import { generateSnake } from '../../utils/utils'
import { addSnake } from '../../utils/snakes'
import { createApple } from '../../utils/apple'
const startGame = (socket, data, cb) => {
  const snake = generateSnake()
  const apples = createApple()
  const newSnake = addSnake({
    ...snake,
    id: socket.id,
    theme: data.theme,
    username: data.username,
    apples: apples,
    appleEat: 0,
  })
  cb(newSnake)
}
export default startGame