import './App.css';
import { Canvas } from './component/Canvas'
import { CANVAS_SIZE } from './core/constants'
import { connect, startGameSocket } from './core/socket'
import { useDispatch, useSelector } from 'react-redux'
import { setSnake } from './store/snake/snakeSlice'
function App() {
  const dispatch = useDispatch()
  const startGame = () => {
    connect()
    startGameSocket((data) => {
      dispatch(setSnake(data))
      console.log(data)
    })
  }
  return (
    <>
      <Canvas width={CANVAS_SIZE[0]} height={CANVAS_SIZE[1]} />
      <button onClick={startGame}>Start Game</button>
    </>
  );
}

export default App;
