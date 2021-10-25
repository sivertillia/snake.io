import React, { useEffect, useRef, useState } from 'react'
import { DIRECTIONS, DIRECTIONS_FUNC, SCALE, SPEED } from '../../../core/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useInterval } from '../../../core/hook'
import { setSnake } from '../../../store/snake/snakeSlice'
import { getSnakes, initMoveSocket } from '../../../core/socket'
import { setRivalSnakes } from '../../../store/snake/rivalSnakesSlice'

export const Canvas = ({ width, height }) => {

  const snake = useSelector((state) => state.snakeState.snake)
  const rivalSnakes = useSelector((state) => state.rivalSnakesState.snakes)
  const [dir, setDir] = useState('')
  const dispatch = useDispatch()

  useInterval(() => gameLoop(), snake.speed)

  const canvasRef = useRef(null)

  useEffect(async () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    generateGrid(ctx)
    await generateRivalSnakes(ctx)
    generateSnake(ctx)
    const snakeHeadX = snake.position[0]?.x // 2
    const snakeHeadY = snake.position[0]?.y // 19
    const snakeBodyX = snake.position[1]?.x // 2
    const snakeBodyY = snake.position[1]?.y // 20
    const startDir = [
      snakeHeadX === snakeBodyX ? 0 : snakeHeadX - snakeBodyX,
      snakeHeadY === snakeBodyY ? 0 : snakeHeadY - snakeBodyY,
    ]
    const dirText = DIRECTIONS_FUNC(startDir)
    setDir(dirText)
    canvas.focus()
  }, [snake])

  const moveSnake = ({ keyCode }) => {
    if (keyCode >= 37 && keyCode <= 40 && DIRECTIONS[keyCode] !== dir) {
      if (
        (dir === 'up' && DIRECTIONS[keyCode] === 'down') ||
        (dir === 'down' && DIRECTIONS[keyCode] === 'up') ||
        (dir === 'left' && DIRECTIONS[keyCode] === 'right') ||
        (dir === 'right' && DIRECTIONS[keyCode] === 'left')
      ) {
        console.log('false')
        return
      }
      setDir(DIRECTIONS[keyCode])
    } else if (keyCode === 32) setDir('stop')
  }


  const generateSnake = (ctx) => {
    ctx.fillStyle = snake.theme?.head
    ctx.fillRect(snake.position[0]?.x, snake.position[0]?.y, 1, 1)
    ctx.fillStyle = snake.theme?.body
    snake.position.forEach(({ x, y }, index) => {
      if (index) ctx.fillRect(x, y, 1, 1)
    })
    ctx.fillStyle = '#66CC33'
    snake.apples.forEach(({ x, y }) => {
      ctx.fillRect(x, y, 1, 1)
      // ctx.stroke()
      // ctx.fillStyle = 'black'
      // // ctx.textAlign = 'center'
      // ctx.font = 'bold 4% sans-serif'
      // ctx.fillText('+1', x, y)
      // ctx.fill()
    })
    ctx.stroke()
    ctx.fillStyle = 'pink'
    // ctx.textAlign = 'center'
    ctx.font = 'bold 4% sans-serif'
    ctx.fillText('You', snake.position[0]?.x, snake.position[0]?.y)
  }

  const generateRivalSnakes = async (ctx) => {
    rivalSnakes.forEach(rivalSnake => {
      ctx.fillStyle = rivalSnake.theme?.head
      ctx.fillRect(rivalSnake.position[0]?.x, rivalSnake.position[0]?.y, 1, 1)
      ctx.fillStyle = rivalSnake.theme?.body
      rivalSnake.position.forEach(({ x, y }, index) => {
        if (index) ctx.fillRect(x, y, 1, 1)
      })
      ctx.stroke()
      ctx.fillStyle = 'pink'
      ctx.font = 'bold 4% sans-serif'
      ctx.fillText(rivalSnake.username, rivalSnake.position[0]?.x, rivalSnake.position[0]?.y)
    })
  }

  const generateGrid = (ctx) => {
    const color1 = '#313131'
    const color2 = '#000000'
    for (let i = 0; SCALE >= i; i++) {
      for (let k = 0; SCALE >= k; k++) {
        if (i % 2 === 0) {
          if (k % 2 === 0) {
            ctx.fillStyle = color1
            ctx.fillRect(k, i, 1, 1)
          } else {
            ctx.fillStyle = color2
            ctx.fillRect(k, i, 1, 1)
          }
        } else {
          if (k % 2 === 0) {
            ctx.fillStyle = color2
            ctx.fillRect(k, i, 1, 1)
          } else {
            ctx.fillStyle = color1
            ctx.fillRect(k, i, 1, 1)
          }
        }
      }
    }
  }

  const gameLoop = () => {
    initMoveSocket({ id: snake.id, dir: dir }, (data) => {
      if (data.status) {
        dispatch(setSnake({ ...snake, position: data.snake, apples: data.apples }))
        dispatch(setRivalSnakes(data.rivalSnakes))
        return
      }
      alert('Game Over')
      window.location.href = '/'
    })
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