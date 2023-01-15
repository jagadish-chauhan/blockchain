import { Server } from 'socket.io'
import Post from '../../models/post';

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io');

    const io = new Server(res.socket.server);

    io.on('connection', socket => {
      Post.watch([], { fullDocument: 'updateLookup' }).on('change', (data: any) => {
        console.log('socket post change', data);
        Post.find({ _id: data.fullDocument._id }).populate('user').lean().then((post) => {
          socket.broadcast.emit('post-watch', { data: JSON.parse(JSON.stringify(post)) });
        })
      })
      // socket.on('post-new', (data) => {
      //   socket.broadcast.emit('post-new', data);
      // })
      // socket.on('post-change', (data) => {
      //   socket.broadcast.emit('post-change', data);
      // })
    })

    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler