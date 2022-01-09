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
