import dbConnect from '../../lib/dbConnect';
import User from '../../models/user';

export default async function handler(req, res) {
  const { method } = req

  await dbConnect();

  console.log('users handler : ', { method, body: req.body })

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PATCH': {
      try {
        // const user = await User.updateOne({ _id:  })
        // res.status(201).json({ success: true, data: user })
      } catch (error) {
        // res.status(400).json({ success: false })
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