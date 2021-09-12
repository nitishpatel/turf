import { API } from "../../backend";

export const getVendor = (userid) => {
  console.log("USERID" + userid);
  return fetch(`${API}vendor/?user=${userid}`, {
    method: "GET",
  })
    .then((data) => data.json())
    .catch((err) => console.log(err));
};
export const createVendor = (user, token) => {
  console.log(user, token);
  return fetch(`${API}vendor/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },

    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
export const createTurf = (user, token) => {
  console.log(user, token);
  return fetch(`${API}turf/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },

    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
