import request from "../utils/request";
import { endpoint } from "../utils/config";

export async function getEntries(data) {
  const url = `${endpoint}/entries/paginated?`;
  return await request({
    url,
    method: "GET",
    data,
  });
}

export async function getApplications(data) {
  const url = `${endpoint}/applications/paginated?`;
  return await request({
    url,
    method: "GET",
    data,
  });
}
export async function getApplicationDetail(data) {
  const url = `${endpoint}/applications/${data.id}`;
  return await request({
    url,
    method: "GET",
  });
}

export async function getRectifications(data) {
  const url = `${endpoint}/rectification/paginated?`;
  return await request({
    url,
    method: "GET",
    data,
  });
}

export async function getEncumbrances(data) {
  const url = `${endpoint}/encumbrance`;
  return await request({
    url,
    method: "GET",
    data,
  });
}
