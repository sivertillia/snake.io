import { delSnake } from '../../utils/snakes'

const onDisconnect = (socket, reason) => {
  console.log(`Disconnect ${socket.id} ${reason}`)
  delSnake(socket.id)
}

export default onDisconnect