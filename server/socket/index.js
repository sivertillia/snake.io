import service from './services'
import onConnectGame from './services/onConnectGame'

export const onConnect = async (socket) => {
  const services = service(socket)
  await onConnectGame(socket)
  socket.on('game:start', services.startGame)
  socket.on('disconnecting', services.onDisconnect)
}