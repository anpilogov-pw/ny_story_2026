import { useGameStore } from "./store";

let socket: WebSocket | null = null;

export function connectWS() {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    return socket;
  }

  const url = `ws://${location.hostname}:3001`;
  socket = new WebSocket(url);

  socket.onmessage = (e) => {
    const msg = JSON.parse(e.data);

    if (msg.type === "STATE_SYNC" || msg.type === "STATE_UPDATE") {
      useGameStore.getState().setFromServer(msg.payload);
    }
  };

  return socket;
}

export function sendUpdate(patch: any) {
  const ws = connectWS();
  ws.send(JSON.stringify({ type: "UPDATE_STATE", payload: patch }));
}

export function sendReset() {
  const ws = connectWS();
  ws.send(JSON.stringify({ type: "RESET" }));
}
