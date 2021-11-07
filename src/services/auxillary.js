import request from "../utils/request";
import { endpoint } from "../utils/config";

export async function getStates(data) {
  const url = `${endpoint}/states/paginated?`;
  return await request({
    url,
    method: "GET",
    data,
  });
}
