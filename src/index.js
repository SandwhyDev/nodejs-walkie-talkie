const { default: handleWakieTalkie } = require("./libs/handleWalkieTalkie");
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3030;
const path = require("path");
const express = require("express");

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", function (req, res) {
  res.send("index.html");
});

io.on("connection", (socket) => {
  handleWakieTalkie(socket, io);

  const username = socket.handshake.query.name;
  console.log("connected");
  // console.log("User connected with username:", socket.handshake.query.name);

  socket.on("audioMessage", (data) => {
    console.log(data);

    // socket.broadcast.to(roomId).emit("audioFinal", data);
    socket.broadcast.emit("audioFinal", data);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
