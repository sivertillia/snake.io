import { generateSnake } from '../../utils/utils'
import { snakes } from '../../utils/const'
const startGame = (socket, data, cb) => {
  console.log(data)
  const snake = generateSnake()
  const id = '1v2df31fd231df2312df3123'
  const newSnake = {
      ...snake,
      id: id,
      theme: data.theme,
      username: data.username,
  }
  snakes.push(newSnake)
  console.log(snakes)
  cb(newSnake)
}
export default startGame