import io from 'socket.io';

export const webSocketsHandlers = () => {
  return (server) => {
    return io(server, {
      serverClient: true,
      cors: {
        methods: ["GET", "POST"],
        credentials: false,
      }
    });
  }
}