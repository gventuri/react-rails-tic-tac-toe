import axios from "axios";

class Room {
  static create({ slug, inviterCode, inviterStarts }) {
    return axios.post("/rooms", {
      slug,
      inviter_code: inviterCode,
      inviter_starts: inviterStarts,
    });
  }

  static join({ slug, challengerCode }) {
    return axios
      .post(`/rooms/${slug}/join`, {
        challenger_code: challengerCode,
      })
      .then((res) => res.data);
  }

  static rematch({ slug }) {
    return axios.put(`/rooms/${slug}/rematch`);
  }
}

export default Room;
