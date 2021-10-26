import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@mui/styles'
import { Box, Button, Modal, Typography } from '@mui/material'

export const GameOver = ({ open }) => {
  const classes = useStyles()
  const snake = useSelector((state) => state.snakeState.snake)

  const handleClickHomePage = () => {
    window.location.href = '/'
  }

  return (
    <Modal
      open={open}
      onClose={false}
      disableAutoFocus
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Game Over
        </Typography>
        <Box className={classes.gameOver}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Snake size: {snake.position.length}
          </Typography>
          <Button variant="outlined" autoFocus onClick={handleClickHomePage}>Home Page</Button>
        </Box>
      </Box>
    </Modal>
  )
}

const useStyles = makeStyles(() => ({
  gameOver: {
    display: 'flex',
    flexDirection: 'column',
    '&>button': {
      alignSelf: 'flex-end',
    }
  }
}))

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: '#ffffff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}