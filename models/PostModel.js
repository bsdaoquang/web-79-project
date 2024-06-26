import mongoose, { Schema } from "mongoose";

const PostScheme = new Schema({
  title: {
    require: true,
    type: String
  },
  body: String,
  price: Number,
  liked: Number
})
const PostModel = mongoose.model('posts', PostScheme)
export default PostModel