import { generateSnake } from '../../utils/utils'
import { sizePlot } from '../../utils/const'

const onConnectGame = (socket) => {
  console.log(`Connect ${socket.id}`)
}

export default onConnectGame