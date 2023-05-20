const express = require('express')
const socket = require('socket.io')

//Server setup:
const app = express()
app.use(express.static('public'))

app.get('/test', (req, res) => {
  res.status(200).send('<h1>Test</h1>')
})

app.all('*', (req, res) => {
  res.status(404).send('<h1>Not founded</h1>')
})

const server = app.listen(process.env.PORT || 4000, () => {console.log("App running")})
app.use(express.static('public'))

//socket setup:
const io = socket(server)
io.on('connection', (socket) => {
  console.log('Socket connection made.', socket.id)

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data)
  })
})


