import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Post from '../../../models/post';
// import User from '../../../models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  console.log('users handler : ', { method, body: req.body });
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const post = await Post.create(req.body);
        // add reference in user
        // await User.updateOne({ _id: post.user }, { $addToSet: { posts: post._id } });
        res.status(201).json({ success: true, data: post })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}