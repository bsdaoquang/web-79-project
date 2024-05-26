import express from 'express'
import {db} from './db.js';
import cors from 'cors';

const app = express()
const PORT = 3001

app.use(express.json())
app.use(cors())

app.get('/posts', (req, res) => {
  res.status(200).json({
    message: 'Posts',
    data: db.posts
  })
})
app.get('/users', (req, res) => {
  res.status(200).json({
    message: 'Users',
    data: db.users
  })
})

app.get('/user/:id', (req, res) => {

  const {id} = req.params
  const item = db.users.find(element => `${element.id}` === id)

  if (!item) {
    throw  new Error('User not found')
  }

  res.status(200).json({
    message: 'User',
    data: item
  })
})

app.delete('/post/:id', (req, res) => {

  const {id} = req.params
  const index = db.posts.findIndex(element => `${element.id}` === id)

  if (index !== -1) {
    db.posts.splice(index, 1)

    res.status(200).json({
      message: 'Deleted',
      data: null
    })
  }else{
    throw new Error('Post not found!!!')
  }
})


app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Server starting at http://localhost:${PORT}`)
})