import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const host = '192.168.0.105';
// const host = '192.168.0.119';
const port = 3000;

module.exports.post = (url, data) => {
  console.log("POST:", route(url));
  return axios.post(route(url), data)
}

module.exports.get = (url) => {
  console.log("GET:", route(url));
  return axios.get(route(url))
}

module.exports.setToken = (token) => {
  axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

const url = (req) => {
<<<<<<< HEAD
    return `https://chaipaan.tk${req}`;
 // return `http://${host}:${port}${req}`;
=======
     return `https://chaipaan.tk${req}`;
 //return `http://${host}:${port}${req}`;
>>>>>>> 906cf76cf27b7f65ce5a30573fa0b94dfaf42668
}

const route = (req) => {
  return url('/api/v1'+req);
}


module.exports.url = url;
module.exports.route = route;
