import { Canvas } from '../component/Canvas'
import { CANVAS_SIZE } from '../../core/constants'
import { useDispatch } from 'react-redux'

export const Game = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Canvas width={CANVAS_SIZE[0]} height={CANVAS_SIZE[1]} />
    </>
  )
}