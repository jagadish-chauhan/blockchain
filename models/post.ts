import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  name: {
    type: String,
  }
}, {
  timestamps: true,
  // strict: false
});

let Posts = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Posts;