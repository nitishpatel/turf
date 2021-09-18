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
