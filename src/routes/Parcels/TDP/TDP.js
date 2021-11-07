import React from "react";
import moment from "moment";

import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";

import PARCEL_VIEW from "../../../LIMSGIS/map.htm";
import { Theme } from "../../../utils/theme";

import ARROW_ICON from "../../../assets/img/north-arrow.png";

export const TDP = (props) => {
  // state props received
  const { search, parcelData } = props;

  // dispatch props received
  const { redirect } = props;
  console.log(parcelData);

  return (
    <Boxed pad="10px 20px">
      <Boxed align="right" pad="15px 0" className="no-print">
        <Button
          clear
          color={Theme.SecondaryTextColor}
          onClick={() => redirect("/parcels")}
        >
          Back
        </Button>{" "}
        <Button onClick={() => window.print()}>Print</Button>
      </Boxed>
      <Boxed pad="10px" background="#FFFFFF">
        <Text pad="10px" align="center" fontSize="24px" fontWeight="bold">
          {parcelData.ParcelNumber}
        </Text>

        <Text padding="5px 0">
          Land Guaranty To: <b>{parcelData.parcelNumber}</b>
        </Text>
        <Text padding="5px 0">
          Situated At: <b>{parcelData.LEGAL_DESC}</b>
        </Text>

        <Boxed display="flex">
          <Text padding="20px 0 5px 0">
            {" "}
            Signed By: _________________________________{" "}
          </Text>

          <Text padding="10px 0 5px 0" margin="auto 0 0 0" pad="0 10px">
            Date : ______________________________
          </Text>
        </Boxed>
        <Grid desktop="40px auto" tablet="40px auto" mobile="40px auto">
          <Boxed pad="10px 0">
            <img src={ARROW_ICON} width="38px" alt="north-arrow" />
          </Boxed>
          <iframe
            src={`https://limsone.com.ng/map.html${search ? search : ""}`}
            // src={`${PARCEL_VIEW}`}
            width="100%"
            height="375px"
            style={{ width: "100%" }}
          ></iframe>
        </Grid>

        <Boxed pad="10px 0">
          <Text>
            Surveyed By: <b>{parcelData.surveyedBy}</b>
          </Text>
          <Text>
            Drawn By: <b>{parcelData.drawnBy}</b>
          </Text>
          <Text>
            Checked By: <b>{parcelData.checkedBy}</b>
          </Text>
          <Text>
            Passed By: <b>{parcelData.passedBy}</b>
          </Text>
        </Boxed>
        <Text padding="10px" align="center" fontSize={Theme.SecondaryFontSize}>
          All bearings and distances shown on this plan has been computed from
          the registered coordinates. <br />
          Date: {moment().format("ll")}
        </Text>
      </Boxed>
    </Boxed>
  );
};
