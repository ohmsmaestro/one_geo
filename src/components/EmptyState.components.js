import React from "react";

import { Boxed } from "./Boxed.components";
import { Text } from "./Text.components";
import EMPTY_STATE from "../assets/img/empty-state.png";
import { Theme } from "../utils/theme";

export const EmptyState = (props) => {
  const { title, desc } = props;
  return (
    <Boxed align="center" pad="20px">
      <img
        src={EMPTY_STATE}
        alt="empty_state"
        height="150px"
        style={{ margin: "auto", padding: "10px" }}
      />
      <Text fontWeight="600" color={Theme.SecondaryTextColor}>
        {title ? title : "No Record Found."}
      </Text>
      {desc && (
        <Text
          fontSize={Theme.SecondaryFontSize}
          color={Theme.SecondaryTextColor}
        >
          {desc}
        </Text>
      )}
    </Boxed>
  );
};
