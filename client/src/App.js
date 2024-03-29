import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:8000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a chat</h3>
          <input
            type="text"
            placeholder="User..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && joinRoom();
            }}
          ></input>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room}></Chat>
      )}
    </div>
  );
}

export default App;
