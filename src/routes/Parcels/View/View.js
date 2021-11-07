import React from "react";

import PARCEL_VIEW from "../../../LIMSGIS/map.htm";

export const View = (props) => {
  const { search } = props;
  const mapURL = `https://limsone.com.ng/map.html${search ? search : ""}`;
  console.log({ mapURL });
  return (
    <iframe
      src={mapURL}
      // src={`${PARCEL_VIEW}`}
      width="100%"
      height="100%"
    ></iframe>
  );
};
