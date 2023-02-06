import { NextApiRequest } from 'next';
import dbConnect from '../../../utils/dbConnect';
import _has from 'lodash/has';
import Post from '../../../models/post';
import { NextApiResponseServerIO } from '../../../types/next';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  const { method, query } = req;

  console.log('postId handler : ', { method, query, body: req.body });
  const { postId } = query;

  await dbConnect();
  switch (method) {
    case 'GET':
      try {
        const post = await Post.findOne({ _id: postId });
        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PATCH':
      try {
        const post: any = await Post.findByIdAndUpdate({ _id: postId }, req.body, { upsert: true }).populate('user').lean();
        let error: any = "";
        Object.assign(post, req.body);
        try {
          res.socket.server.socket.broadcast.emit('post-watch', { data: JSON.parse(JSON.stringify(post)) });
        } catch (socketError) {
          error = socketError;
        }
        res.status(200).json({ success: true, data: post, error })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}