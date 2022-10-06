const express = require('express')
const path = require('path')
const http = require('http')
const SocketIO = require('socket.io')

const app = express()

const server = http.createServer(app)
const io = SocketIO(server)


const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('new web socket connection')
    socket.emit('message', 'Welcome!')

    socket.broadcast.emit('message', 'New User has joined')
    socket.on('sendmessage', (message) => {

        io.emit('message', message)

    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')


    })
    socket.on('location', (coords) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })

})

server.listen(port, () => {

    console.log('Server running on port ' + port)

})