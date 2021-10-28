import { getSnake, setSnakeDir } from '../../utils/snakes'

const initMove = (socket, data) => {
  const snake = getSnake(socket.id)
  if (!snake) return
  if (!data.dir) return
  setSnakeDir(socket.id, data.dir)
}
export default initMove