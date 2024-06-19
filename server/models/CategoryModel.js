import mongoose, { Schema } from "mongoose";

const CategoryScheme = new Schema({
  title: {
    require: true,
    type: String
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

const CategoryModel = mongoose.model('categories', CategoryScheme)
export default CategoryModel