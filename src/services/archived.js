import request from "../utils/request";
import { endpoint } from "../utils/config";

export async function getArchived(data) {
  const url = `${endpoint}/archived/paginated?`;
  return await request({
    url,
    method: "GET",
    data,
  });
}
