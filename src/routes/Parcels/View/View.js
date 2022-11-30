import React from "react";
import { Boxed } from "../../../components/Boxed.components";
import { Button } from '../../../components/Button.components';

import { MAP_URL } from "../../../utils/config";

export const View = (props) => {
  const { search , redirect} = props;
  const mapURL = `${MAP_URL}/map.html${search ? search : ""}`;
  return (
  <Boxed display="relative">
    <Button xs onClick={() => redirect('/parcels')} style={{ position : "absolute",  top: "10px", right:"10px"}}> Back </Button>
    <iframe src={mapURL} width="100%" height="100%">
    </iframe>
  </Boxed>);
};
