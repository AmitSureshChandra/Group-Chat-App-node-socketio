const socket = io('http://localhost:8000');

const form = document.getElementById('send-container')

const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')

var audio = new Audio('media/chat.mp3')

// append msg to container
const append = (message,position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position === 'left'){
        audio.play()
    }
}


// send msg to socket server
form.addEventListener('submit',(e) => {
    e.preventDefault()
    append(`You : ${messageInput.value}`,'right')
    socket.emit('send',messageInput.value)
    messageInput.value = ""
})

let name = null;

// ask new user for name

name = prompt('Enter name to join')

// broadcast to all new user has joined
socket.emit('new-user-joined',name)

// show message new user joined
socket.on('user-joined', name => {
    append(`${name} joined chat`,'left')
})

// show msg received from other user
socket.on('receive', data => {
    append(`${data.message} : ${data.name}`,'left')
})

// show message some user disconnected
socket.on('leave', name => {
    append(`${name} left chat`,'left')
})