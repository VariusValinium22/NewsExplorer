import handleRequest from './api';
import BASE_URL from './constants';

const headers = { 'Content-Type': 'application/json' };

const register = (email, password, name) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers,
  body: JSON.stringify({ email, password, name }),
}).then(handleRequest);

const login = (email, password, name) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers,
  body: JSON.stringify({ email, password, name }),
}).then(handleRequest);

const checkToken = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    ...headers,
    authorization: `Bearer ${token}`,
  },
}).then(handleRequest);

export { register, login, checkToken };
