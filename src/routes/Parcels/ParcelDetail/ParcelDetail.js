import React, { useEffect } from "react";
import moment from "moment";

import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";

import PARCEL_VIEW from "../../../LIMSGIS/map.htm";
import { Theme } from "../../../utils/theme";
import { formatCurrency } from "../../../utils/utils";

import ARROW_ICON from "../../../assets/img/north-arrow.png";
import { PageTitle } from "../../../components/style";

export const ParcelDetail = (props) => {
  // state props received
  const { params, parcelData } = props;

  // dispatch props received
  const { redirect, getSingleParcel } = props;

  useEffect(() => {
    if (params.id) {
      console.log({ parcelNumber: params.id });
      getSingleParcel({ page: 1, size: 5, search: params.id });
    }
  }, []);

  console.log({ parcelData });

  return (
    <Boxed pad="10px 20px">
      <Boxed align="right" pad="15px 0" className="no-print">
        <Button
          clear
          color={Theme.SecondaryTextColor}
          onClick={() => redirect("/parcels")}
        >
          Back
        </Button>
      </Boxed>
      <PageTitle>Plot Detail</PageTitle>
      <Boxed pad="8px 0">
        <Text
          fontSize={Theme.SecondaryFontSize}
          color={Theme.SecondaryTextColor}
        >
          Plot Number
        </Text>
        <Text>{parcelData.ParcelNumber}</Text>
      </Boxed>
      <Grid
        desktop="repeat(3, 1fr)"
        tablet="repeat(3,1fr)"
        mobile="repeat(2, 1fr)"
      >
        <Boxed pad="8px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Registration Number
          </Text>
          <Text>{parcelData.REG_NUMBER}</Text>
        </Boxed>

        <Boxed pad="8px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Registration Date
          </Text>
          <Text>{parcelData.REG_DATE}</Text>
        </Boxed>

        <Boxed pad="8px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Category
          </Text>
          <Text>{parcelData.CATEGORY}</Text>
        </Boxed>

        <Boxed pad="8px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Land Type
          </Text>
          <Text>{parcelData.LAND_TYPE}</Text>
        </Boxed>
        <Boxed pad="8px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Land Use
          </Text>
          <Text>{parcelData.LAND_USE}</Text>
        </Boxed>
        <Boxed pad="8px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Area
          </Text>
          <Text>
            {parcelData.Shape__Area &&
              formatCurrency(
                Math.round(parcelData.Shape__Area * 100) / 100
              )}{" "}
            sqr meter
          </Text>
        </Boxed>

        <Boxed pad="8px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Checked By
          </Text>
          <Text>{parcelData.checkedBy}</Text>
        </Boxed>
        <Boxed pad="8px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Passed By
          </Text>
          <Text>{parcelData.passedBy}</Text>
        </Boxed>
        <Boxed pad="8px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Drawn By
          </Text>
          <Text>{parcelData.drawnBy}</Text>
        </Boxed>
        <Boxed pad="8px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Surveyed By
          </Text>
          <Text>{parcelData.surveyedBy}</Text>
        </Boxed>
      </Grid>
      <Boxed pad="8px 0">
        <Text
          fontSize={Theme.SecondaryFontSize}
          color={Theme.SecondaryTextColor}
        >
          Legal Description
        </Text>
        <Text>{parcelData.LEGAL_DESC}</Text>
      </Boxed>
    </Boxed>
  );
};
