import { DefaultEventsMap } from '@socket.io/component-emitter';
import io, { Socket } from 'socket.io-client'
import axiosInstance from '../axiosInstance';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const socketInitialization = async () => await axiosInstance
  .get('/api/socket')
  .then(() => {
    if (!socket) {
      socket = io(process.env.NEXTAUTH_URL ?? "http://localhost:3000");
      socket.on('connect', () => {
        socket.emit('hello');
      })
    }
    return socket;
  })

let customSocket = socketInitialization;
export default customSocket;