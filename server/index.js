import http from 'http'

const app = http.createServer((req, res) => {
  res.end('Hello')
})
const PORT = 3001


app.listen(PORT, (err) => {
  if (err) {
    throw new Error('Server is disconnect')
  }

  console.log(`Server stating at http://localhost:${PORT}`)
} )