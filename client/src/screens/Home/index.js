import React, { useEffect, useRef, useState } from 'react'
import bgPicture from '../../assets/bg_home.jpg'
import { Button, styled, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { purple } from '@mui/material/colors'
import { useDispatch } from 'react-redux'
import { connect, startGameSocket } from '../../core/socket'
import { setSnake } from '../../store/snake/snakeSlice'
import { useHistory } from 'react-router-dom'
import { useColor, ColorPicker } from 'react-color-palette'
import "react-color-palette/lib/css/styles.css"
import { useStorageState } from '../../core/hook'
import { setApples, setMapSize } from '../../store/snake/mapSlice'

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}))


export const Home = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setStateUsername] = useStorageState('username', 'Player')
  const colorHeadStorage = localStorage.getItem('colorHead')
  const colorBodyStorage = localStorage.getItem('colorBody')
  const [colorHead, setColorHead] = useColor('hex', !colorHeadStorage ? '#ff0000' : colorHeadStorage)
  const [colorBody, setColorBody] = useColor('hex', !colorBodyStorage ? '#000fff' : colorBodyStorage)
  const [openColorHead, setOpenColorHead] = useState(false)
  const [openColorBody, setOpenColorBody] = useState(false)
  const classes = useStyles()

  const handleUsername = (e) => setStateUsername(e.target.value)

  const handleClickHead = () => {
    setOpenColorHead(!openColorHead)
    setOpenColorBody(false)
  }
  const handleClickBody = () => {
    setOpenColorBody(!openColorBody)
    setOpenColorHead(false)
  }

  const clickStartGame = (e) => {
    localStorage.setItem('colorHead', colorHead.hex)
    localStorage.setItem('colorBody', colorBody.hex)
    connect(() => {
      startGameSocket({ theme: {head: colorHead.hex, body: colorBody.hex}, username: username, room: 'random' }, (data) => {
        console.log(data)
        dispatch(setSnake(data.snake))
        dispatch(setApples(data.map.apples))
        dispatch(setMapSize(data.map.size))
        history.push('/game')
      })
    })
  }

  return (
      <div className={classes.container}>
        <div>
          <div className={classes.snake}>
            <div onClick={handleClickHead} className={classes.snakeHead} style={{background: colorHead.hex}} />
            <div onClick={handleClickBody} className={classes.snakeBody} style={{background: colorBody.hex}} />
          </div>
        </div>
        <div className={classes.box}>
          <TextField label="Username" size="large" onChange={handleUsername} value={username}
                     className={classes.inputUsername}/>
          <p>Best score: {localStorage.getItem('score')}</p>
          <ColorButton onClick={clickStartGame} size="large" autoFocus variant="contained">Start Game</ColorButton>
        </div>
        <div className={classes.boxRGB}>
          {openColorHead ? <ColorPicker width={247} height={150} color={colorHead} onChange={setColorHead} hideHSV dark/> : null}
          {openColorBody ? <ColorPicker width={247} height={150} color={colorBody} onChange={setColorBody} hideHSV dark/> : null}
        </div>
      </div>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    background: `url(${bgPicture}) 100% no-repeat`,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    width: '25vh',
    height: '200px',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px'
  },
  buttonStart: {
    backgroundColor: 'red!important',
    color: 'red',
    // height: '50vh'
  },
  inputUsername: {
    m: 1,
    minWidth: 200,
  },
  snake: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  snakeHead: {
    width: 50,
    height: 50,
  },
  snakeBody: {
    width: 150,
    height: 50,
  },
  boxRGB: {
    position: 'absolute',
    right: '20%',
  }
}))


