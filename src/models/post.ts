import { IPost, IUser } from '@/types/type';
import { model, Schema, Model, Document, models, PopulatedDoc, ObjectId } from 'mongoose';

type PostSchema = IPost & { user: PopulatedDoc<Document<ObjectId> & IUser> };

const postSchema = new Schema<PostSchema>({
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
  timestamps: true
});

let Posts: Model<PostSchema> = models.posts || model("posts", postSchema);

export default Posts;