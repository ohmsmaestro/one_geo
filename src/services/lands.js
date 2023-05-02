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

export async function postSubSequentTrans(data) {
  const url = `${endpoint}/sub-transactions`;
  return await request({
    url,
    method: "POST",
    data,
  });
}

export async function getSubsequentTrans(data) {
  const url = `${endpoint}/sub-transactions`;
  return await request({
    url,
    method: 'GET',
    data,
  })
}

export async function getSubsequentTransById(data) {
  const url = `${endpoint}/sub-transactions/${data.parcelNumber}`;
  return await request({
    url,
    method: 'GET',
  })
}

export async function getTDP(data) {
  const url = `${endpoint}/parcels/tdp/${data.parcelNumber}.pdf`;
  return await request({
    url,
    method: 'GET',
  })
}
