import io from 'socket.io-client'

let socket

export const connect = (callback) => {
  // socket = io('http://localhost:8000/')
  socket = io('http://192.168.1.143:8000/')
  socket.on('connect', () => {
    console.log('Connect Socket')
    callback()
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

export const getSnakes = (cb) => {
  socket.on('snakes:get', (data) => {
    cb(data)
  })
}