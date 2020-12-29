const socket = io('http://localhost:8000');




// const io = require("socket.io-client");
// const socket = io("http://localhost:8000", {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"  
//   }
// });

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')

const append = (message,position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

let name = null;

// while(!name){
//     name = prompt('Enter name to join')
// }

name = prompt('Enter name to join')

socket.emit('new-user-joined',name)
socket.on('user-joined', name => {
    append(`${name} joined chat`,'right')
})