import { BASE_URL } from "../utils/constants";

const handleRequest = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export { handleRequest };
