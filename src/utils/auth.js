import { handleRequest } from "./api";
import { BASE_URL } from "../utils/constants";

const headers = { "Content-Type": "application/json" };

const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password, name }),
  }).then(handleRequest);
};

const login = (email, password, name) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password, name }),
  }).then(handleRequest);
};

const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(handleRequest);
};

export { register, login, checkToken };
