console.log("Js running");

const socketClient = io();

const chatContainer = document.getElementById("chatContainer");

socketClient.on("chatMessages", (data) => {
    console.log(data);
    let messages = "";
    data.forEach(element => {
        messages += `<p>Author: ${element.author}<br/>
                        Message: ${element.text}</p>`
    });

    chatContainer.innerHTML = messages;
})

let user = "";
Swal.fire({
    title: "Welcome",
    text: "Enter your username",
    input: "text",
    allowOutsideClick: false
}).then(response => {
    console.log(response)
    user = response.value;
    document.getElementById("username").innerHTML = `Hello ${user}`;
})


const chatForm = document.getElementById("chatForm");

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form sent");
    const message = {
        author: user,
        text: document.getElementById("chatMessage").value
    }
    socketClient.emit("newMsg", message);
})