import onDisconnect from './onDisconnect'
import startGame from './startGame'
import initMove from './initMove'

const services = (socket) => {
  return {
    startGame(data, cb) {
      return startGame(socket, data, cb)
    },
    initMove(data, cb) {
      return initMove(socket, data, cb)
    },
    onDisconnect(reason) {
      return onDisconnect(socket, reason)
    }
  }
}

export default services