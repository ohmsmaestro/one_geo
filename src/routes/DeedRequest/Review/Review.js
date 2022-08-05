import React, { useEffect, useState } from "react";
import moment from "moment";

import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { Loader } from "../../../components/Loader.components";
import { PageTitle } from "../../../components/style";

import {
  calcViewMode,
  formatCurrency,
  formatDate,
  getOptionsLabel
} from "../../../utils/utils";
import { deedStatusOption } from '../../../utils/constant'
import { Theme } from "../../../utils/theme";
import { MAP_URL } from "../../../utils/config";

import DecisionModal from "./DecisionModal/index";

const PersonalCard = ({ person, loading }) => {
  return (
    <Boxed
      pad="20px"
      border={`1px solid ${Theme.PrimaryBorderColor}`}
      borderRadius={Theme.PrimaryRadius}
    >
      {loading ? (
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
              <Text>{person?.firstname}</Text>
            </Boxed>
            <Boxed pad="5px 0">
              <Text
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
              >
                Middle Name
              </Text>
              <Text>{person?.middlename}</Text>
            </Boxed>
            <Boxed pad="5px 0">
              <Text
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
              >
                Last Name
              </Text>
              <Text>{person?.lastname}</Text>
            </Boxed>

            <Boxed pad="5px 0">
              <Text
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
              >
                Phone Number
              </Text>
              <Text>{person?.phone}</Text>
            </Boxed>
            <Boxed pad="5px 0">
              <Text
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
              >
                Email
              </Text>
              <Text>{person?.email}</Text>
            </Boxed>
            <Boxed pad="5px 0">
              <Text
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
              >
                Date Of Birth
              </Text>
              <Text>{person?.dob && formatDate(person?.dob)}</Text>
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
              <Text>{person?.stateOfOrigin}</Text>
            </Boxed>
            <Boxed pad="5px 0">
              <Text
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
              >
                LGA of Origin
              </Text>
              <Text>{person?.lgaOfOrigin}</Text>
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
              <Text>{person?.stateOfResidence}</Text>
            </Boxed>
            <Boxed pad="5px 0">
              <Text
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
              >
                LGA of Residence
              </Text>
              <Text>{person?.lgaOfResidence}</Text>
            </Boxed>
          </Grid>
          <Boxed pad="5px 0">
            <Text
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
            >
              Residential Address
            </Text>
            <Text>{person?.residentialAddress}</Text>
          </Boxed>
        </>
      )}
    </Boxed>
  );
};

export const Review = (props) => {
  let viewMode = calcViewMode();
  // state props received
  const {
    deedDecisionModal,
    isLoadingParcel,
    isLoadingOwner,
    isLoadingNewOwner,
    parcelData,
    parcelOwner,
    params,
    deedData,
    deedNewOwner,
  } = props;

  // dispatch props received
  const { redirect, getDeedDetails, openDecisionModal } = props;

  useEffect(() => {
    getDeedDetails({ id: params.ParcelNumber });
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
        / Review
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
          {deedData.stageId === 1 && (
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
          )}
        </Boxed>
      </Boxed>

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
            Deed Number
          </Text>
          <Text padding="0 5px">{deedData.id}</Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Status
          </Text>
          <Text padding="0 5px">{getOptionsLabel(deedData.stageName, deedStatusOption)}</Text>
        </Boxed>
        <Boxed />
      </Grid>

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
      {/* #############         E N D    :    P A R C E L   D E T A I L       ############# */}

      {/* #############         S T A R T    :    O L D   O W N E R S   D E T A I L       ############# */}
      <Text
        size={Theme.SecondaryTextColor}
        fontSize={Theme.SecondaryFontSize}
        padding="20px 5px 5px 5px"
        fontWeight={600}
      >
        Old owner's Detail
      </Text>

      <PersonalCard person={parcelOwner} loading={isLoadingOwner} />
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
      <PersonalCard person={deedNewOwner} loading={isLoadingNewOwner} />
      {/* #############         E N D    :    N E W   O W N E R S   D E T A I L       ############# */}
      {deedDecisionModal && <DecisionModal />}
    </Boxed>
  );
};
