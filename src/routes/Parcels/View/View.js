import React from "react";

import { MAP_URL } from "../../../utils/config";

export const View = (props) => {
  const { search } = props;
  const mapURL = `${MAP_URL}/map.html${search ? search : ""}`;
  return <iframe src={mapURL} width="100%" height="100%"></iframe>;
};
