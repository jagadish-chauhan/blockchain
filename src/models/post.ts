import { model, Schema, Model, Document, models } from 'mongoose';
import { IUser } from './user';

export interface IPost extends Document {
  title: string;
  description: string;
  user: IUser;
  [x: string]: any;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
}, {
  timestamps: true,
  // strict: false
});

let Posts: Model<IPost> = models.posts || model("posts", postSchema);

export default Posts;