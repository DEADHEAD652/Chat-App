const socket = io()


socket.on('message', (message) => {
    console.log(message)

})
document.querySelector('#msgform').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value
    socket.emit('sendmessage', message, (error) => {
        if (error) {
            console.log(error)
        }
        console.log('Message Delivered')
    })

})
document.querySelector('#loc-btn').addEventListener('click', () => {

    if (!navigator.geolocation) {
        return alert('Geo Location is not supported by your browser')

    }
    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('location', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude

        }, () => {

            console.log('Location Shared!')

        })

    })



})