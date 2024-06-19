import mongoose, { Schema } from "mongoose";

const AuthorScheme = new Schema({
  name: {
    require: true,
    type: String
  },
  image: String,
  bio: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

const AuthorModel = mongoose.model('authors', AuthorScheme)
export default AuthorModel