import onDisconnect from './onDisconnect'
import startGame from './startGame'

const services = (socket) => {
  return {
    startGame(data, cb) {
      return startGame(socket, data, cb)
    },
    onDisconnect(reason) {
      return onDisconnect(socket, reason)
    }
  }
}

export default services