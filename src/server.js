const express = require('express');
const {Server} = require('socket.io')
const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`)
})

app.use(express.static(__dirname + "/public"));

const io = new Server(server);

const messages = [
        {author:"Thrall", text: "Locktar Hogar"},
        {author:"Cairn", text: "Pour les ancetres"},
        {author:"Jaina", text: "coucou!"}
]

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.emit("chatMessages", messages);

    socket.on("newMsg", (data) => {
        messages.push(data);
        io.sockets.emit("chatMessages", messages)
    })
});