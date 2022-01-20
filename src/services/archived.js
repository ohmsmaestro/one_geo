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

export async function getParcelArchieved(data) {
  const url = `${endpoint}/parcels/documents/${data.ParcelNumber}`;
  return await request({
    url,
    method: "GET",
  });
}

export async function getParcelArchievedFile(data) {
  const url = `${endpoint}/parcels/documents/${data.ParcelNumber}/${data.fileName}`;
  return await request({
    url,
    method: "GET",
  });
}
