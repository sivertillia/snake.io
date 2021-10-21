const onDisconnect = (socket, reason) => {
  console.log(`Disconnect ${socket.id} ${reason}`)
}

export default onDisconnect