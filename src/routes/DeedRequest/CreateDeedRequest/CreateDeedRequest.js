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
import { Uploader } from '../../../components/Uploader.components';
import { PageTitle, Icon, FileIcon } from "../../../components/style";

import { calcViewMode, getBase64, formatCurrency } from "../../../utils/utils";
import { ownerShipOptions, applicationTypeOptions, maritalOptions } from "../../../utils/constant";
import { Theme } from "../../../utils/theme";
import { MAP_URL } from "../../../utils/config";

export const CreateDeedRequest = (props) => {
  let viewMode = calcViewMode();
  // state props received
  const {
    isLoading,
    modiStateList,
    isLoadingRequirements,
    isLoadingParcel,
    isLoadingOwner,
    parcelData,
    params,
    parcelOwner,
    deedTypes,
  } = props;

  // dispatch props received
  const {
    form,
    redirect,
    fetchStates,
    getAllRequirements,
    postDeepRequest,
    getSingleParcel,
    fetchDeedTypes,
  } = props;
  const {
    getFieldProps,
    getFieldError,
    validateFields,
    setFieldsValue,
    getFieldValue,
  } = form;

  const [lgaOriginList, setLgaOriginList] = useState([]);
  const [lgaResidenceList, setLgaResidenceList] = useState([]);
  const [photo, setPhoto] = useState({});

  useEffect(() => {
    fetchStates({});
    fetchDeedTypes({});
    getSingleParcel({ search: params.ParcelNumber });
  }, []);

  const onSubmit = () => {
    validateFields((error, value) => {
      if (!error) {
        if (photo.base64) {
          switch (value?.ownershipType?.value) {
            case 'PRIVATE':
              let privateData = {
                ownershipType: value?.ownershipType?.value,
                photo: photo?.base64,
                maritalStatus: value?.maritalStatus?.value,

                gender: value?.gender,
                nin: value?.nin,
                passportNumber: value?.passportNumber,
                tin: value?.tin,

                firstname: value?.firstname?.trim(),
                middlename: value?.middlename ? value?.middlename?.trim() : "",
                lastname: value?.lastname?.trim(),

                phone: value?.phone?.trim(),
                email: value?.email?.trim(),
                dob: value?.dob && moment(value?.dob).format("YYYY-MM-DD"),

                stateOfOrigin: value?.stateOfOrigin?.stateId,
                lgaOfOrigin: value?.lgaOfOrigin?.lgaId,

                stateOfResidence: value?.stateOfResidence?.stateId,
                lgaOfResidence: value?.lgaOfResidence?.lgaId,
                homeTown: value?.homeTown,

                nationality: value?.nationality,
                mailAddress: value?.mailAddress,
                residentialAddress: value?.residentialAddress,

                occupation: value?.occupation,
                employerName: value?.employerName,
                employerAddress: value?.employerAddress,
                residentialAddress: value?.residentialAddress,

                repName: value?.repName,
                repAddress: value?.repAddress,
                repAddress: value?.repAddress,
                repPhone: value?.repPhone,
                repEmail: value?.repEmail,

                fid: parcelData.FID,
                plotNumber: parcelData.ParcelNumber,

                deedTypeId : value?.deedType.value,
              }
              postDeepRequest(privateData);
              break;

            case 'COOPERATE':
              let companyData = {
                ownershipType: value?.ownershipType?.value,
                photo: photo?.base64,

                name: value?.name,
                companyEmail: value?.companyEmail,
                companyType: value?.companyType,
                phone: value?.phone,

                contactName: value?.contactName,
                contactPhone: value?.contactPhone,
                contactAddress: value?.contactAddress,

                sourceOfCapital: value?.sourceOfCapital,
                registrationNumber: value?.registrationNumber,
                registeredAddress: value?.registeredAddress,
                registrationDate: value?.registrationDate && moment(value?.registrationDate).format("YYYY-MM-DD"),

                managerName: value?.managerName,
                managerPhone: value?.managerPhone,
                ceoName: value?.ceoName,
                ceoPhone: value?.ceoPhone,

                repName: value?.repName,
                repAddress: value?.repAddress,
                repAddress: value?.repAddress,
                repPhone: value?.repPhone,
                repEmail: value?.repEmail,

                fid: parcelData.FID,
                plotNumber: parcelData.ParcelNumber,

                deedTypeId : value?.deedType.value,
              }
              postDeepRequest(companyData);
              break;

            default:
              break;
          }
        } else {
          Alert.error('Photo is required')
        }
      }
    });
  };

  let errors;

  const handleStateOriginSelect = (item) => {
    setFieldsValue({ lgaOfOrigin: {} });
    let list = item.lgas.map((element) => ({
      label: element.name,
      ...element,
    }));
    setLgaOriginList(list ? list : []);
  };

  const handleStateResidenceSelect = (item) => {
    setFieldsValue({ lgaOfResidence: {} });
    let list = item.lgas.map((element) => ({
      label: element.name,
      ...element,
    }));
    setLgaResidenceList(list ? list : []);
  };

  const isPrivate = getFieldValue('ownershipType')?.value === 'PRIVATE';
  const isCooperate = getFieldValue('ownershipType')?.value === 'COOPERATE';

  return (
    <Boxed pad="20px">
      <PageTitle>
        <span
          onClick={() => redirect("/plot")}
          style={{ cursor: "pointer", fontWeight: 300 }}
        >
          plot
        </span>{" "}
        / Deed Request
      </PageTitle>

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

      <Grid
        desktop="repeat(3,1fr)"
        tablet="repeat(3,1fr)"
        mobile="repeat(1,1fr)"
      > 
        <Boxed margin="10px 0">
          <AsyncSelect
            label="Deed Type"
            placeholder="Select deed type..."
            options={deedTypes?.map(item => ({...item, value: item?.id, label: item?.name }))}
            error={
              (errors = getFieldError("deedType"))
                ? "Deed type is required"
                : null
            }
            {...getFieldProps("deedType", {
              rules: [{ required: true }],
            })}
          />
        </Boxed>
        <Boxed margin="10px 0">
          {/* <AsyncSelect
            label="Application Type"
            placeholder="Select application type..."
            options={applicationTypeOptions}
            error={
              (errors = getFieldError("type"))
                ? "Applicatoin type is required"
                : null
            }
            {...getFieldProps("type", {
              rules: [{ required: true }],
              onChange: e => handleApplicationTypeChange(e)
            })}
          /> */}
        </Boxed>
        <Boxed margin="10px 0">
          <AsyncSelect
            label="Ownership Type"
            placeholder="Select type..."
            options={ownerShipOptions}
            error={
              (errors = getFieldError("ownershipType"))
                ? "Ownership type is required"
                : null
            }
            {...getFieldProps("ownershipType", {
              rules: [{ required: true }],
            })}
          />
        </Boxed>
        
        <Boxed margin="10px 5px">
          {photo.base64 ?
            <Boxed>
              <Text fontSize={Theme.SecondaryFontSize} fontWeight="bold">
                Passport Photo
              </Text>
              <Boxed>
                <embed
                  type={photo.type}
                  src={`data:${photo.type}; base64, ${photo.base64}`}
                  style={{
                    height: "230px",
                    maxWidth: "230px",
                    borderRadius: "100%",
                    boxShadow: Theme.PrimaryShadow,
                    border: `2px solid ${Theme.PrimaryBorderColor}`,
                    padding: "15px",
                  }}
                  alt="avatar"
                />
                <Button pale onClick={() => setPhoto({})}>Remove</Button>
              </Boxed>
            </Boxed>
            :
            <Boxed>
              <Text fontSize={Theme.SecondaryFontSize} fontWeight="bold">
                Photo
              </Text>
              <Uploader types={['image/jpeg']} callBack={(file => setPhoto(file))} message="Click or Drag image here" />
            </Boxed>

          }
        </Boxed>
      </Grid>


      {isPrivate && (<>
        <Grid
          desktop="repeat(3,1fr)"
          tablet="repeat(3,1fr)"
          mobile="repeat(1,1fr)"
        >

          <Boxed margin="10px 0">
            <Text fontSize={Theme.SecondaryFontSize} fontWeight="600">
              Gender
            </Text>
            <Boxed pad="10px 0" display="flex">
              <RadioButton
                name="gender"
                value="M"
                label="Male"
                onClick={() => setFieldsValue({ gender: "M" })}
                {...getFieldProps("gender", {
                  rules: [{ required: true }],
                })}
                style={{ margin: "0 20px 0 0" }}
              />
              <RadioButton
                name="gender"
                value="F"
                label="Female"
                onClick={() => setFieldsValue({ gender: "F" })}
                {...getFieldProps("gender", {
                  rules: [{ required: true }],
                })}
              />
            </Boxed>
          </Boxed>
          <Boxed margin="10px 0">
            <AsyncSelect
              label="Marital Status"
              placeholder="Select Marital Status..."
              options={maritalOptions}
              error={
                (errors = getFieldError("maritalStatus"))
                  ? "Marital Status is required"
                  : null
              }
              {...getFieldProps("maritalStatus", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <div />

          <Boxed margin="10px 0">
            <Input
              label="National Identification Number"
              type="text"
              placeholder="Enter National Identification Number..."
              error={
                (errors = getFieldError("nin"))
                  ? "NIN is required"
                  : null
              }
              {...getFieldProps("nin", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed margin="10px 0">
            <Input
              label="Passport Number"
              type="text"
              placeholder="Enter Passport Number..."
              error={
                (errors = getFieldError("passportNumber"))
                  ? "Passport Number is required"
                  : null
              }
              {...getFieldProps("passportNumber", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed margin="10px 0">
            <Input
              label="Tax Identification Number"
              type="text"
              placeholder="Enter TIN ..."
              error={
                (errors = getFieldError("tin"))
                  ? "Tax Identification Number is required"
                  : null
              }
              {...getFieldProps("tin", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>

          <Boxed margin="10px 0">
            <Input
              label="Surname"
              type="text"
              placeholder="Your Surname..."
              error={
                (errors = getFieldError("lastname"))
                  ? "Last Name is required"
                  : null
              }
              {...getFieldProps("lastname", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed margin="10px 0">
            <Input
              label="First Name"
              type="text"
              placeholder="Your first name..."
              error={
                (errors = getFieldError("firstname"))
                  ? "First Name is required"
                  : null
              }
              {...getFieldProps("firstname", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed margin="10px 0">
            <Input
              label="Middle Name"
              type="text"
              placeholder="Your middle name..."
              {...getFieldProps("middlename", {
                rules: [],
              })}
            />
          </Boxed>

          <Boxed margin="10px 0">
            <Input
              label="Email "
              type="email"
              placeholder="Your Email..."
              error={
                (errors = getFieldError("email")) ? "Email  is required" : null
              }
              {...getFieldProps("email", {
                rules: [{ required: true, type: "email" }],
              })}
            />
          </Boxed>
          <Boxed margin="10px 0">
            <Input
              label="Phone Number"
              type="number"
              placeholder="Your phone number..."
              error={
                (errors = getFieldError("phone"))
                  ? "Phone number is required"
                  : null
              }
              {...getFieldProps("phone", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed margin="10px 0">
            <Input
              label="Date of Birth"
              type="date"
              placeholder="Your Date of birth..."
              max={moment().subtract(18, "years").format("YYYY-MM-DD")}
              error={
                (errors = getFieldError("dob"))
                  ? "Date of birth is required"
                  : null
              }
              {...getFieldProps("dob", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>

          <Boxed margin="10px 0">
            <Input disabled label="Country of Origin" value="Nigeria" />
          </Boxed>
          <Boxed margin="10px 0">
            <AsyncSelect
              label="State of Origin"
              placeholder="Select your state of origin..."
              options={modiStateList ? modiStateList : []}
              error={
                (errors = getFieldError("stateOfOrigin"))
                  ? "State of origin is required"
                  : null
              }
              {...getFieldProps("stateOfOrigin", {
                rules: [{ required: true }],
                onChange: (value) => handleStateOriginSelect(value),
              })}
            />
          </Boxed>
          <Boxed margin="10px 0">
            <AsyncSelect
              label="Local Gov. Area of Origin"
              placeholder="Select your LGA of Origin..."
              options={lgaOriginList ? lgaOriginList : []}
              error={
                (errors = getFieldError("lgaOfOrigin")) ? "LGA is required" : null
              }
              {...getFieldProps("lgaOfOrigin", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>

          <Boxed margin="10px 0">
            <Input disabled label="Country of Residence" value="Nigeria" />
          </Boxed>
          <Boxed margin="10px 0">
            <AsyncSelect
              label="State of Residence"
              placeholder="Select your state of Residence..."
              options={modiStateList ? modiStateList : []}
              error={
                (errors = getFieldError("stateOfResidence"))
                  ? "State of Residence is required"
                  : null
              }
              {...getFieldProps("stateOfResidence", {
                rules: [{ required: true }],
                onChange: (value) => handleStateResidenceSelect(value),
              })}
            />
          </Boxed>
          <Boxed margin="10px 0">
            <AsyncSelect
              label="Local Gov. Area of Residence"
              placeholder="Select your LGA of Residence..."
              options={lgaResidenceList ? lgaResidenceList : []}
              error={
                (errors = getFieldError("lgaOfResidence"))
                  ? "LGA is required"
                  : null
              }
              {...getFieldProps("lgaOfResidence", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>

          <Boxed pad="10px 0">
            <Input
              label="Nationality"
              type="text"
              placeholder="Enter Nationality..."
              error={
                getFieldError("nationality")
                  ? 'Nationality is required'
                  : null
              }
              {...getFieldProps("nationality", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed pad="10px 0">
            <Input
              label="Home Town"
              type="text"
              placeholder="Enter home town..."
              error={
                getFieldError("homeTown")
                  ? 'Home town is required'
                  : null
              }
              {...getFieldProps("homeTown", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed pad="10px 0">
            <Input
              label="Mailing Address"
              type="text"
              placeholder="Enter mailing address..."
              error={
                getFieldError("mailAddress")
                  ? 'Mailing Address is required'
                  : null
              }
              {...getFieldProps("mailAddress", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <div />
        </Grid>
        <Boxed pad="10px 0">
          <Input
            label="Residential Address"
            type="text"
            placeholder="Enter residential address..."
            error={
              getFieldError("residentialAddress")
                ? 'Residential Address is required'
                : null
            }
            {...getFieldProps("residentialAddress", {
              rules: [{ required: true }],
            })}
          />
        </Boxed>
        <Grid
          desktop="repeat(3,1fr)"
          tablet="repeat(3,1fr)"
          mobile="repeat(1,1fr)"
        >
          <Boxed margin="10px 0">
            <Input
              label="Occupation"
              type="text"
              placeholder="Enter your occupation..."
              error={
                (errors = getFieldError("occupation")) ? "Occupation  is required" : null
              }
              {...getFieldProps("occupation", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed margin="10px 0">
            <Input
              label="Employer Name"
              type="text"
              placeholder="Your Employer name..."
              error={
                (errors = getFieldError("employerName")) ? "Employer Name  is required" : null
              }
              {...getFieldProps("employerName", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed margin="10px 0">
            <Input
              label="Employer Address"
              type="text"
              placeholder="Your Employer Address..."
              error={
                (errors = getFieldError("employerAddress")) ? "Employer Address  is required" : null
              }
              {...getFieldProps("employerAddress", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>
        </Grid>
      </>)}

      {isCooperate && (
        <>
          <Grid desktop="2fr 1fr"
            tablet="2fr 1fr"
            mobile="repeat(1,1fr)">
            <Boxed pad="15px 0">
              <Input
                label="Company Name"
                type="text"
                placeholder="Enter company name..."
                error={
                  (errors = getFieldError("name"))
                    ? "Company name is required"
                    : null
                }
                {...getFieldProps("name", {
                  rules: [{ required: true }],
                })}
              />
            </Boxed>
          </Grid>
          <Grid
            desktop="repeat(3,1fr)"
            tablet="repeat(3,1fr)"
            mobile="repeat(1,1fr)"
          >
            <Boxed pad="15px 0">
              <Input
                label="Company Email"
                type="text"
                placeholder="Enter company email..."
                error={
                  (errors = getFieldError("companyEmail"))
                    ? "Company Email is required"
                    : null
                }
                {...getFieldProps("companyEmail", {
                  rules: [{ required: true }],
                })}
              />
            </Boxed>
            <Boxed pad="15px 0">
              <Input
                label="Company Type"
                type="text"
                placeholder="Enter company type..."
                error={
                  (errors = getFieldError("companyType"))
                    ? "Company type is required"
                    : null
                }
                {...getFieldProps("companyType", {
                  rules: [{ required: true }],
                })}
              />
            </Boxed>
            <Boxed pad="15px 0">
              <Input
                label="Company Phone"
                type="number"
                placeholder="Enter company phone..."
                error={
                  (errors = getFieldError("phone"))
                    ? "Company phone is required"
                    : null
                }
                {...getFieldProps("phone", {
                  rules: [{ required: true }],
                })}
              />
            </Boxed>

            <Boxed pad="15px 0">
              <Input
                label="Contact Name"
                type="text"
                placeholder="Enter contact name..."
                error={
                  (errors = getFieldError("contactName"))
                    ? "Contact name is required"
                    : null
                }
                {...getFieldProps("contactName", {
                  rules: [{ required: true }],
                })}
              />
            </Boxed>
            <Boxed pad="15px 0">
              <Input
                label="Contact Phone"
                type="number"
                placeholder="Enter contact phone..."
                error={
                  (errors = getFieldError("contactPhone"))
                    ? "Contact Phone is required"
                    : null
                }
                {...getFieldProps("contactPhone", {
                  rules: [{ required: true, }],
                })}
              />
            </Boxed>
            <Boxed pad="15px 0">
              <Input
                label="Contact Address"
                type="text"
                placeholder="Enter contact address..."
                error={
                  (errors = getFieldError("contactAddress"))
                    ? "Contact address is required"
                    : null
                }
                {...getFieldProps("contactAddress", {
                  rules: [{ required: true }],
                })}
              />
            </Boxed>

            <Boxed pad="15px 0">
              <Input
                label="Source of Capital"
                type="text"
                placeholder="Enter Source of capital..."
                error={
                  (errors = getFieldError("sourceOfCapital"))
                    ? "Source of capital is required"
                    : null
                }
                {...getFieldProps("sourceOfCapital", {
                  rules: [{ required: true }],
                })}
              />
            </Boxed>
            <Boxed pad="15px 0">
              <Input
                label="Registration Number"
                type="text"
                placeholder="Enter Registration number..."
                error={
                  (errors = getFieldError("registrationNumber"))
                    ? "Registration number is required"
                    : null
                }
                {...getFieldProps("registrationNumber", {
                  rules: [{ required: true }],
                })}
              />
            </Boxed>
            <Boxed pad="15px 0">
              <Input
                label="Registration Date"
                type="date"
                placeholder="Your Registration Date..."
                // max={moment().subtract(18, "years").format("YYYY-MM-DD")}
                error={
                  (errors = getFieldError("registrationDate"))
                    ? "Registration Date is required"
                    : null
                }
                {...getFieldProps("registrationDate", {
                  rules: [{ required: true }],
                })}
              />
            </Boxed>

          </Grid>

          <Boxed pad="15px 0">
            <Input
              label="Registered Address"
              type="text"
              placeholder="Enter Registered address..."
              error={
                (errors = getFieldError("registeredAddress"))
                  ? "registered address is required"
                  : null
              }
              {...getFieldProps("registeredAddress", {
                rules: [{ required: true }],
              })}
            />
          </Boxed>

          <Grid
            desktop="repeat(3,1fr)"
            tablet="repeat(3,1fr)"
            mobile="repeat(1,1fr)"
          >
            <Boxed pad="15px 0">
              <Input
                label="Manager Name"
                type="text"
                placeholder="Enter Manager Name..."
                error={
                  (errors = getFieldError("managerName"))
                    ? "Manager Name is required"
                    : null
                }
                {...getFieldProps("managerName", {
                  rules: [{ required: true }],
                })}
              />
            </Boxed>
            <Boxed pad="15px 0">
              <Input
                label="Manager Phone"
                type="number"
                placeholder="Enter Manager Phone..."
                error={
                  (errors = getFieldError("managerPhone"))
                    ? "Manager Phone is required"
                    : null
                }
                {...getFieldProps("managerPhone", {
                  rules: [{ required: true }],
                })}
              />
            </Boxed>
            <div />

            <Boxed pad="15px 0">
              <Input
                label="CEO Name"
                type="text"
                placeholder="Enter CEO Name..."
                error={
                  (errors = getFieldError("ceoName"))
                    ? "CEO Name is required"
                    : null
                }
                {...getFieldProps("ceoName", {
                  rules: [{ required: true }],
                })}
              />
            </Boxed>
            <Boxed pad="15px 0">
              <Input
                label="CEO Phone"
                type="number"
                placeholder="Enter CEO Phone..."
                error={
                  (errors = getFieldError("ceoPhone"))
                    ? "CEO Phone is required"
                    : null
                }
                {...getFieldProps("ceoPhone", {
                  rules: [{ required: true }],
                })}
              />
            </Boxed>
          </Grid>
        </>
      )}

      <Grid
        desktop="repeat(3,1fr)"
        tablet="repeat(3,1fr)"
        mobile="repeat(1,1fr)"
      >
        <Boxed margin="10px 0">
          <Input
            label="Representative Name"
            type="text"
            placeholder="Your representative name..."
            error={
              (errors = getFieldError("repName")) ? "Representative name  is required" : null
            }
            {...getFieldProps("repName", {
              rules: [{ required: true }],
            })}
          />
        </Boxed>
        <Boxed margin="10px 0">
          <Input
            label="Representative Email"
            type="email"
            placeholder="Your repesentative email..."
            error={
              (errors = getFieldError("repEmail")) ? "Representative email  is required" : null
            }
            {...getFieldProps("repEmail", {
              rules: [{ required: true, type: "email" }],
            })}
          />
        </Boxed>
        <Boxed margin="10px 0">
          <Input
            label="Representative Phone"
            type="number"
            placeholder="Your representative phone..."
            error={
              (errors = getFieldError("repPhone"))
                ? "Representative phone is required"
                : null
            }
            {...getFieldProps("repPhone", {
              rules: [{ required: true }],
            })}
          />
        </Boxed>
      </Grid>
      <Boxed margin="10px 0">
        <Input
          label="Representative Address"
          type="text"
          placeholder="Your representative address..."
          error={
            (errors = getFieldError("repAddress")) ? "Representative address  is required" : null
          }
          {...getFieldProps("repAddress", {
            rules: [{ required: true }],
          })}
        />
      </Boxed>

      {/* #############         E N D    :    N E W   O W N E R S   D E T A I L       ############# */}
      <Boxed pad="25px 0 0 0" display="flex">
        <Button
          disabled={isLoadingRequirements || isLoading}
          progress={isLoading}
          onClick={onSubmit}
          margin=" 0 0 0 auto"
        >
          Create Deed Request
        </Button>
      </Boxed>
    </Boxed>
  );
};
