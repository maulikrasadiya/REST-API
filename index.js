const express = require("express");
const users = require("./mock_data.json")
const server = express();
const fs = require("fs");

//Middleware - plugin
server.use(express.urlencoded({ extended: true }))


//Routes

server.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

server.get('/api/users', (req, res) => {
    return res.json(users);
})

server.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})

server.post('/api/users', (req, res) => {
    const body = req.body;
    console.log("Body", body);
    users.push({ id: users.length + 1, ...body })
    fs.writeFile('./mock_data.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "Pending" })
    })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.body;


})

server.listen(4000, () => {
    console.log("Server is Start on 4000");
})