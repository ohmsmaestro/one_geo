import React from "react";

import { Boxed } from "./Boxed.components";
import { Text } from "./Text.components";

import PDF_ICON from "../assets/img/file-pdf.png";
import DOC_ICON from "../assets/img/file-doc.png";
import JPG_ICON from "../assets/img/file-jpg.png";

export const FileComponent = (props) => {
  const { type, name, onClick } = props;
  let ICON = "";
  switch (type) {
    case "pdf":
      ICON = PDF_ICON;
      break;

    case "doc":
      ICON = DOC_ICON;
      break;

    case "jpg":
      ICON = JPG_ICON;
      break;

    default:
      break;
  }
  return (
    <Boxed onClick={onClick ? () => onClick() : () => {}}>
      <Boxed pad="0 0 10px 0" align="center">
        <img src={ICON} alt={`${name}`} height="80px" />
      </Boxed>
      <Text padding="10px 0" align="center">
        {name}
      </Text>
    </Boxed>
  );
};
