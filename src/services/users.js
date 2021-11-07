import request from "../utils/request";
import { endpoint } from "../utils/config";

export async function getUsers(data) {
  const url = `${endpoint}/users`;
  return await request({
    url,
    method: "get",
    data,
  });
}

export async function getRoles(data) {
  const url = `${endpoint}/roles`;
  return await request({
    url,
    method: "get",
    data,
  });
}
