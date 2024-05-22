import express from 'express'
import {posts} from './data/posts.js'

const app = express()
const PORT = 3001

app.use(express.json())

// CRUD

app.get('/', (req, res) => {
  res.send('Hello MindX')
})

app.get('/posts', (req, res) => {
  res.status(200).json({
    message: 'Posts',
    data: {items: posts, totalItem: posts.length}
  })
})

app.get('/post/:id', (req, res) => {
  const {id} = req.params

  const item = posts.find(element => `${element.id}` === id)

  if (item) {
    res.status(200).json({
      message: 'Post detail',
      data: item
    })
  }

  res.status(403).json({
    message: 'Post not found',
    data: []
  })
})

app.get('/detail', (req, res) => {
  const {id} = req.query
  const item = posts.find(element => `${element.id}` === id)

  if (item) {
    res.status(200).json({
      message: 'Post detail',
      data: item
    })
  }

  res.status(403).json({
    message: 'Post not found',
    data: []
  })
})
app.delete('/delete-post', (req, res) => {
  const {id} = req.query

  const index = posts.findIndex(element => `${element.id}` === id)

  if (index !== -1) {
    posts.splice(index, 1)

    res.status(203).json({
      message: 'Post is deleted',
      data: {
        totalItem: posts.length
      }
    })
  }else{
    res.status(404).json({
      message: 'Data not found',
      data: []
    })
  }

})

app.post('/add-new-post', (req, res) => {
  
  const item = {
    id: Math.floor(Math.random() * 1000000),
    ...req.body
  }
  posts.push(item)

  res.status(201).json({
    message: 'Add new post successfully',
    data: {item, totalItem: posts.length}
  })
})

app.put('/update-post', (req, res) => {

  const {id} = req.query
  const body = req.body

  const index = posts.findIndex(element=> `${element.id}` === id)

  if (index !== -1) {
    posts[index] = body

    res.status(201).json({
      message: 'Update post successfully',
      data: posts[index]
    })
  }else{
    res.status(404).json({
      message: 'Post not found',
      data: []
    })
  }

  
})

app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Server starting at http://localhost:${PORT}`)
})