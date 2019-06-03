import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const host = '192.168.0.105';
const port = 3000;

module.exports.post = (url, data) => {
  return axios.post(api(url), data)
}

module.exports.get = (url) => {
  return axios.get(api(url))
}


module.exports.setToken = (token) => {
  axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

const url = (res) => {
  // return `https://chaipaan.tk/${url}`;
  return `http://${host}:${port}${res}`;
}

const api = (api) => {
  return url('/api/v1'+api)
}

module.exports.url = url;
module.exports.api = api;
