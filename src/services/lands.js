import request from "../utils/request";
import { endpoint } from "../utils/config";

export async function getLands(data) {
  const url = `${endpoint}/old-plots`;
  return await request({
    url,
    method: "GET",
    data,
  });
}

export async function postLand(data) {
  const url = `${endpoint}/old-plots`;
  return await request({
    url,
    method: "POST",
    data,
  });
}

export async function putLand(data) {
  const url = `${endpoint}/old-plots`;
  return await request({
    url,
    method: "PUT",
    data,
  });
}
