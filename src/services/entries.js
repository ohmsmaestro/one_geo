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
  const url = `${endpoint}/rectifications`;
  return await request({
    url,
    method: "GET",
    data,
  });
}

export async function getRectificationDetail(id) {
  const url = `${endpoint}/rectifications/${id}`;
  return await request({
    url,
    method: "GET",
  });
}

export async function getRectificationFile(fileName) {
  const url = `${endpoint}/rectifications/file/${fileName}`;
  return await request({
    url,
    method: "GET",
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

export async function postTerminateEncumbrance(data) {
  const url = `${endpoint}/encumbrance`;
  return await request({
    url,
    method: "PUT",
    data,
  });
}
