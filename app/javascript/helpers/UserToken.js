import randomstring from "randomstring";

const findOrCreate = () => {
  // The user already has a user token
  const userToken = localStorage.getItem("userToken");
  if (userToken) return userToken;

  // The user does not have a user token
  const newUserToken = randomstring.generate(32);
  localStorage.setItem("userToken", newUserToken);
  return newUserToken;
};

export default { findOrCreate };
