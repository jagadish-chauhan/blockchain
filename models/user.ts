import { model, Schema, Model, Document, models } from 'mongoose';
import { IPost } from './post';

export interface IUser extends Document {
  profileId: string;
  address?: string;
  chainId?: string;
  domain?: string;
  metamaskId?: string;
  nonce?: string;
  uri?: string;
  version?: string;
  aboutMe?: string;
  posts?: IPost[];
  email_address: string;
  last_name: string;
  first_name: string;
  [x: string]: any;
}

const userSchema = new Schema<IUser>({
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
  },
  // posts: [{
  //   ref: 'posts',
  //   type: Schema.Types.ObjectId
  // }],
}, {
  timestamps: true,
  strict: false,
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

userSchema.virtual('posts', {
  ref: 'posts',
  localField: '_id',
  foreignField: 'user',
})

let Users: Model<IUser> = models.users || model("users", userSchema);


export default Users;