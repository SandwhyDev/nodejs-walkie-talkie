const { default: handleWakieTalkie } = require("./libs/handleWalkieTalkie");
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3030;
const path = require("path");
const express = require("express");
const { SendNotification } = require("./libs/HandleSendNotificaation");

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", function (req, res) {
  res.send("index.html");
});

io.on("connection", (socket) => {
  handleWakieTalkie(socket, io);

  // const username = socket.handshake.query.name;
  console.log("connected");

  socket.on("audioMessage", (data) => {
    console.log(data);

    // socket.broadcast.to(roomId).emit("audioFinal", data);
    socket.broadcast.emit("audioFinal", data);
  });

  socket.on("send-notification", async (data) => {
    const dataNotif = {
      app_name: "mobin",
      display: {
        title: {
          id: "ini test sound",
          en: "this is test sound",
        },
        body: {
          id: "Ada suara masuk",
          en: "Voice in",
        },
      },
      send: {},
      member: [
        {
          is_member: true,
          lang: "id",
          fcm_token:
            "eirAvgy53U6suYCbQRqwff:APA91bF_rA6H9erE2LGIcT3uDo3oa79VaQzpu41r3aHZYQ-21tRg8VBcL9U-v1Oes28R1TGdTkLtFigE7jSvOQAXcDPJ7mQK-1H387plBE7QK-Kbiy1vofM",
        },
      ],
    };

    const notif = await SendNotification(dataNotif);

    console.log("hasil notif ", notif);
  });

  socket.on("send_data", function (data) {
    console.log("send_data : ", data);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
