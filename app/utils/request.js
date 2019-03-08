import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

module.exports.post = (url, data) => {
  return axios.post(route(url), data)
}

module.exports.get = (url) => {
  return axios.get(route(url))
}

module.exports.token = (token) => {
  axios.defaults.headers.common['authtoken'] = token;
}

const route = (url) => {
  return 'http://192.168.0.105:3000/api/v1' + url;
}

module.exports.route = route;
