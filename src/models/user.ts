import { IPost, IUser } from '@/types/type';
import { model, Schema, Model, Document, models } from 'mongoose';

type UserSchema = IUser & Document & { posts: IPost & Document };

const userSchema = new Schema<UserSchema>({
  profileId: {
    required: true,
    type: String,
  },
  address: {
    type: String
  },
  chainId: {
    type: String
  },
  domain: {
    type: String
  },
  metamask_id: {
    type: String
  },
  nonce: {
    type: String
  },
  uri: {
    type: String
  },
  version: {
    type: String
  },
  about_me: {
    type: String,
    default: "This is my Bio",
  },
  email_address: {
    type: String
  },
  last_name: {
    type: String
  },
  first_name: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

userSchema.virtual('posts', {
  ref: 'posts',
  localField: '_id',
  foreignField: 'user',
})

let Users: Model<UserSchema> = models.users || model("users", userSchema);

export default Users;