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
