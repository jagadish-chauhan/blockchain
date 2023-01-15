import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  console.log('postId handler : ', { method, query, body: req.body });
  const { postId } = query;

  await dbConnect();

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