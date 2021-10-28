import { Canvas } from '../component/Canvas'
import { CANVAS_SIZE, DIRECTIONS, DIRECTIONS_FUNC } from '../../core/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { getSnakeDataSocket, initMoveSocket } from '../../core/socket'
import { setSnake } from '../../store/snake/snakeSlice'
import { setRivalSnakes } from '../../store/snake/rivalSnakesSlice'
import { ListPlayers } from '../component/ListPlayers'
import { GameOver } from '../component/GameOver'
import { setApples } from '../../store/snake/mapSlice'

export const Game = () => {
  const snake = useSelector((state) => state.snakeState.snake)
  const rivalSnakes = useSelector((state) => state.rivalSnakesState.snakes)
  const MAP_SIZE = useSelector((state) => state.mapState.MAP_SIZE)
  const apples = useSelector((state) => state.mapState.apples)
  const [gameOver, setStateGameOver] = useState(false)
  const dispatch = useDispatch()
  const [sizeCamera, setSizeCamera] = useState(30)
  const [headSnake, setHead] = useState({ x: 50, y: 50 })


  const canvasRef = useRef(null)

  useEffect(() => {
    getSnakeDataSocket((data, id) => {
      const rivalSnakes = []
      let mySnake
      data.snakes.forEach((snake) => {
        if (snake.id === id) return mySnake = snake
        rivalSnakes.push(snake)
      })
      if (!mySnake) {
        const score = localStorage.getItem('score')
        if (score < snake.position.length) localStorage.setItem('score', snake.position.length)
        setStateGameOver(true)
        return
      }
      dispatch(setRivalSnakes(rivalSnakes))
      dispatch(setSnake(mySnake))
      setHead(mySnake.position[0])
      dispatch(setApples(data.apples))
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    ctx.setTransform(sizeCamera, 0, 0, sizeCamera, 0, 0)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    const pos = getCenterSnake()
    ctx.translate(pos.x, pos.y)
    generateGrid(ctx)
    renderRivalSnakes(ctx)
    renderSnake(ctx)
    renderApple(ctx)
    canvas.focus()
  }, [snake])

  const moveSnake = ({ keyCode }) => {
    if (keyCode >= 37 && keyCode <= 40) {
      initMoveSocket({ dir: DIRECTIONS[keyCode] })
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
    apples.forEach(({ x, y, size }) => {
      ctx.fillStyle = color
      ctx.fillRect(x, y, 1, 1)
      ctx.fillStyle = colorText
      ctx.font = 'bold 4% sans-serif'
      ctx.fillText(`+${size}`, x + 0.1, y + 0.7)
    })
  }

  const generateGrid = (ctx) => {
    const color1 = 'rgba(49,49,49,0.1)'
    const color2 = 'rgba(0,0,0,0.1)'
    for (let i = 0; MAP_SIZE >= i; i++) {
      ctx.fillStyle = color2
      ctx.fillRect(i, -1, 1, 1)
      ctx.fillRect(i, -2, 1, 1)
      ctx.fillRect(i, MAP_SIZE + 1, 1, 1)
      ctx.fillRect(i, MAP_SIZE + 2, 1, 1)
    }
    for (let i = 0; MAP_SIZE >= i; i++) {
      ctx.fillStyle = color2
      ctx.fillRect(-1, i, 1, 1)
      ctx.fillRect(-2, i, 1, 1)
      ctx.fillRect(MAP_SIZE + 1, i, 1, 1)
      ctx.fillRect(MAP_SIZE + 2, i, 1, 1)
    }
    // for (let i = 0; MAP_SIZE >= i; i++) {
    //   for (let k = 0; MAP_SIZE >= k; k++) {
    //     if (i % 2 === 0) {
    //       if (k % 2 === 0) {
    //         ctx.fillStyle = color1
    //         ctx.fillRect(k, i, 1, 1)
    //       } else {
    //         ctx.fillStyle = color2
    //         ctx.fillRect(k, i, 1, 1)
    //       }
    //     } else {
    //       if (k % 2 === 0) {
    //         ctx.fillStyle = color2
    //         ctx.fillRect(k, i, 1, 1)
    //       } else {
    //         ctx.fillStyle = color1
    //         ctx.fillRect(k, i, 1, 1)
    //       }
    //     }
    //   }
    // }
  }

  const getCenterSnake = () => {
    let xLeftTop = -headSnake.x + (window.innerWidth / 2) / sizeCamera - 2
    let yLeftTop = -headSnake.y + (window.innerHeight / 2) / sizeCamera
    if (xLeftTop > 2) xLeftTop = 2
    if (yLeftTop > 2) yLeftTop = 2
    let xRightTop = xLeftTop - (window.innerWidth / sizeCamera)
    let yRightBottom = yLeftTop - (window.innerHeight / sizeCamera)
    if (-xRightTop > MAP_SIZE + 2) xLeftTop = (window.innerWidth / sizeCamera - 3) - MAP_SIZE
    if (-yRightBottom > MAP_SIZE + 2) yLeftTop = (window.innerHeight / sizeCamera - 3) - MAP_SIZE
    return { x: xLeftTop, y: yLeftTop }
  }

  return (
    <>
      <Canvas width={CANVAS_SIZE[0]} height={CANVAS_SIZE[1]} canvasRef={canvasRef} moveSnake={moveSnake}/>
      <ListPlayers/>
      <GameOver open={gameOver}/>
    </>
  )
}