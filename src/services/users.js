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

export async function postUser(data) {
  const url = `${endpoint}/users`;
  return await request({ url, method: "POST", data });
}

export async function getUserDetails(data) {
  const url = `${endpoint}/users`;
  return await request({
    url,
    method: "get",
    data,
  });
}

export async function getRoles(data) {
  const url = `${endpoint}/roles/role_privileges`;
  return await request({
    url,
    method: "get",
    data,
  });
}

export async function postRole(data) {
  const url = `${endpoint}/roles`;
  return await request({
    url,
    method: "POST",
    data,
  });
}

export async function putRole(data) {
  const url = `${endpoint}/roles`;
  return await request({
    url,
    method: "PUT",
    data,
  });
}

export async function getAllPermissions(data) {
  const url = `${endpoint}/roles/pages`;
  return await request({
    url,
    method: "get",
    data,
  });
}
