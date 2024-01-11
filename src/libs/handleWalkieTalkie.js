const usersInRoom = {};

const JOIN_ROOM_EVENT = "join-room-walkie-talkie";
const AUDIO_MESSAGE_EVENT = "audioMessage";
const AUDIO_FINAL_EVENT = "audioFinal";
const USER_OUT_ROOM_EVENT = "user-out-room";

const handleWakieTalkie = (socket, io) => {
  socket.on(JOIN_ROOM_EVENT, (user, roomId) => {
    try {
      if (!user || !roomId) {
        console.error("Invalid user or roomId");
        return;
      }

      console.log(`user ${user} masuk ke room ${roomId}`);

      if (!usersInRoom[roomId]) {
        usersInRoom[roomId] = [];
      }
      usersInRoom[roomId].push(user);

      console.log(usersInRoom);

      socket.join(roomId);

      socket.emit("joining", `anda masuk ke room ${roomId}`);

      // Avoid removeAllListeners unless absolutely necessary

      socket.on(AUDIO_MESSAGE_EVENT, (data) => {
        console.log(data);
        socket.broadcast.to(roomId).emit(AUDIO_FINAL_EVENT, data);
      });

      socket.on(USER_OUT_ROOM_EVENT, (userOut, idRoom) => {
        if (usersInRoom[idRoom]) {
          usersInRoom[idRoom] = usersInRoom[idRoom].filter(
            (user) => user !== userOut
          );
        }
        socket.leave(idRoom);
      });
    } catch (error) {
      console.error("Error in handleWakieTalkie:", error);
    }
  });
};

export default handleWakieTalkie;
