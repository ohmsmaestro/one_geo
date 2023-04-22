import axios from "axios";
import { storagePrefix, storageToken } from "./constant";

const requestFetch = (options) => {
  const AuthToken = localStorage.getItem(storageToken);
  if (AuthToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${AuthToken}`;
    axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'your-value';
    axios.defaults.headers.common['crossDomain'] = true;
  }
  let { method = "get", data, url, formatData } = options;
  if (formatData && method.toLowerCase() !== "get") {
    data = {
      meta: { source: "web" },
      data: data,
    };
  }
  console.log({ options, method })

  switch (method.toLowerCase()) {
    case "get":
      console.log(`axios  get is called`);

      // let myHeaders = new Headers();
      // myHeaders.append("Authorization", `Bearer ${AuthToken}`);

      // let raw = "";

      // let requestOptions = {
      //   method: 'GET',
      //   headers: myHeaders,
      //   redirect: 'follow'
      // };

      // return fetch(url, requestOptions)
      //   .then(response => response.json())
      // .then(result => console.log({ result }))
      // .catch(error => console.log('error', error));


      // return fetch(url, {})

      return axios.get(url, {
        params: data,
      });
    case "delete":
      return axios.delete(url, {
        data: data,
      });
    case "post":
      switch (options.upload) {
        case true:
          return axios.post(url, options.formData, options.config);
        default:
          return axios.post(url, data);
      }
    case "put":
      return axios.put(url, data);
    case "patch":
      return axios.patch(url, data);
    default:
      console.log({ options, method })
      return axios(options);
  }
};

export default function request(options) {
  return requestFetch(options)
    .then((response) => {
      const { statusText, status, headers } = response;
      let data =
        options.fetchType === "YQL"
          ? response.data.query.results.json
          : response.data;
      return {
        headers: headers,
        success: true,
        message: statusText,
        statusCode: status,
        raw: data,
        ...data,
      };
    })
    .catch((err) => {
      const { response } = err;
      let msg;
      let statusCode;
      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        if (statusCode === 4038) {
          localStorage.clear();
          let origin = window.location.origin;
          window.location.replace(origin);
        }
        msg = data.message || statusText;
      } else {
        statusCode = 600;
        msg = err.message || "Network Error";
      }

      return {
        success: false,
        statusCode,
        message: response?.data?.meta?.info ? response?.data?.meta?.info : msg,
        raw: response?.data,
        meta: response?.data?.meta,
      };
    });
}
