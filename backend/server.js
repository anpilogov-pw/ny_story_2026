import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 3001;
const wss = new WebSocketServer({ port: PORT });

const initialState = {
  scene: "intro",
  music: null,
  activeCharacter: null,
};

let state = { ...initialState };

function broadcast(message) {
  const data = JSON.stringify(message);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(data);
    }
  });
}

wss.on("connection", (ws) => {
  // Синхронизация состояния при подключении
  ws.send(
    JSON.stringify({
      type: "STATE_SYNC",
      payload: state,
    })
  );

  ws.on("message", (raw) => {
    let msg;

    try {
      msg = JSON.parse(raw.toString());
    } catch {
      return;
    }

    switch (msg.type) {
      case "UPDATE_STATE": {
        const patch = msg.payload ?? {};

        // Простое и предсказуемое обновление
        state = {
          ...state,
          ...patch,
        };

        broadcast({
          type: "STATE_UPDATE",
          payload: state,
        });

        break;
      }

      case "RESET": {
        state = { ...initialState };

        broadcast({
          type: "STATE_UPDATE",
          payload: state,
        });

        break;
      }

      default:
        // неизвестные сообщения игнорируем
        break;
    }
  });
});

console.log(`WS server running on ws://0.0.0.0:${PORT}`);
