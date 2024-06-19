import mongoose, { Schema } from "mongoose";

const ChapterScheme = new Schema({
  bookId: String,
  chapter :{
    type: [
      {
        title: String,
        content: String,
        downloadUrl: String
      }
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

const ChapterModel = mongoose.model('chapters', ChapterScheme)
export default ChapterModel