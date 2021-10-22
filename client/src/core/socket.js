import io from 'socket.io-client'

let socket

export const connect = () => {
  socket = io('http://localhost:8000/')
  socket.on('connect', () => {
    console.log('Connect Socket')
  })
  socket.on('disconnect', () => {
    console.log('Disconnect Socket')
  })
}

export const startGameSocket = (payload, cb) => {
  socket.emit('game:start', payload, (data) => {
    cb(data)
  })
}

export const initMoveSocket = (payload, cb) => {
  socket.emit('game:move', payload, (data) => {
    cb(data)
  })
}