const { API } = require("backend");

export const getBookingRequests = (userID) => {
  return fetch(`${API}booking/?user=${userID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
