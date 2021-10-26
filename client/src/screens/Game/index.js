import { Canvas } from '../component/Canvas'
import { CANVAS_SIZE, DIRECTIONS, DIRECTIONS_FUNC, SCALE } from '../../core/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useInterval } from '../../core/hook'
import { initMoveSocket } from '../../core/socket'
import { setSnake } from '../../store/snake/snakeSlice'
import { setRivalSnakes } from '../../store/snake/rivalSnakesSlice'
import { ListPlayers } from '../component/ListPlayers'
import { GameOver } from '../component/GameOver'

export const Game = () => {
  const snake = useSelector((state) => state.snakeState.snake)
  const rivalSnakes = useSelector((state) => state.rivalSnakesState.snakes)
  const [dir, setDir] = useState('')
  const [gameOver, setStateGameOver] = useState(false)
  const dispatch = useDispatch()

  useInterval(() => gameLoop(), snake.speed)

  const canvasRef = useRef(null)

  useEffect(async () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    generateGrid(ctx)
    renderRivalSnakes(ctx)
    renderSnake(ctx)
    renderApple(ctx)
    const snakeHeadX = snake.position[0]?.x
    const snakeHeadY = snake.position[0]?.y
    const snakeBodyX = snake.position[1]?.x
    const snakeBodyY = snake.position[1]?.y
    const dirText = DIRECTIONS_FUNC(
      [
        snakeHeadX === snakeBodyX ? 0 : snakeHeadX - snakeBodyX,
        snakeHeadY === snakeBodyY ? 0 : snakeHeadY - snakeBodyY,
      ]
    )
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
      ) return
      setDir(DIRECTIONS[keyCode])
    }
  }


  const renderSnake = (ctx) => {
    ctx.fillStyle = snake.theme?.head
    ctx.fillRect(snake.position[0]?.x, snake.position[0]?.y, 1, 1)
    ctx.fillStyle = snake.theme?.body
    snake.position.forEach(({ x, y }, index) => {
      if (index) ctx.fillRect(x, y, 1, 1)
    })
    // Render my name
    ctx.stroke()
    ctx.fillStyle = 'pink'
    ctx.font = 'bold 4% sans-serif'
    ctx.fillText('You', snake.position[0]?.x, snake.position[0]?.y)
  }

  const renderRivalSnakes = (ctx) => {
    rivalSnakes.forEach(rivalSnake => {
      ctx.fillStyle = rivalSnake.theme?.head
      ctx.fillRect(rivalSnake.position[0]?.x, rivalSnake.position[0]?.y, 1, 1)
      ctx.fillStyle = rivalSnake.theme?.body
      rivalSnake.position.forEach(({ x, y }, index) => {
        if (index) ctx.fillRect(x, y, 1, 1)
      })
      // render name rival
      ctx.stroke()
      ctx.fillStyle = 'pink'
      ctx.font = 'bold 4% sans-serif'
      ctx.fillText(rivalSnake.username, rivalSnake.position[0]?.x, rivalSnake.position[0]?.y)
    })
  }

  const renderApple = (ctx) => {
    const color = '#66CC33' // color Apple
    const colorText = '#000000' // color text
    snake.apples.forEach(({ x, y, size }) => {
      ctx.fillStyle = color
      ctx.fillRect(x, y, 1, 1)
      ctx.fillStyle = colorText
      ctx.font = 'bold 4% sans-serif'
      ctx.fillText(`+${size}`, x+0.1, y+0.7)
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
    initMoveSocket({ dir: dir }, (data) => {
      if (data.status) {
        dispatch(setSnake({ ...snake, position: data.snake, apples: data.apples }))
        dispatch(setRivalSnakes(data.rivalSnakes))
        return
      }
      setStateGameOver(true)
    })
  }

  return (
    <>
      <Canvas width={CANVAS_SIZE[0]} height={CANVAS_SIZE[1]} canvasRef={canvasRef} moveSnake={moveSnake} />
      <ListPlayers />
      <GameOver open={gameOver} />
    </>
  )
}