import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@mui/styles'

export const ListPlayers = ({  }) => {
  const classes = useStyles()
  const snake = useSelector((state) => state.snakeState.snake)
  const rivalSnakes = useSelector((state) => state.rivalSnakesState.snakes)
  const [snakesAll, setSnakesAllState] = useState([])

  useEffect(() => {
    const array = [snake, ...rivalSnakes].sort((a, b) => b.position.length-a.position.length)
    setSnakesAllState(array)
  }, [snake])

  return (
    <div className={classes.box}>
      {snakesAll.map((sn, index) => {
        return (
          <div key={sn.id} className={classes.line}>
            <div>{index+1}.</div>
            <div className={snake.id === sn.id ? classes.lineMyPlayer : classes.linePlayer}>
              <div>{sn.username}</div>
              <div>{sn.position.length}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: '150px',
    height: '300px',
    border: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: 'rgba(255,255,255,0.70)',
    top: 5,
    right: 150,
  },
  linePlayer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  lineMyPlayer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    fontWeight: 'bold',

  },
  line: {
    display: 'flex',
    marginBottom: 5,
    borderBottom: 1,
    borderBottomStyle: 'solid',
  }
}))