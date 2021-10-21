import React, { useEffect, useRef, useState } from 'react'
import { DIRECTIONS, SCALE, SPEED } from '../../core/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useInterval } from '../../core/hook'
import { setSnake } from '../../store/snake/snakeSlice'
// import { snakeSlice } from '../../store/snake/snakeSlice'

export const Canvas = ({ width, height }) => {

  const snake = useSelector((state) => state.snakeState.snake)
  const [dir, setDir] = useState([])
  const dispatch = useDispatch()

  useInterval(() => gameLoop(), snake.speed)

  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    generateSnake(ctx)
    const snakeHeadX = snake.position[0]?.x; // 2
    const snakeHeadY = snake.position[0]?.y; // 19
    const snakeBodyX = snake.position[1]?.x; // 2
    const snakeBodyY = snake.position[1]?.y; // 20
    const startDir = [
      snakeHeadX === snakeBodyX ? 0 : snakeHeadX - snakeBodyX,
      snakeHeadY === snakeBodyY ? 0 : snakeHeadY - snakeBodyY,
    ]
    setDir(startDir)
    canvas.focus()
  }, [snake])

  const moveSnake = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode])

  const generateSnake = (ctx) => {
    ctx.fillStyle = 'black'
    ctx.fillRect(snake.position[0]?.x, snake.position[0]?.y, 1, 1)
    ctx.fillStyle = 'green'
    snake.position.forEach(({ x, y }, index) => {
      if (index) ctx.fillRect(x, y, 1, 1)
    })
  }

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake.position))
    const newSnakeHead = {x: snakeCopy[0]?.x + dir[0], y: snakeCopy[0]?.y + dir[1]}
    snakeCopy.unshift(newSnakeHead)
    snakeCopy.pop()
    dispatch(setSnake({ position: snakeCopy, speed: snake.speed }))
    //  if (checkCollision(newSnakeHead)) endGame();
    //  if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();


  }

  return (
    <canvas tabIndex="0" onKeyDown={moveSnake} style={styleCanvas} ref={canvasRef} width={width} height={height}/>
  )
}

const styleCanvas = {
  border: 1,
  borderColor: 'black',
  borderStyle: 'solid',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
}