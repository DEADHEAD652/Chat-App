const users = []
//adduser,removeuser,getUser,getuserinroom
const addUser = ({
    id,
    username,
    room
}) => {
    //Clean data 
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate data 
    if (!username || !room) {


        return {
            error: 'username and room are required !'
        }
    }
    //checking for exsisting user
    const exsistingUser = users.find((user) => {
        room = room.trim().toLowerCase()
        return user.room === room && user.username === username

    })
    //validate username
    if (exsistingUser) {
        return {

            error: 'username is already used'
        }
    }

    //storing user
    const user = {
        id,
        username,
        room
    }
    users.push(user)
    return {
        user
    }


}

const removeuser = (id) => {

    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]

    }
}


const getUser = (id) => {
    return users.find((user) => user.id === id)

}
const getUsersinRoom = (room) => {
    return users.filter((user) => {
        user.room === room
    })
}
module.exports= {
    addUser,getUser,getUsersinRoom,removeuser
}