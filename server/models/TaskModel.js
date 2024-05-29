import mongoose, { Schema } from "mongoose";

const TaskScheme = new Schema({
  content: {
    type: String,
    require: true
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

const TaskModel = mongoose.model('tasks', TaskScheme)
export default TaskModel