import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  console.log('usersID handler : ', { method, query, body: req.body });
  const { profileId } = query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const user = await User.findOne({ profileId });
        res.status(200).json({ success: true, user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PATCH':
      try {
        const user = await User.updateOne({ profileId }, req.body, { upsert: true });
        res.status(200).json({ success: true, user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}