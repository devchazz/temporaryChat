const socket = io.connect('http://localhost:4000')

const message = document.querySelector('#message')
const userName = document.querySelector('#userName')
const sendButton = document.querySelector('#sendButton')
const output = document.querySelector('#output')

//Emit event:
const sendMessage = () => {
  socket.emit('chat', {
    message: message.value,
    userName: userName.value
  })
  message.value = ''
  message.focus()
}

sendButton.addEventListener('click', sendMessage)
document.addEventListener('keydown', (e) => {
  if(e.key === "Enter") sendMessage()
})

//Listen for events in the server:
socket.on('chat', (data) => {
  output.innerHTML += `<p><b>${data.userName}</b> : ${data.message} </p>`
})


