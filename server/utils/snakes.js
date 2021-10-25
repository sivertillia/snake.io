import { maxApple } from './const'
import { generateApple } from './utils'

let SNAKES = []
let APPLES = []


export const addSnake = (data) => {
  SNAKES.push(data)
  return data
}

export const setSnake = (id, data) => {
  SNAKES = SNAKES.map(snake => {
    if (snake?.id === id) return { ...snake, position: data }
    return snake
  })
}

export const getSnake = (id) => {
  let snakeTemp
  SNAKES.map(snake => {
    if (snake?.id === id) snakeTemp = snake
  })
  return snakeTemp
}

export const delSnake = (id) => {
  SNAKES = SNAKES.filter(snake => snake?.id !== id)
}

export const allSnakes = (id) => {
  return SNAKES.filter(snake => snake?.id !== id)
}

export const checkXY = (checkElement) => {
  const array = []
  SNAKES.forEach(snake => array.push(...snake.position))
  return array.some(e => e.x === checkElement.x && e.y === checkElement.y)
}

export const checkApple = (checkElement) => {
  return APPLES.some(e => e.x === checkElement.x && e.y === checkElement.y)
}

export const createApple = () => {
  for (let i = maxApple; APPLES.length < i;) {
    APPLES.push(generateApple())
    console.log(APPLES.length)
    console.log('1111111111111111111111111111111111111111111111111', APPLES)
  }
  return APPLES
}

export const checkEatApple = (checkElement) => {
  if (checkApple(checkElement)) {
    APPLES = APPLES.filter((apple) => (apple.x !== checkElement.x && apple.y !== checkElement.y))
    return true
  }
  return false
}