import React, { useEffect, useState } from "react";
import moment from "moment";
import Upload from "rc-upload";

import {
  Input,
  RadioButton,
  AsyncSelect,
} from "../../../components/Input.components";

import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { Alert } from "../../../components/Alert.components";
import { Loader } from "../../../components/Loader.components";
import { PageTitle, Icon, FileIcon } from "../../../components/style";

import { calcViewMode, getBase64, formatCurrency } from "../../../utils/utils";
import { Theme } from "../../../utils/theme";
import { MAP_URL } from "../../../utils/config";

import DecisionModal from "./DecisionModal/index";

export const Review = (props) => {
  let viewMode = calcViewMode();
  // state props received
  const {
    deedDecisionModal,
    isLoadingParcel,
    isLoadingOwner,
    parcelData,
    parcelOwner,
    params,
    deedData,
  } = props;

  // dispatch props received
  const { redirect, getDeedDetails, openDecisionModal } = props;

  useEffect(() => {
    getDeedDetails({ search: params.ParcelNumber });
  }, []);

  return (
    <Boxed pad="20px">
      <PageTitle>
        <span
          onClick={() => redirect("/deeds")}
          style={{ cursor: "pointer", fontWeight: 300 }}
        >
          Deed
        </span>{" "}
        / review
      </PageTitle>
      <Boxed>
        {deedData?.declined ? (
          <Boxed
            pad="20px"
            border={`1px solid ${Theme.PrimaryRed}50`}
            background={`${Theme.PrimaryRed}20`}
            align="left"
          >
            <Text>
              Declined Comment: <b>{deedData?.declinedComment}</b>
            </Text>
          </Boxed>
        ) : null}
        <Boxed pad="10px 0" align="right">
          <>
            <Button
              color={Theme.PrimaryRed}
              onClick={() => openDecisionModal("DECLINED")}
            >
              Decline
            </Button>
            <Button onClick={() => openDecisionModal("APPROVE")}>
              Approve
            </Button>
          </>
        </Boxed>
      </Boxed>

      {/* #############         S T A R T    :    P A R C E L   D E T A I L       ############# */}
      <Text
        size={Theme.SecondaryTextColor}
        fontSize={Theme.SecondaryFontSize}
        padding="5px"
        fontWeight={600}
      >
        Plot Detail
      </Text>
      <Boxed
        pad="20px"
        border={`1px solid ${Theme.PrimaryBorderColor}`}
        borderRadius={Theme.PrimaryRadius}
      >
        {isLoadingParcel ? (
          <Boxed pad="10px" display="flex">
            <Loader margin="auto" />
          </Boxed>
        ) : (
          <Boxed pad="10px 0">
            <Grid
              desktop="repeat(3,1fr)"
              tablet="repeat=(3,1fr)"
              mobile="repeat(2, 1fr)"
            >
              <Boxed pad="10px 0">
                <Text
                  fontSize={Theme.SecondaryFontSize}
                  color={Theme.SecondaryTextColor}
                >
                  Plot Number
                </Text>
                <Text padding="0 5px">{parcelData.ParcelNumber}</Text>
              </Boxed>
              <Boxed />
              <Boxed />

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
                <Text>
                  {parcelData.REG_DATE &&
                    moment(parcelData.REG_DATE).format("ll")}
                </Text>
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
            </Grid>
            <Boxed>
              <iframe
                src={`${MAP_URL}/map.html?parcel=${parcelData.FID}`}
                width="100%"
                height="300px"
              />
            </Boxed>
          </Boxed>
        )}
      </Boxed>

      {/* #############         S T A R T    :    P A R C E L   D E T A I L       ############# */}

      {/* #############         S T A R T    :    O L D   O W N E R S   D E T A I L       ############# */}
      <Text
        size={Theme.SecondaryTextColor}
        fontSize={Theme.SecondaryFontSize}
        padding="20px 5px 5px 5px"
        fontWeight={600}
      >
        Old owner's Detail
      </Text>
      <Boxed
        pad="20px"
        border={`1px solid ${Theme.PrimaryBorderColor}`}
        borderRadius={Theme.PrimaryRadius}
      >
        {isLoadingOwner ? (
          <Boxed display="flex">
            {" "}
            <Loader />
          </Boxed>
        ) : (
          <>
            <Grid
              default="repeat(3,1fr)"
              tablet="repeat(3,1fr)"
              mobile="repeat(1,1fr)"
            >
              <Boxed pad="5px 0">
                <Text
                  fontSize={Theme.SecondaryFontSize}
                  color={Theme.SecondaryTextColor}
                >
                  First Name
                </Text>
                <Text>{parcelOwner?.firstname}</Text>
              </Boxed>
              <Boxed pad="5px 0">
                <Text
                  fontSize={Theme.SecondaryFontSize}
                  color={Theme.SecondaryTextColor}
                >
                  Middle Name
                </Text>
                <Text>{parcelOwner?.middlename}</Text>
              </Boxed>
              <Boxed pad="5px 0">
                <Text
                  fontSize={Theme.SecondaryFontSize}
                  color={Theme.SecondaryTextColor}
                >
                  Last Name
                </Text>
                <Text>{parcelOwner?.lastname}</Text>
              </Boxed>

              <Boxed pad="5px 0">
                <Text
                  fontSize={Theme.SecondaryFontSize}
                  color={Theme.SecondaryTextColor}
                >
                  Phone Number
                </Text>
                <Text>{parcelOwner?.phone}</Text>
              </Boxed>
              <Boxed pad="5px 0">
                <Text
                  fontSize={Theme.SecondaryFontSize}
                  color={Theme.SecondaryTextColor}
                >
                  Email
                </Text>
                <Text>{parcelOwner?.email}</Text>
              </Boxed>
              <Boxed pad="5px 0">
                <Text
                  fontSize={Theme.SecondaryFontSize}
                  color={Theme.SecondaryTextColor}
                >
                  Date Of Birth
                </Text>
                <Text>{parcelOwner?.dob}</Text>
              </Boxed>

              <Boxed pad="5px 0">
                <Text
                  fontSize={Theme.SecondaryFontSize}
                  color={Theme.SecondaryTextColor}
                >
                  Country of Origin
                </Text>
                <Text>Nigeria</Text>
              </Boxed>
              <Boxed pad="5px 0">
                <Text
                  fontSize={Theme.SecondaryFontSize}
                  color={Theme.SecondaryTextColor}
                >
                  State of Origin
                </Text>
                <Text>{parcelOwner?.stateOfOrigin}</Text>
              </Boxed>
              <Boxed pad="5px 0">
                <Text
                  fontSize={Theme.SecondaryFontSize}
                  color={Theme.SecondaryTextColor}
                >
                  LGA of Origin
                </Text>
                <Text>{parcelOwner?.lgaOfOrigin}</Text>
              </Boxed>

              <Boxed pad="5px 0">
                <Text
                  fontSize={Theme.SecondaryFontSize}
                  color={Theme.SecondaryTextColor}
                >
                  Country of Residence
                </Text>
                <Text>Nigeria</Text>
              </Boxed>
              <Boxed pad="5px 0">
                <Text
                  fontSize={Theme.SecondaryFontSize}
                  color={Theme.SecondaryTextColor}
                >
                  State of Residence
                </Text>
                <Text>{parcelOwner?.stateOfResidence}</Text>
              </Boxed>
              <Boxed pad="5px 0">
                <Text
                  fontSize={Theme.SecondaryFontSize}
                  color={Theme.SecondaryTextColor}
                >
                  LGA of Residence
                </Text>
                <Text>{parcelOwner?.lgaOfResidence}</Text>
              </Boxed>
            </Grid>
            <Boxed pad="5px 0">
              <Text
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
              >
                Residential Address
              </Text>
              <Text>{parcelOwner?.residentialAddress}</Text>
            </Boxed>
          </>
        )}
      </Boxed>
      {/* #############         E N D    :    O L D   O W N E R S   D E T A I L       ############# */}

      {/* #############         S T A R T    :    N E W   O W N E R S   D E T A I L       ############# */}
      <Text
        size={Theme.SecondaryTextColor}
        fontSize={Theme.SecondaryFontSize}
        padding="20px 5px 5px 5px"
        fontWeight={600}
      >
        New Owner's Details
      </Text>
      <Boxed
        pad="20px"
        border={`1px solid ${Theme.PrimaryBorderColor}`}
        borderRadius={Theme.PrimaryRadius}
      ></Boxed>
      {/* #############         E N D    :    N E W   O W N E R S   D E T A I L       ############# */}
      {deedDecisionModal && <DecisionModal />}
    </Boxed>
  );
};
