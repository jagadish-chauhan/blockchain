import io from 'socket.io-client'
import axiosInstance from '../lib/axiosInstance';

let socket;

const socketInitialization = async () => await axiosInstance
  .get('/api/socket')
  .then(() => {
    if (!socket) {
      socket = io(process.env.NEXTAUTH_URL);
      socket.on('connect', () => {
        socket.emit('hello');
      })
    }
    return socket;
  })

let customSocket = socketInitialization;
export default customSocket;