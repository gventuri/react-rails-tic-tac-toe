import axios from "axios";

class Move {
  static get({ roomId }) {
    return axios
      .get(`/rooms/${roomId}/moves`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => res.data.moves);
  }

  static create({ roomId, playerCode, cellId }) {
    return axios.post(`/rooms/${roomId}/moves`, {
      player_code: playerCode,
      cell_id: cellId,
    });
  }
}

export default Move;
