import React from "react";

export const Survey = (props) => {
  const { search } = props;
  const mapURL = `http://localhost:4000/map.html`;

  return <iframe src={mapURL} width="100%" height="100%"></iframe>;
};
