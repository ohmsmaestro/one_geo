import React, { useEffect } from "react";
import moment from "moment";

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

import { calcViewMode, formatDate, formatCurrency } from "../../../utils/utils";
import { pageOptions } from "../../../utils/constant";
import { Theme } from "../../../utils/theme";

import MALE_IMG from "../../../assets/img/male.png";

import DecisionModal from "./DecisionModal";
import AllocateModal from "./AllocateModal";
import { MAP_URL } from "../../../utils/config";

const PrivateCard = ({ applicationDetail }) => {
  return (
    <Boxed>
      <Grid
        desktop="repeat(3,1fr)"
        tablet="repeat(3,1fr)"
        mobile="repeat(2, 1fr)"
      >

        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            National Identification Number
          </Text>
          <Text padding="0 5px">{applicationDetail?.nin}</Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Passport Number
          </Text>
          <Text padding="0 5px">{applicationDetail?.passportNumber}</Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Tax Identification Number
          </Text>
          <Text padding="0 5px">{applicationDetail?.tin}</Text>
        </Boxed>

        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Gender
          </Text>
          <Text padding="0 5px">{applicationDetail.gender === "M" ? "Male" : "Female"}</Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Marital Status
          </Text>
          <Text padding="0 5px">{applicationDetail.maritalStatus}</Text>
        </Boxed>
        <Boxed />

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
            Nationality
          </Text>
          <Text padding="0 5px">{applicationDetail?.nationality}</Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Home Town
          </Text>
          <Text padding="0 5px">
            {applicationDetail?.homeTown}
          </Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Mailing Address
          </Text>
          <Text padding="0 5px">
            {applicationDetail?.mailAddress}
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
      <Grid
        desktop="repeat(3,1fr)"
        tablet="repeat(3,1fr)"
        mobile="repeat(2, 1fr)"
      >
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Occupation
          </Text>
          <Text padding="0 5px">{applicationDetail?.occupation}</Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Employer Name
          </Text>
          <Text padding="0 5px">
            {applicationDetail?.employerName}
          </Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Employer Address
          </Text>
          <Text padding="0 5px">
            {applicationDetail?.employerAddress}
          </Text>
        </Boxed>
      </Grid>
    </Boxed>
  )
}

const CompanyCard = ({ applicationDetail }) => {
  return (
    <>
      <Boxed pad="10px 0">
        <Text
          fontSize={Theme.SecondaryFontSize}
          color={Theme.SecondaryTextColor}
        >
          Company Name
        </Text>
        <Text padding="0 5px">{applicationDetail?.firstname}</Text>
      </Boxed>

      <Grid
        desktop="repeat(3,1fr)"
        tablet="repeat(3,1fr)"
        mobile="repeat(2, 1fr)"
      >

        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Company Email
          </Text>
          <Text padding="0 5px">{applicationDetail?.nin}</Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Company Type
          </Text>
          <Text padding="0 5px">{applicationDetail?.companyType}</Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Company Phone
          </Text>
          <Text padding="0 5px">{applicationDetail?.nin}</Text>
        </Boxed>


        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Contact Name
          </Text>
          <Text padding="0 5px">{applicationDetail?.contactName}</Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Contact Phone
          </Text>
          <Text padding="0 5px">{applicationDetail?.contactPhone}</Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Contact Address
          </Text>
          <Text padding="0 5px">{applicationDetail?.contactAddress}</Text>
        </Boxed>


        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Source of Capital
          </Text>
          <Text padding="0 5px">{applicationDetail?.nin}</Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Registration Number
          </Text>
          <Text padding="0 5px">{applicationDetail?.registration_number}</Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Registration Date
          </Text>
          <Text padding="0 5px">{applicationDetail?.nin}</Text>
        </Boxed>
      </Grid>

      <Boxed pad="10px 0">
        <Text
          fontSize={Theme.SecondaryFontSize}
          color={Theme.SecondaryTextColor}
        >
          Registration Address
        </Text>
        <Text padding="0 5px">{applicationDetail?.registration_address}</Text>
      </Boxed>

      <Grid
        desktop="repeat(3,1fr)"
        tablet="repeat(3,1fr)"
        mobile="repeat(2, 1fr)"
      >

        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Manager Name
          </Text>
          <Text padding="0 5px">{applicationDetail?.managerName}</Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Manager Phone
          </Text>
          <Text padding="0 5px">{applicationDetail?.managerPhone}</Text>
        </Boxed>
        <Boxed />
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            CEO Name
          </Text>
          <Text padding="0 5px">{applicationDetail?.ceo_name}</Text>
        </Boxed>
        <Boxed pad="10px 0">
          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            CEO Phone
          </Text>
          <Text padding="0 5px">{applicationDetail?.ceo_phone}</Text>
        </Boxed>
      </Grid>

    </>
  )
}

export const Review = (props) => {
  // state props
  const {
    isLoading,
    applicationDetail,
    params,
    decisionModal,
    allocateModal,
    parcelData,
    profile,
    accessList,
  } = props;
  const documents = applicationDetail.documents
    ? applicationDetail.documents
    : [];

  // dispatch props
  const {
    redirect,
    getApplicationDetail,
    openDecisionModal,
    openAllocateModal,
    openApplicationFile,
    searchParcels,
  } = props;

  useEffect(() => {
    let data = {
      id: params.id,
    };
    getApplicationDetail(data);
  }, []);

  useEffect(() => {
    if (applicationDetail.plotNumber) {
      searchParcels({
        search: applicationDetail.plotNumber,
        size: 10,
        page: 1,
      });
    }
  }, [applicationDetail.plotNumber]);

  let viewMode = calcViewMode();
  console.log({ applicationDetail })

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
            {applicationDetail.declined ? (
              <Boxed
                pad="20px"
                border={`1px solid ${Theme.PrimaryRed}50`}
                background={`${Theme.PrimaryRed}20`}
                align="left"
              >
                <Text>
                  Declined Comment: <b>{applicationDetail.declinedComment}</b>
                </Text>
              </Boxed>
            ) : null}
            <Boxed pad="10px 0" align="right">
              {((applicationDetail.stageName === "PENDING REVIEW" &&
                accessList["REVIEW_PLOT_APPLCIATION"]) ||
                (applicationDetail.stageName === "PENDING ALLOCATION APPROVAL" &&
                  accessList["REVIEW_ALLOCATION_PLOT"]) ||
                (applicationDetail.stageName === "PENDING ACCEPTANCE" &&
                  profile?.email === applicationDetail?.email)) &&
                !applicationDetail?.declined && (
                  <>
                    <Button
                      color={Theme.PrimaryRed}
                      onClick={() => openDecisionModal("REJECTED")}
                    >
                      Decline
                    </Button>
                    <Button onClick={() => openDecisionModal("APPROVED")}>
                      {applicationDetail.stageName === "PENDING ACCEPTANCE"
                        ? "Accept"
                        : "Approve"}
                    </Button>
                  </>
                )}

              {applicationDetail.stageName === "PENDING ALLOCATION" &&
                accessList["ALLOCATE_PLOT"] && (
                  <Button
                    color={Theme.PrimaryBlue}
                    onClick={() => openAllocateModal()}
                  >
                    Allocate Parcel
                  </Button>
                )}
            </Boxed>

            <Grid
              desktop="120px auto"
              tablet="120px auto"
              mobile="repeat(1, 1fr)"
            >
              <Boxed>
                {applicationDetail.photo ? <embed
                  type={'image/jpeg'}
                  src={`data:${'image/jpeg'}; base64, ${applicationDetail.photo}`}
                  style={{
                    height: "110px",
                    maxWidth: "110px",
                    borderRadius: "5px",
                    boxShadow: Theme.PrimaryShadow,
                    border: `2px solid ${Theme.PrimaryBorderColor}`,
                    padding: "5px",
                  }}
                  alt="avatar"
                /> : <Avatar src={MALE_IMG} size="110px" />}
              </Boxed>
              <Boxed>
                <Grid
                  desktop="repeat(3,1fr)"
                  tablet="repeat(3,1fr)"
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
                    <Text padding="0 5px">
                      {applicationDetail?.declined
                        ? `Declined [${applicationDetail?.stageName}]`
                        : applicationDetail?.stageName}
                    </Text>
                  </Boxed>

                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Application Type
                    </Text>
                    <Text padding="0 5px">{applicationDetail.applicationType}</Text>
                  </Boxed>
                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Owenership Type
                    </Text>
                    <Text padding="0 5px">
                      {applicationDetail?.ownershipType}
                    </Text>
                  </Boxed>
                </Grid>

                {applicationDetail.ownershipType === "PRIVATE" && <PrivateCard applicationDetail={applicationDetail} />}

                {applicationDetail.ownershipType === "COOPERATE" && <CompanyCard applicationDetail={applicationDetail} />}

                <Grid
                  desktop="repeat(3,1fr)"
                  tablet="repeat(3,1fr)"
                  mobile="repeat(2, 1fr)"
                >
                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Representative Name
                    </Text>
                    <Text padding="0 5px">{applicationDetail?.repName}</Text>
                  </Boxed>
                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Representative Email
                    </Text>
                    <Text padding="0 5px">
                      {applicationDetail?.repEmail}
                    </Text>
                  </Boxed>
                  <Boxed pad="10px 0">
                    <Text
                      fontSize={Theme.SecondaryFontSize}
                      color={Theme.SecondaryTextColor}
                    >
                      Representative Phone
                    </Text>
                    <Text padding="0 5px">
                      {applicationDetail?.repPhone}
                    </Text>
                  </Boxed>
                </Grid>
                <Boxed pad="10px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Representative Address
                  </Text>
                  <Text padding="0 5px">
                    {applicationDetail?.repAddress}
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
                          onClick={() =>
                            openApplicationFile({
                              id: applicationDetail.id,
                              fileName: item.fileName,
                            })
                          }
                          name={item.description}
                          type={item.fileFormat}
                          cursor="pointer"
                        />
                      </Boxed>
                    );
                  })}
              </Grid>
            </Boxed>

            {applicationDetail.status === "PENDING ALLOCATION APPROVAL" ||
              (applicationDetail.status === "PENDING ACCEPTANCE" &&
                profile?.email === applicationDetail?.email) ||
              applicationDetail.status === "ALLOCATED" ? (
              <>
                <HR />
                <Text
                  fontSize={Theme.SecondaryFontSize}
                  color={Theme.SecondaryTextColor}
                >
                  Assigned Plot
                </Text>
                <Boxed pad="10px 0">
                  <Grid
                    desktop="repeat(3,1fr)"
                    tablet="repeat(3,1fr)"
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
              </>
            ) : null}
          </Boxed>
        )}
      </Boxed>
      {decisionModal && <DecisionModal />}
      {allocateModal && <AllocateModal />}
    </>
  );
};
