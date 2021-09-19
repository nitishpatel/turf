import { API } from "../../backend";
export const getAllTurf = () => {
  return fetch(API + "turf/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
export const getTurfById = (turfid) => {
  return fetch(`${API}turf/${turfid}`, {
    method: "GET",
  })
    .then((data) => data.json())
    .catch((err) => console.log(err));
};
export const createBookingRequest = (data, token) => {
  console.log(data, token);
  return fetch(`${API}booking/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },

    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
