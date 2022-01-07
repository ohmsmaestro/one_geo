import React from "react";

export const Survey = (props) => {
  const { search } = props;
  const mapURL = `http://127.0.0.1:5500/sample/index.html`;

  const data = localStorage.getItem("gis_app_privilege");

  const getLocalData = () => {
    console.log({ data });
    return data;
  };
  console.log({ data });
  return (
    <iframe src={mapURL} width="100%" height="100%" data-detail={data}></iframe>
  );
};
