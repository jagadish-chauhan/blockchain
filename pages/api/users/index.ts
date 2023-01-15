import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  console.log('users handler : ', { method, body: req.body });
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({});
        // res.status = 200;
        // res.json({ success: true, data: users });
        res.status(200).json({ success: true })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PATCH': {
      try {
        const user = await User.updateOne({ profileId: null })
        res.status(201).json({ success: true })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    }
    case 'POST':
      try {
        const user = await User.create(req.body)
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}