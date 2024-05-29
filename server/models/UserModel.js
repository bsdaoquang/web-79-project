import mongoose, { Schema } from "mongoose";

const UserScheme = new Schema({
  username: {
    require: true,
    type: String,
    undefined: true
  },
  password: {
    require: true,
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  email: String
})

const UserModel = mongoose.model('users', UserScheme)
export default UserModel