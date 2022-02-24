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

export async function getMyParcels(data) {
  const url = `${endpoint}/users/parcels`;
  return await request({
    url,
    method: "GET",
    data,
  });
}

export async function getParcelOwner(data) {
  const url = `${endpoint}/parcels/owners/${data.search}`;
  return await request({
    url,
    method: "GET",
  });
}

export async function getAppraisals(data) {
  const url = `${endpoint}/appraisals`;
  return await request({
    url,
    method: "GET",
    data,
  });
}

export async function putAppraisal(data) {
  const url = `${endpoint}/appraisals`;
  return await request({
    url,
    method: "PUT",
    data,
  });
}

export async function getAppraisalType(data) {
  const url = `${endpoint}/appraisals/types`;
  return await request({
    url,
    method: "GET",
    data,
  });
}

export async function postAppraisal(data) {
  const url = `${endpoint}/appraisals`;
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

export async function getDeeds(data) {
  const url = `${endpoint}/deeds`;
  return await request({
    url,
    method: "GET",
    data,
  });
}

export async function putApproveDeed(data) {
  const url = `${endpoint}/deeds`;
  return await request({
    url,
    method: "PUT",
    data,
  });
}

export async function postDeepRequest(data) {
  const url = `${endpoint}/deeds`;
  return await request({
    url,
    method: "POST",
    data,
  });
}

export async function getDeedNewOwner(data) {
  const url = `${endpoint}/parcels/new_owner/${data.search}`;
  return await request({
    url,
    method: "GET",
  });
}
