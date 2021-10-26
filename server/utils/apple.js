import { checkXY } from './snakes'
import { nanoid } from 'nanoid'
import { MAX_APPLE, SIZE_MAP, TYPE_APPLE } from '../configGame'


let APPLES = []

export const checkApple = (checkElement) => {
  let apple
  APPLES.forEach(e => {
    if (e.x === checkElement.x && e.y === checkElement.y) {
      apple = e
    }
  })
  return apple
}

export const createApple = () => {
  for (let i = MAX_APPLE; APPLES.length < i;) {
    APPLES.push(generateApple())
  }
  return APPLES
}

export const checkEatApple = (checkElement) => {
  const apple = checkApple(checkElement)
  if (apple) {
    APPLES = APPLES.filter((e) => apple.id!==e.id)
    return apple
  }
  return false
}

export const generateApple = () => {
  let appleTemp

  while (true) {
    const sizeApple = TYPE_APPLE[Math.floor(Math.random()*TYPE_APPLE.length)]
    const apple = {x: Math.floor(Math.random() * SIZE_MAP), y: Math.floor(Math.random() * SIZE_MAP), size: sizeApple, id: nanoid()}
    if (!checkXY(apple) && !checkApple(apple)) {
      appleTemp = apple
      break;
    }
  }
  return appleTemp;
}