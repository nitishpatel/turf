import { API } from "../../backend";

export const getUnVerifiedVendors = (token) => {
  return fetch(`${API}vendor/?isVerified=false`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const verifyAVendor = (vendor, id, token) => {
  return fetch(`${API}vendor/${id}/`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(vendor),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
