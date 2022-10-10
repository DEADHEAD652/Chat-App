const socket = io()
//Elements
const $messageForm = document.querySelector('#msgform')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormBtn = $messageForm.querySelector('button')
const $GeoLocation = document.querySelector('#loc-btn')
socket.on('message', (message) => {
    console.log(message)

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