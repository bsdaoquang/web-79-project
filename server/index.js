import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import UserModel from './models/UserModel.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const dburl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@demodatabase.nbg8myu.mongodb.net/?retryWrites=true&w=majority&appName=demodatabase`

app.use(express.json())
app.use(cors())

const connectDb = async () => {
  try {
    await mongoose.connect(dburl)
    console.log(`Connect to database successfully!!!!`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// register
app.post('/signup', async (req, res) => {
  console.log('fafa')
  try {
    const body = req.body

    console.log(body)

    if (!body.username || !body.password) {
      res.sendStatus(401)
      throw new Error('Missing values!!!')
    }

    const {username, password} = body

    const existingUser = await UserModel.findOne({username: {$eq: username}})

  
    if (existingUser) {
      res.sendStatus(404)
      throw new Error('Username is ready!!!')
    }

    const newUser = new UserModel({
      username,
      password
    })

    await newUser.save()

    res.status(201).json({
      message: 'Create new user successfully!!!',
      data: newUser
    }
    )
  
  } catch (error) {
    res.sendStatus(404)
    throw new Error(error.message)
  }
})

connectDb().then(() => {
  
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err)
      return
    }
  
    console.log(`Server starting at http://localhost:${PORT}`)
  })

})
