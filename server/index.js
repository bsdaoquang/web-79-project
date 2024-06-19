import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRouter from './routers/authRouter.js';
import taskRouter from './routers/taskRouter.js';
import bookRouter from './routers/bookRouter.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dkletq0ej', 
  api_key: '178554658644286', 
  api_secret: 'ONvWzb_GPpN5a4jlYTy58b-q42o'
});


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const dburl = `mongodb+srv://bsdaoquangyhocso:${process.env.DB_PASSWORD}@cluster0.z6pqsie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
 
app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/tasks', taskRouter)
app.use('/books', bookRouter)

const connectDb = async () => {
  try {
    await mongoose.connect(dburl)
    console.log(`Connect to database successfully!!!!`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

connectDb().then(() => {

  app.listen(PORT, (err) => {
    if (err) {
      console.log(err)
      return
    }
  
    console.log(`Server starting at http://localhost:${PORT}`)
  })

})
