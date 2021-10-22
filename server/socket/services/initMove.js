import { sizePlot } from '../../utils/const'

const initMove = (socket, data, cb) => {
  console.log(data)
  // const snake = generateSnake()
  if (data.position[0].x < 0 || data.position[0].y < 0 || data.position[0].x > sizePlot || data.position[0].y > sizePlot) {
    cb({
      status: false
    })
  } else {
    cb({
      status: true
    })
  }
}
export default initMove