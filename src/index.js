const { default: handleWakieTalkie } = require("./libs/handleWalkieTalkie");

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3030;
app.get("/", function (req, res) {
  res.send("index.html");
});
io.on("connection", (socket) => {
  handleWakieTalkie(socket, io);

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});
server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
