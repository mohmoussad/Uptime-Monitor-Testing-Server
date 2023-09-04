const express = require("express");
const basicAuth = require("express-basic-auth");
const net = require('net')

const app = express();
const httpPort = 5000;

app.use(
  basicAuth({
    users: { admin: "supersecret" },
  })
);

app.get('/', (req,res) => {
  res.send(500)
})

app.listen(httpPort, () => {
  console.log(`Server listening on httpPort ${httpPort}`);
});


const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
    const message = data.toString().trim();
    console.log(`Received: ${message}`);
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

const tcpPort = 3000;
server.listen(tcpPort, () => {
  console.log(`Server listening on tcpPort ${tcpPort}`);
});

