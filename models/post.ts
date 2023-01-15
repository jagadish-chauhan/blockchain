import mongoose from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
}

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  }
}, {
  timestamps: true,
  // strict: false
});

let Posts = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Posts;