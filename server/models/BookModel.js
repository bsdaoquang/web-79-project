import mongoose, { Schema } from "mongoose";

const BookScheme = new Schema({
  title: {
    require: true,
    type: String
  },
  description: String,
  price: Number,
  pages: Number,
  publishIn: String,
  authorId: String,
  categories: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

const BookModel = mongoose.model('books', BookScheme)
export default BookModel