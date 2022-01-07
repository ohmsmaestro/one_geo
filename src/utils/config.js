let BASE_URL = `https://onegeolims.herokuapp.com`;
BASE_URL = `http://69.64.72.176`;
let SERVER = `:7878/api`;
let MAP_URL = `http://69.64.72.176:9099`;

// PAYSTACK DETAILS DEMO
// let PAYSTACK_KEY = `pk_test_e54eee45276d2070cae3c28ba2e9ec0c255c347a`;
// let PAYSTACK_BASIC = `PLN_x5ph554tlmfcal0`;
// let PAYSTACK_BASIC_YEARLY = `PLN_1wo3wx9oqh1pva9`;
// let PAYSTACK_PROF = `PLN_gpjhs6xccsujtti`;
// let PAYSTACK_PROF_YEARLY = `PLN_3u0wfrsnvelhfes`;

// PAYSTACK DETAILS LIVE
// let PAYSTACK_KEY = `pk_live_c356a8c846ccb3fbd05f71b2240e874c2531a9d6`;
// let PAYSTACK_BASIC = `PLN_z3o30mdshhiahdq`;
// let PAYSTACK_BASIC_YEARLY = `PLN_9hwm54svjh4ud5f`;
// let PAYSTACK_PROF = `PLN_1nscvuqx394to86`;
// let PAYSTACK_PROF_YEARLY = `PLN_3lupdof7km8qih5`;

module.exports = {
  endpoint: `${BASE_URL}${SERVER}`,
  BASE_URL,
  SERVER,
  MAP_URL,
};
