import React, { useEffect } from "react";

import Dropdown from "react-bootstrap/Dropdown";

import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Input } from "../../../components/Input.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { Loader } from "../../../components/Loader.components";
import { Avatar } from "../../../components/Avatar.components";
import { FileComponent } from "../../../components/File.components";
import { PageTitle, Icon, StyledDrpDown, HR } from "../../../components/style";

import { calcViewMode, formatDate } from "../../../utils/utils";
import { pageOptions } from "../../../utils/constant";
import { Theme } from "../../../utils/theme";

import MALE_IMG from "../../../assets/img/male.png";

import DecisionModal from "./DecisionModal";

export const Review = (props) => {
  // state props
  const { isLoading, applicationDetail, params, decisionModal } = props;
  const documents = applicationDetail.documents
    ? applicationDetail.documents
    : [];

  // dispatch props
  const { redirect, getApplicationDetail, openDecisionModal } = props;

  useEffect(() => {
    let data = {
      id: params.id,
    };
    getApplicationDetail(data);
  }, []);

  let viewMode = calcViewMode();

  const DropDownMenu = (props) => {
    const { record } = props;
    return (
      <StyledDrpDown>
        <Dropdown>
          <Dropdown.Toggle variant id="dropdown-basic">
            <Icon className="icon-more-vertical" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Review</Dropdown.Item>
            <Dropdown.Item>Allocate Parcel</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </StyledDrpDown>
    );
  };

  console.log({ applicationDetail });

  return (
    <>
      <Boxed pad="20px">
        <PageTitle>
          {" "}
          <span
            onClick={() => redirect("/application")}
            style={{ cursor: "pointer", fontWeight: 300 }}
          >
            Applications
          </span>{" "}
          / Review
        </PageTitle>

        {isLoading ? (
          <Boxed pad="20px" display="flex">
            <Loader margin="auto" />
          </Boxed>
        ) : (
          <Boxed>
            <Boxed pad="10px 0" align="right">
              {applicationDetail.status === "PENDING" && (
                <>
                  <Button
                    color={Theme.PrimaryRed}
                    onClick={() => openDecisionModal("DECLINE")}
                  >
                    Decline
                  </Button>
                  <Button onClick={() => openDecisionModal("APPROVE")}>
                    Approve
                  </Button>
                </>
              )}

              {applicationDetail.status === "APPROVED" && (
                <Button color={Theme.PrimaryBlue}>Allocate Parcel</Button>
              )}
            </Boxed>

            <Grid
              desktop="120px auto"
              tablet="120px auto"
              mobile="repeat(1, 1fr)"
            >
              <Boxed>
                <Avatar src={MALE_IMG} size="110px" />
              </Boxed>
              <Boxed>
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
                      Application Number
                    </Text>
                    <Text padding="0 5px">{applicationDetail.id}</Text>
                  </Boxed>
                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Submitted Date
                    </Text>
                    <Text padding="0 5px">
                      {applicationDetail.createdAt &&
                        formatDate(applicationDetail.createdAt)}
                    </Text>
                  </Boxed>

                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Status
                    </Text>
                    <Text padding="0 5px">{applicationDetail.status}</Text>
                  </Boxed>
                  {applicationDetail?.nin && (
                    <>
                      <Boxed pad="10px 0">
                        <Text
                          fontSize={Theme.SecondaryFontSize}
                          color={Theme.SecondaryTextColor}
                        >
                          National Identification Number
                        </Text>
                        <Text padding="0 5px">{applicationDetail?.nin}</Text>
                      </Boxed>
                      <Boxed />
                      <Boxed />
                    </>
                  )}

                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Last Name
                    </Text>
                    <Text padding="0 5px">{applicationDetail.lastname}</Text>
                  </Boxed>
                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      First Name
                    </Text>
                    <Text padding="0 5px">{applicationDetail.firstname}</Text>
                  </Boxed>
                  <Boxed pad="10px 0">
                    {applicationDetail.middlename && (
                      <>
                        <Text
                          fontSize={Theme.SecondaryFontSize}
                          color={Theme.SecondaryTextColor}
                        >
                          Middle Name
                        </Text>
                        <Text padding="0 5px">
                          {applicationDetail.middlename}
                        </Text>{" "}
                      </>
                    )}
                  </Boxed>

                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Date of birth
                    </Text>
                    <Text padding="0 5px">
                      {applicationDetail.dob &&
                        formatDate(applicationDetail.dob)}
                    </Text>
                  </Boxed>
                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Email
                    </Text>
                    <Text padding="0 5px">{applicationDetail.email}</Text>
                  </Boxed>
                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Phone
                    </Text>
                    <Text padding="0 5px">{applicationDetail.phone}</Text>
                  </Boxed>

                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Country of Origin
                    </Text>
                    <Text padding="0 5px">Nigeria</Text>
                  </Boxed>
                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      State of Origin
                    </Text>
                    <Text padding="0 5px">
                      {applicationDetail?.stateOfOrigin}
                    </Text>
                  </Boxed>
                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Local Gov. Area of Origin
                    </Text>
                    <Text padding="0 5px">
                      {applicationDetail?.lgaOfOrigin}
                    </Text>
                  </Boxed>

                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Country of Residence
                    </Text>
                    <Text padding="0 5px">Nigeria</Text>
                  </Boxed>
                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      State of Residence
                    </Text>
                    <Text padding="0 5px">
                      {applicationDetail?.stateOfResidence}
                    </Text>
                  </Boxed>
                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Local Gov. Area of Residence
                    </Text>
                    <Text padding="0 5px">
                      {applicationDetail?.lgaOfResidence}
                    </Text>
                  </Boxed>
                </Grid>
                <Boxed pad="10px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Address of residence
                  </Text>
                  <Text padding="0 5px">
                    {applicationDetail?.residentialAddress}
                  </Text>
                </Boxed>
              </Boxed>
            </Grid>
            <HR />
            <Text
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
            >
              Scanned File(s)
            </Text>
            <Boxed>
              <Grid
                desktop="repeat(5, 1fr)"
                tablet="repeat(4, 1fr)"
                mobile="repeat(2, 1fr)"
              >
                {documents.length &&
                  documents.map((item, index) => {
                    return (
                      <Boxed pad="10px" key={index}>
                        <FileComponent
                          name={item.description}
                          type={item.fileFormat}
                        />
                      </Boxed>
                    );
                  })}
              </Grid>
            </Boxed>
          </Boxed>
        )}
      </Boxed>
      {decisionModal && <DecisionModal />}
    </>
  );
};

const payload = {
  type: "SSCE_INT",
  year: 2023,
  description: "SSEC INTERNAL",
  status: "ACTIVE",
  ca3UploadEnd: "2022-01-25 00:00:00",
  ca3UploadStart: "2022-01-12 00:00:00",
  lateCA3UploadEnd: "2022-01-25 00:00:00",
  lateCA3UploadStart: "2022-01-12 00:00:00",
  lateRegistrationEnd: "2022-01-28 00:00:00",
  lateRegistrationStart: "2022-01-25 00:00:00",
  paymentEnd: "2022-01-25 00:00:00",
  paymentStart: "2022-01-12 00:00:00",
  registrationEnd: "2022-01-25 00:00:00",
  registrationStart: "2022-01-12 00:00:00",
  countriesFeeList: [
    {
      countyId: 140,
      fees: [
        {
          type: "FOUR_FIG_FIGURE",
          amount: 1000,
          currencyType: "NGN",
        },
        {
          type: "REGISTRATION_FEE",
          amount: 7800,
          currencyType: "NGN",
        },
        {
          type: "LATE_REGISTRATION_FEE",
          amount: 2000,
          currencyType: "NGN",
        },
        {
          type: "LATE_CA3_SUBMISSION",
          amount: 1000,
          currencyType: "NGN",
        },
        {
          type: "SYLLABUS",
          amount: 1000,
          currencyType: "NGN",
        },
      ],
    },
    {
      countyId: 278,
      fees: [
        {
          type: "FOUR_FIG_FIGURE",
          amount: 10,
          currencyType: "USD",
        },
        {
          type: "REGISTRATION_FEE",
          amount: 290,
          currencyType: "USD",
        },
        {
          type: "LATE_REGISTRATION_FEE",
          amount: 100,
          currencyType: "USD",
        },
        {
          type: "LATE_CA3_SUBMISSION",
          amount: 200,
          currencyType: "USD",
        },
        {
          type: "SYLLABUS",
          amount: 10,
          currencyType: "USD",
        },
      ],
    },
    {
      countyId: 239,
      fees: [
        {
          type: "FOUR_FIG_FIGURE",
          amount: 10,
          currencyType: "USD",
        },
        {
          type: "REGISTRATION_FEE",
          amount: 190,
          currencyType: "USD",
        },
        {
          type: "LATE_REGISTRATION_FEE",
          amount: 50,
          currencyType: "USD",
        },
        {
          type: "LATE_CA3_SUBMISSION",
          amount: 150,
          currencyType: "USD",
        },
        {
          type: "SYLLABUS",
          amount: 15,
          currencyType: "USD",
        },
      ],
    },
  ],
};
