let BASE_URL = `https://onegeolims.herokuapp.com`;
//BASE_URL = `http://69.64.72.176`; //
BASE_URL = "http://185.4.176.148";

let SERVER = `:7878/api`;
//let MAP_URL = `http://69.64.72.176:9099`;
let MAP_URL = `http://185.4.176.148:9099`;

module.exports = {
  endpoint: `${BASE_URL}${SERVER}`,
  BASE_URL,
  SERVER,
  MAP_URL,
};
