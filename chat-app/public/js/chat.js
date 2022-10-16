const socket = io()
//Elements
const $messageForm = document.querySelector('#msgform')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormBtn = $messageForm.querySelector('button')
const $GeoLocation = document.querySelector('#loc-btn')
const $messages = document.querySelector('#message')
const $location = document.querySelector('#location')

//Templates
const msgTemplate = document.querySelector('#message-template').innerHTML
const locTemplate = document.querySelector('#location-template').innerHTML

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(msgTemplate, {

        message: message.text,
        createdAt: moment(message.createdAt).format('hh:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (message) => {
    console.log(message)
    const html = Mustache.render(locTemplate, {
        url: message.url,
        createdAt: moment(message.createdAt).format('hh:mm a')
    })
    $location.insertAdjacentHTML('beforeend', html)


})
$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    $messageFormBtn.setAttribute('disabled', 'disabled')
    //disable form 


    const message = e.target.elements.message.value
    socket.emit('sendmessage', message, (error) => {
        $messageFormBtn.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        //enable form

        if (error) {
            console.log(error)
        }
        console.log('Message Delivered')
    })

})
$GeoLocation.addEventListener('click', () => {

    if (!navigator.geolocation) {
        return alert('Geo Location is not supported by your browser')

    }

    $GeoLocation.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('location', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude

        }, () => {
            $GeoLocation.removeAttribute('disabled')
            console.log('Location Shared!')

        })

    })



})