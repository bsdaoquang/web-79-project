import mongoose, { Schema } from "mongoose";

const UserSheme = new Schema({
  username: {
    require: true,
    type: String,
  },
  password:{
    require: true,
    type: String
  },
  createdAt:{
    type: Date,
    default: Date.now()
  },
  updatedAt:{
    type: Date,
    default: Date.now()
  }
})

const UserModel = mongoose.model('users', UserSheme)
export default UserModel