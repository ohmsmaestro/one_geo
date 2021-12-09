import request from "../utils/request";
import { endpoint } from "../utils/config";

export async function getParcels(data) {
  const url = `${endpoint}/parcels`;
  return await request({
    url,
    method: "GET",
    data,
  });
}

export async function postAppraisal(data) {
  const url = `${endpoint}/appraisal`;
  return await request({
    url,
    method: "POST",
    data,
  });
}

export async function postEncumbrance(data) {
  const url = `${endpoint}/encumbrance`;
  return await request({
    url,
    method: "POST",
    data,
  });
}

export async function postRectification(data) {
  const url = `${endpoint}/rectifications`;
  return await request({
    url,
    method: "POST",
    data,
  });
}
