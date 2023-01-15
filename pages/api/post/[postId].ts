import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/post';
import { Server } from 'socket.io'

export default async function handler(req: NextApiRequest, res: NextApiResponse & any) {
  const { method, query } = req;

  console.log('postId handler : ', { method, query, body: req.body });
  const { postId } = query;

  await dbConnect();
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io')

    const io = new Server(res.socket.server)

    io.on('connection', socket => {
      socket.broadcast.emit('a user connected')
      socket.on('hello', msg => {
        socket.emit('hello', 'world!')
      })
    })

    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }
  switch (method) {
    case 'GET':
      try {
        const post = await Post.findOne({ _id: postId });
        res.status(200).json({ success: true, data: post })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PATCH':
      try {
        const post = await Post.updateOne({ _id: postId }, req.body, { upsert: true });
        res.status(200).json({ success: true, data: post })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}