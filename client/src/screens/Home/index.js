import React, { useEffect, useRef, useState } from 'react'
import bgPicture from '../../assets/bg_home.jpg'
import { Button, FormControl, InputLabel, MenuItem, NativeSelect, Select, styled, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { purple } from '@mui/material/colors'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../store/snake/themeSlice'
import { connect, startGameSocket } from '../../core/socket'
import { setSnake } from '../../store/snake/snakeSlice'
import { useHistory } from 'react-router-dom'
import { themes } from '../../core/constants'

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));


export const Home = () => {
  const usernameLocalStorage = localStorage.getItem('username')
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useSelector((state) => state.themeState.theme)
  const [username, setStateUsername] = useState(usernameLocalStorage ? usernameLocalStorage : '')
  const classes = useStyles()


  const handleTheme = (e) => {
    dispatch(setTheme(e.target.value))
  }

  const handleUsername = (e) => {
    setStateUsername(e.target.value)
    // dispatch(setTheme({head: 'red', body: 'yellow'}))
  }

  const clickStartGame = (e) => {
    localStorage.setItem('username', username)
    connect()
    startGameSocket({theme: theme, username: username, room: 'random'},(data) => {
      console.log(data)
      dispatch(setSnake(data))
      history.push('/game')
    })
  }

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <TextField label="Username" size="large" onChange={handleUsername} value={username} className={classes.inputUsername} />
        <FormControl sx={{ minWidth: 200 }} size="large">
          <InputLabel id="demo-simple-select-label">Theme</InputLabel>
          <Select
            defaultValue={theme}
            value={theme}
            // defaultValue={themes[0].value}
            label="Theme"
            onChange={handleTheme}
          >
            {themes.map((item, idx) => <MenuItem key={idx} value={item.value}>{item.label}</MenuItem>)}

          </Select>
        </FormControl>
        <ColorButton onClick={clickStartGame} size="large" variant="contained" >Start Game</ColorButton>
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
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    width: '25vh',
    height: '200px',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
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
}))


