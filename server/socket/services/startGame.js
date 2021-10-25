import { generateSnake } from '../../utils/utils'
import { addSnake, createApple } from '../../utils/snakes'
const startGame = (socket, data, cb) => {
  const snake = generateSnake()
  const apples = createApple()
  const newSnake = addSnake({
    ...snake,
    id: socket.id,
    theme: data.theme,
    username: data.username,
    apples: apples
  })
  cb(newSnake)
}
export default startGame