let BASE_URL = `https://onegeolims.herokuapp.com`;
BASE_URL = `http://185.4.176.77`; // Dev Account
// BASE_URL = "http://185.4.176.166"; // Live Account
// BASE_URL = "https://e85a-102-89-22-197.ngrok-free.app"; // Local Account

let SERVER = `/api`;
//let MAP_URL = `http://69.64.72.176:9099`;
let MAP_URL = `http://185.4.176.77/map`;

module.exports = {
  endpoint: `${BASE_URL}${SERVER}`,
  BASE_URL,
  SERVER,
  MAP_URL,
};
