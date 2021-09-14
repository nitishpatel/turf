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
