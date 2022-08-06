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

const applicationTypeOptions = [{ value: "PRIVATE", label: 'Private' }, { value: "CORPORATE", label: 'Corporate' },]
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
    modiRequirementList,
    isLoadingStates,
    isLoadingRequirements,
  } = props;

  // dispatch props received
  const { form, redirect, fetchStates, getAllRequirements, postApplication } =
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
  const [file, setFile] = useState({});
  const [requirementFiles, setRequirementFiles] = useState({});

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

  const onSubmit = () => {
    validateFields((error, value) => {
      if (!error) {
        let errorExist = false;

        let requireList = [];
        modiRequirementList.forEach((item) => {
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
        if (errorExist) {
          Alert.error("All requirement files are compulsory.");
        } else {
          let data = {
            firstname: value.firstname.trim(),
            middlename: value.middlename ? value.middlename.trim() : "",
            lastname: value.lastname.trim(),
            phone: value.phone.trim(),
            email: value.email.trim(),
            gender: value.gender,
            dob: moment(value.dob).format("YYYY-MM-DD"),
            stateOfOrigin: value.stateOfOrigin.stateId,
            lgaOfOrigin: value.lgaOfOrigin.lgaId,
            stateOfResidence: value.stateOfResidence.stateId,
            lgaOfResidence: value.lgaOfResidence.lgaId,
            residentialAddress: value.residentialAddress,
            nin: value.nin,
            photo: "",
            files: requireList,
          };
          postApplication(data);
        }
      }
    });
  };

  useEffect(() => {
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

  const isPrivate = getFieldValue('type')?.value === 'PRIVATE';

  return (
    <Boxed pad="20px">
      <PageTitle>
        <span
          onClick={() => redirect("/application")}
          style={{ cursor: "pointer", fontWeight: 300 }}
        >
          Applications
        </span>
        / Application Creation
      </PageTitle>



      <Grid
        default="repeat(3,1fr)"
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
              rules: [{ required: true }],
            })}
          />
        </Boxed>
        <div />
        <div />
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

        <Boxed>
          <Input
            label="National Identification Number"
            type="text"
            placeholder="Enter National Identification Number..."
            {...getFieldProps("nin", {
              rules: [],
            })}
          />
        </Boxed>
        <Boxed>
          <Input
            label="Passport Number"
            type="text"
            placeholder="Enter Passport Number..."
            {...getFieldProps("passportNumber", {
              rules: [{ required: true }],
            })}
          />
        </Boxed>
        <div />

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
            label="Last Name"
            type="text"
            placeholder="Your last name..."
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

      </Grid>
      <Boxed pad="10px 0">
        <Input
          label="Residential Address"
          type="text"
          placeholder="Enter residential address..."
          error={
            getFieldError("residentialAddress")
              ? getFieldError("residentialAddress")
              : null
          }
          {...getFieldProps("residentialAddress", {
            rules: [{ required: true }],
          })}
        />
      </Boxed>

      {isPrivate && (<Grid
        default="repeat(3,1fr)"
        tablet="repeat(3,1fr)"
        mobile="repeat(1,1fr)"
      >
        <Boxed margin="10px 0">
          <Input
            label="Occupation "
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
      </Grid>)}

      {isLoadingRequirements ? (
        <Boxed pad="10px" display="flex">
          <Loader margin="auto" />
        </Boxed>
      ) : (
        <Grid
          desktop="repeat(2, 1fr)"
          tablet="repeat(2, 1fr)"
          mobile="repeat(1, 1fr)"
        >
          {modiRequirementList &&
            modiRequirementList.map((item) => {
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
      )}

      <Boxed pad="25px 0 0 0" display="flex">
        <Button
          disabled={isLoadingRequirements || isLoading}
          progress={isLoading}
          onClick={onSubmit}
          margin=" 0 0 0 auto"
        >
          Create Application
        </Button>
      </Boxed>
    </Boxed>
  );
};
