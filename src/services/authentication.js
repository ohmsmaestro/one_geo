import request from "../utils/request";
import { endpoint } from "../utils/config";

export async function postLogin(data) {
  const url = `${endpoint}/auth`;
  return await request({
    url,
    method: "post",
    data,
  });
}

export async function postSignup(data) {
  const url = `${endpoint}/signup`;
  return await request({ url, method: "POST", data });
}

export async function postLogOut(data) {
  const url = `${endpoint}/auth/logout`;
  return await request({ url, method: "POST", data });
}

export async function postForgotPassword(data) {
  const url = `${endpoint}/password-reset/initiate`;
  return await request({ url, method: "POST", data });
}

export async function postResetPassword(data) {
  const url = `${endpoint}/password-reset/complete`;
  return await request({ url, method: "POST", data });
}
