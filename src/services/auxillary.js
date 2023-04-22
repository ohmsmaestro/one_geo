import request from "../utils/request";
import { endpoint } from "../utils/config";

export async function getStates(data) {
  // const url = `${endpoint}/states/paginated?`;
  const url = `${endpoint}/signup/states`;
  return await request({
    url,
    method: "GET",
    data,
  });
}

export async function getRequirements(data) {
  const url = `${endpoint}/signup/requirements`;
  return await request({
    url,
    method: "GET",
    data,
  });
}

export async function getDefectTypes(data) {
  const url = `${endpoint}/defects`;
  return await request({
    url,
    method: "GET",
    data,
  });
}

export async function getDeedTypes(data) {
  const url = `${endpoint}/deeds/types`;
  return await request({
    url,
    method: "GET",
    data,
  });
}

export async function getLandTypes(data) {
  const url = `${endpoint}/parcels/attributes`;
  return await request({
    url,
    method: "GET",
    data,
  });
}


export async function getApplicationTypes(data) {
  const url = `${endpoint}/other_applications/types`;
  return await request({
    url,
    method: "GET",
    data,
  });
}