import { NextApiRequest } from 'next';
// import Post from '../../models/post';
import { NextApiResponseServerIO } from '../../types/next';
import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");

    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
    });

    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;

    // io.on('connection', socket => {
    //   Post.watch([], { fullDocument: 'updateLookup' }).on('change', (data: any) => {
    //     console.log('socket post change', data);
    //     Post.find({ _id: data.fullDocument._id }).populate('user').lean().then((post) => {
    //       socket.broadcast.emit('post-watch', { data: JSON.parse(JSON.stringify(post)) });
    //     })
    //   })
    // })
    // res.socket.server.io = io

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