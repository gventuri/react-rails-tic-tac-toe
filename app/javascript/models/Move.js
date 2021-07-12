import axios from "axios";

class Move {
  static create({ roomId, playerCode, cellId }) {
    return axios.post(`/rooms/${roomId}/moves`, {
      player_code: playerCode,
      cell_id: cellId,
    });
  }
}

export default Move;
