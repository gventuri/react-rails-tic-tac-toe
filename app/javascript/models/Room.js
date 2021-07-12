import axios from "axios";

class Room {
  static create({ slug, inviterCode, inviterStarts }) {
    return axios.post("/rooms", {
      slug,
      inviter_code: inviterCode,
      inviter_starts: inviterStarts,
    });
  }
}

export default Room;
