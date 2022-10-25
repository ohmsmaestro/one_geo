import React from "react";
import { Boxed } from "./Boxed.components";
import { Text } from "./Text.components";

import { formatCurrency } from "../utils/utils";
import { Theme } from "../utils/theme";

export const ParcelCard = ({parcelData}) => { 
    return ( 
        <Boxed
          pad="10px"
          border={`1px solid ${Theme.PrimaryBlue}`}
          background={`${Theme.PrimaryBlue}30`}
          borderRadius={Theme.SecondaryRadius}
        >
          <Text fontSize={Theme.SecondaryFontSize}>
            Plot Number : <b>{parcelData?.ParcelNumber}</b>
          </Text>
          <Text fontSize={Theme.SecondaryFontSize}>
            Reg. Number : <b>{parcelData?.REG_NUMBER}</b>
          </Text>
          <Text fontSize={Theme.SecondaryFontSize}>
            Plot Size :
            <b>
              {parcelData?.Shape__Area &&
                formatCurrency(
                  Math.round(parcelData?.Shape__Area * 100) / 100
                )}{" "}
              square meter
            </b>
          </Text>
          <Text fontSize={Theme.SecondaryFontSize}>
            Land Type : <b>{parcelData?.LAND_TYPE}</b>
          </Text>
          <Text fontSize={Theme.SecondaryFontSize}>
            Land Use : <b>{parcelData?.LAND_USE}</b>
          </Text>
        </Boxed>
    )
}