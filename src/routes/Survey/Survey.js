import React from "react";
import { MAP_URL } from "../../utils/config";

export const Survey = (props) => {
  const { search } = props;
  const mapURL = `${MAP_URL}/map.html`;

  const data = localStorage.getItem("gis_app_privilege");

  const getLocalData = () => {
    console.log({ data });
    return data;
  };

  return <iframe src={mapURL} width="100%" height="100%"></iframe>;
};
