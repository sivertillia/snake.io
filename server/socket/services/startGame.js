import { generateSnake } from '../../utils/utils'

const startGame = (socket, data, cb) => {
  const snake = generateSnake()
  cb(snake)
}
export default startGame