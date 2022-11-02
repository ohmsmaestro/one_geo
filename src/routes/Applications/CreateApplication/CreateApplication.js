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
import { Uploader } from '../../../components/Uploader.components'
import { ParcelCard } from "../../../components/Card.components";
import { PageTitle, Icon, FileIcon } from "../../../components/style";

import { calcViewMode, getBase64, formatCurrency } from "../../../utils/utils";
import { Theme } from "../../../utils/theme";
import { ASSIGN_MODE } from "../../../utils/constant";

const ownerShipOptions = [
  { value: "PRIVATE", label: 'Private' },
  { value: "COOPERATE", label: 'Co-Operate' },
]

const applicationTypeOptions = [
  { value: "CUSTOMARY", label: 'Customary' },
  { value: "STATUTORY", label: 'Statutory' },
]
const maritalOptions = [
  { value: "SINGLE", label: 'Single' },
  { value: "MARRIED", label: 'Married' },
]

export const CreateApplication = (props) => {
  let viewMode = calcViewMode();
  // state props received
  const {
    isLoading,
    modiStateList,
    requirementList,
    isLoadingStates,
    isLoadingRequirements,
    params,
    parcelData
  } = props;

  const { isAssignMode } = params

  // dispatch props received
  const { form, redirect, fetchStates, getAllRequirements, postApplication, getParcelDetail, createAssignOwner } =
    props;
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
  const [requirementFiles, setRequirementFiles] = useState({});
  const [list, setList] = useState([]);

  // handle logic for uploading an image
  const beforeUpload = (file, id) => {
    const isJEPG = file.type === "application/pdf";
    if (!isJEPG) {
      Alert.error("You can only upload PDF file.");
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      Alert.error("Image must be smaller than 10MB!");
    }
    if (isJEPG && isLt10M) {
      handleFileUploader(file, id);
      return isJEPG && isLt10M;
    }
  };

  const handleFileUploader = (file, id) => {
    getBase64(file).then((data) => {
      const base64Data = data.split(",")[1];
      const dataFile = {
        pdf: file,
        base64: base64Data,
        type: file.type,
        name: file.name,
        size: file.size,
      };
      let list = { ...requirementFiles };
      list[id] = dataFile;
      setRequirementFiles(list);
    });
  };

  const deleteRequirementFile = (id) => {
    let list = { ...requirementFiles };
    delete list[id];
    setRequirementFiles(list);
  };

  

  useEffect(() => {
    if (params?.isAssignMode && params?.ParcelNumber) {
      // Fetch parcel Details
      getParcelDetail(params?.ParcelNumber);
    }
    fetchStates({});
    getAllRequirements({});

  }, []);

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

  const handleApplicationTypeChange = (item) => {
    setRequirementFiles({});
    switch (item.value) {
      case 'CUSTOMARY':
        requirementList?.customaryRequirements && setList(requirementList?.customaryRequirements);
        break;

      case 'STATUTORY':
        requirementList?.statutoryRequirements && setList(requirementList?.statutoryRequirements);
        break;

      default:
        break;
    }
  }

  const isPrivate = getFieldValue('ownershipType')?.value === 'PRIVATE';
  const isCooperate = getFieldValue('ownershipType')?.value === 'COOPERATE';

  console.log({ parcelData })

  const onSubmit = () => {
    validateFields((error, value) => {
      if (!error) {
        let errorExist = false;

        let requireList = [];
        list.forEach((item) => {
          if (requirementFiles[item.id]) {
            requireList.push({
              requirementId: item.id,
              fileFormat: "pdf",
              file: requirementFiles[item.id]?.base64,
            });
          } else {
            errorExist = true;
          }
        });
        if (errorExist && !isAssignMode) {
          Alert.error("All requirement files are compulsory.");
        } else {
          if (photo?.base64 || isAssignMode) {
            switch (value?.ownershipType?.value) {
              case 'PRIVATE':
                let privateData = {
                  type: value?.type?.value ?? '',
                  ownershipType: value?.ownershipType?.value ?? '',
                  photo: photo?.base64 ?? '',
                  maritalStatus: value?.maritalStatus?.value ?? '',

                  gender: value?.gender ?? '',
                  nin: value?.nin ?? '',
                  passportNumber: value?.passportNumber ?? '',
                  tin: value?.tin ?? '',

                  firstname: value?.firstname?.trim() ?? '',
                  middlename: value?.middlename ? value?.middlename?.trim() : "",
                  lastname: value?.lastname?.trim() ?? '',

                  phone: value?.phone?.trim() ?? '',
                  email: value?.email?.trim() ?? '',
                  dob: (value?.dob && moment(value?.dob).format("YYYY-MM-DD")) ?? '',

                  stateOfOrigin: value?.stateOfOrigin?.stateId ?? '',
                  lgaOfOrigin: value?.lgaOfOrigin?.lgaId ?? '',

                  stateOfResidence: value?.stateOfResidence?.stateId ?? '',
                  lgaOfResidence: value?.lgaOfResidence?.lgaId ?? '',
                  homeTown: value?.homeTown ?? '',

                  nationality: value?.nationality ?? '',
                  mailAddress: value?.mailAddress ?? '',
                  residentialAddress: value?.residentialAddress ?? '',

                  occupation: value?.occupation ?? '',
                  employerName: value?.employerName ?? '',
                  employerAddress: value?.employerAddress ?? '',
                  residentialAddress: value?.residentialAddress ?? '',

                  repName: value?.repName ?? '',
                  repAddress: value?.repAddress ?? '',
                  repAddress: value?.repAddress ?? '',
                  repPhone: value?.repPhone ?? '',
                  repEmail: value?.repEmail ?? '',

                  files: requireList,
                }
                if(isAssignMode){ 
                  createAssignOwner({ ...privateData, parcelNumber: params?.ParcelNumber });
                } else {
                  postApplication(privateData);
                }
                break;

              case 'COOPERATE':
                let companyData = {
                  type: value?.type?.value ?? '',
                  ownershipType: value?.ownershipType?.value ?? '',
                  photo: photo?.base64 ?? '',

                  name: value?.name ?? '',
                  companyEmail: value?.companyEmail ?? '',
                  companyType: value?.companyType ?? '',
                  phone: value?.phone ?? '',

                  contactName: value?.contactName ?? '',
                  contactPhone: value?.contactPhone ?? '',
                  contactAddress: value?.contactAddress ?? '',

                  sourceOfCapital: value?.sourceOfCapital ?? '',
                  registrationNumber: value?.registrationNumber ?? '',
                  registeredAddress: value?.registeredAddress ?? '',
                  registrationDate: (value?.registrationDate && moment(value?.registrationDate).format("YYYY-MM-DD")) ?? '',

                  managerName: value?.managerName ?? '',
                  managerPhone: value?.managerPhone ?? '',
                  ceoName: value?.ceoName ?? '',
                  ceoPhone: value?.ceoPhone ?? '',

                  repName: value?.repName ?? '',
                  repAddress: value?.repAddress ?? '',
                  repAddress: value?.repAddress ?? '',
                  repPhone: value?.repPhone ?? '',
                  repEmail: value?.repEmail ?? '',

                  files: requireList,
                }
                if(isAssignMode) {
                  createAssignOwner({ ...companyData, parcelNumber: params?.ParcelNumber });
                } else {
                  postApplication(companyData);
                }
                break;

              default:
                break;
            }

          } else {
            Alert.error('Photo is required')
          }
        }
      }
    });
  };
  const isRequired = isAssignMode ? false : true;

  return (
    <Boxed pad="20px">
      <PageTitle>
        <span
          onClick={() => redirect("/application")}
          style={{ cursor: "pointer", fontWeight: 300 }}
        >
          Applications
        </span>
        / {isAssignMode ? 'Assign Owner':"Application Creation"}
      </PageTitle>

      <Boxed pad="10px 0 ">
        {isAssignMode && parcelData?.ParcelNumber && <ParcelCard parcelData={parcelData}/>}
      </Boxed>

      <Grid
        desktop="repeat(3,1fr)"
        tablet="repeat(3,1fr)"
        mobile="repeat(1,1fr)"
      >
        <Boxed margin="10px 0">
          <AsyncSelect
            label="Applciation Type"
            placeholder="Select type..."
            options={applicationTypeOptions}
            error={
              (errors = getFieldError("type"))
                ? "Application type is required"
                : null
            }
            {...getFieldProps("type", {
              rules: [{ required: isRequired }],
              onChange: e => handleApplicationTypeChange(e)
            })}
          />
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
        <div />
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


      {isPrivate && (
        <>
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
                    rules: [{ required: isRequired }],
                  })}
                  style={{ margin: "0 20px 0 0" }}
                />
                <RadioButton
                  name="gender"
                  value="F"
                  label="Female"
                  onClick={() => setFieldsValue({ gender: "F" })}
                  {...getFieldProps("gender", {
                    rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired, type: "email" }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired, }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
                  rules: [{ required: isRequired }],
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
              rules: [{ required: isRequired }],
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
              rules: [{ required: isRequired, type: "email" }],
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
              rules: [{ required: isRequired }],
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
            rules: [{ required: isRequired }],
          })}
        />
      </Boxed>

      {
        isLoadingRequirements ? (
          <Boxed pad="10px" display="flex">
            <Loader margin="auto" />
          </Boxed>
        ) : (
          <Grid
            desktop="repeat(2, 1fr)"
            tablet="repeat(2, 1fr)"
            mobile="repeat(1, 1fr)"
          >
            {list &&
              list.map((item) => {
                return (
                  <Boxed pad="10px 0">
                    <Text fontSize={Theme.SecondaryFontSize} fontWeight="bold">
                      {item.description} File
                    </Text>
                    {requirementFiles[item.id] ? (
                      <Boxed display="flex" pad="10px">
                        <FileIcon type="pdf" size="30px" />
                        <Boxed pad="0 10px">
                          <Text> {requirementFiles[item.id]?.name}</Text>
                          <Text fontSize={Theme.SecondaryFontSize}>
                            {" "}
                            {requirementFiles[item.id]?.size &&
                              formatCurrency(
                                Math.floor(
                                  requirementFiles[item.id]?.size / 1024
                                ) || 0
                              )}{" "}
                            KB
                          </Text>
                          <Button
                            margin="5px 0"
                            clear
                            xs
                            onClick={() => deleteRequirementFile(item.id)}
                          >
                            <i className="icon-close" /> Remove
                          </Button>
                        </Boxed>
                      </Boxed>
                    ) : (
                      <Upload
                        type="drap"
                        multiple={false}
                        beforeUpload={(pdf) => beforeUpload(pdf, item.id)}
                        onChange={() => { }}
                      >
                        <Boxed
                          height="80px"
                          width="100%"
                          border={`1px dashed ${Theme.SecondaryTextColor}`}
                          bColor={`${Theme.SecondaryDark}50`}
                          display="flex"
                          boxShadow={Theme.PrimaryShadow}
                        >
                          <Boxed margin="auto" align="center">
                            <Icon
                              className="icon-upload-cloud-1"
                              fontSize="35px"
                              color={Theme.PrimaryTextColor}
                            />
                            <Text>Click or drag file here to upload. </Text>
                          </Boxed>
                        </Boxed>
                      </Upload>
                    )}
                  </Boxed>
                );
              })}
          </Grid>
        )
      }

      <Boxed pad="25px 0 0 0" display="flex">
        <Button
          disabled={isLoadingRequirements || isLoading}
          progress={isLoading}
          onClick={onSubmit}
          margin=" 0 0 0 auto"
        >
          {isAssignMode ? "Assign Owner" : 'Create Application'}
        </Button>


      </Boxed>
    </Boxed >
  );
};
