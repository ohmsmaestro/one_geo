import React, { useEffect } from "react";
import moment from "moment";

import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";

import { Theme } from "../../../utils/theme";

import ARROW_ICON from "../../../assets/img/north-arrow.png";

import { MAP_URL } from "../../../utils/config";
import { formatCurrency } from "../../../utils/utils";

export const TDP = (props) => {
  // state props received
  const {
    parcelData,
    parcelOwner,
    params,
    isLoadingParcel,
    isLoadingOwner,
    showPrint,
  } = props;

  // dispatch props received
  const { redirect, getParcelDetails } = props;

  useEffect(() => {
    params?.ParcelNumber && getParcelDetails({ search: params.ParcelNumber });
  }, []);

  const mapURL = `${MAP_URL}/map.html${
    parcelData ? `?tdp=${parcelData.FID}` : ""
  }`;

  let fullName = `${parcelOwner.firstname} ${parcelOwner.middlename} ${parcelOwner.lastname}`;

  return (
    <Boxed pad="10px 20px">
      {showPrint && (
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
      )}
      <Boxed display="flex">
        <Boxed pad="20px" background="#FFFFFF" maxWidth="800px" margin="0 auto">
          <Text pad="10px" align="center" fontSize="24px" fontWeight="600">
            CERTIFICATE OF OCCUPANCY
          </Text>
          <Text pad="10px" align="center" fontSize="18px" fontWeight="600">
            {parcelData.ParcelNumber}
          </Text>

          <Text padding="5px 0" align="center" fontSize="18px">
            Land Guaranty To:
            <br />
            <b>{fullName}</b>
            <br />
            {parcelOwner.residentialAddress}
            <br />
            <b>{parcelOwner.stateOfResidence}</b>
          </Text>
          <Boxed display="flex">
            <Text
              margin="40px auto 10px auto"
              align="center"
              style={{
                borderTop: `1px dashed ${Theme.PrimaryTextColor}`,
                width: "200px",
              }}
            >
              <b>SURVEYOR GENERAL</b>
              <br />
              {moment().format("ll")}
            </Text>
          </Boxed>
          <Grid
            pad="20px"
            desktop="auto 40px"
            tablet="auto 40px"
            mobile="auto 40px"
          >
            <iframe
              src={mapURL}
              width="100%"
              height="375px"
              style={{ width: "500px", margin: "auto" }}
            ></iframe>
            <Boxed pad="10px 0">
              <img src={ARROW_ICON} width="38px" alt="north-arrow" />
            </Boxed>
          </Grid>

          <Grid
            pad="10px"
            desktop="repeat(2, 1fr)"
            tablet="repeat(2, 1fr)"
            mobile="repeat(2, 1fr)"
          >
            <Grid
              desktop="100px auto"
              tablet="100px auto"
              mobile="100px auto"
              gap="0"
            >
              <Text
                border={`1px solid ${Theme.PrimaryTextColor}`}
                fontWeight="600"
                padding="2px 5px"
              >
                Origin
              </Text>
              <Text
                border={`1px solid ${Theme.PrimaryTextColor}`}
                fontWeight="600"
                padding="2px 5px"
              >
                {" "}
              </Text>

              <Text
                border={`1px solid ${Theme.PrimaryTextColor}`}
                fontWeight="600"
                padding="2px 5px"
              >
                Coordinates
              </Text>
              <Text
                border={`1px solid ${Theme.PrimaryTextColor}`}
                fontWeight="600"
                padding="2px 5px"
              >
                {" "}
              </Text>

              <Text
                border={`1px solid ${Theme.PrimaryTextColor}`}
                fontWeight="600"
                padding="2px 5px"
              >
                Surveyed By
              </Text>
              <Text
                border={`1px solid ${Theme.PrimaryTextColor}`}
                fontWeight="600"
                padding="2px 5px"
              >
                {parcelData.surveyedBy}
              </Text>

              <Text
                border={`1px solid ${Theme.PrimaryTextColor}`}
                fontWeight="600"
                padding="2px 5px"
              >
                Date
              </Text>
              <Text
                border={`1px solid ${Theme.PrimaryTextColor}`}
                fontWeight="600"
                padding="2px 5px"
              >
                {parcelData?.REG_DATE &&
                  moment(parcelData?.REG_DATE).format("ll")}{" "}
              </Text>

              <Text
                border={`1px solid ${Theme.PrimaryTextColor}`}
                fontWeight="600"
                padding="2px 5px"
              >
                Checked By
              </Text>
              <Text
                border={`1px solid ${Theme.PrimaryTextColor}`}
                fontWeight="600"
                padding="2px 5px"
              >
                {parcelData.checkedBy}
              </Text>

              <Text
                border={`1px solid ${Theme.PrimaryTextColor}`}
                fontWeight="600"
                padding="2px 5px"
              >
                Drawn By
              </Text>
              <Text
                border={`1px solid ${Theme.PrimaryTextColor}`}
                fontWeight="600"
                padding="2px 5px"
              >
                {parcelData.drawnBy}
              </Text>

              <Text
                border={`1px solid ${Theme.PrimaryTextColor}`}
                fontWeight="600"
                padding="2px 5px"
              >
                Location
              </Text>
              <Text
                border={`1px solid ${Theme.PrimaryTextColor}`}
                fontWeight="600"
                padding="2px 5px"
              >
                {parcelData.LEGAL_DESC}
              </Text>
            </Grid>
            <Boxed border={`1px solid ${Theme.PrimaryTextColor}`} pad="10px">
              <Text align="center" fontWeight="600">
                Schedule
              </Text>

              <Text>
                All that piece of land, surveyed under Right of Occupancy no.{" "}
                <b>{parcelData.ParcelNumber}</b> at {parcelData.LEGAL_DESC}{" "}
                Local Government Area of Yobe State, consisting of an area of{" "}
                <b>
                  {parcelData.Shape__Area &&
                    `${formatCurrency(
                      Math.round(parcelData.Shape__Area * 100) / 100
                    )} sqm`}
                </b>
                . The boundaries of which are delineated on the plan over leaf{" "}
                <b>{parcelData.ParcelNumber}</b>.
                <br />
                <b>"PLOT 27, YAKUBUN BAUCHI ROAD."</b> The boundary runs,
                starting from <b>"YB27166....."</b> thus, enclosing the area
                stated above. All corners are marked by concrete beacons and all
                bearings are referred to National Grid North.
              </Text>
            </Boxed>
          </Grid>
        </Boxed>
      </Boxed>
    </Boxed>
  );
};
