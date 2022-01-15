import React, { useEffect, useState } from "react";
import Upload from "rc-upload";

import { AsyncSelect, Input } from "../../../components/Input.components";
import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { Alert } from "../../../components/Alert.components";
import { ModalComponent } from "../../../components/Modal.components";

import { calcViewMode, formatCurrency, getBase64 } from "../../../utils/utils";
import { Theme } from "../../../utils/theme";
import { PageTitle, Icon, FileIcon } from "../../../components/style";

export const Appraisal = (props) => {
  // State props
  const { appraisalModal, isLoading, appraisalTypes, parcelData } = props;

  // Dispatch props
  const { form, createAppraisal, closeModal, fetchAppraisalType } = props;
  const {
    getFieldProps,
    getFieldError,
    validateFields,
    setFieldsValue,
    getFieldValue,
  } = form;

  const [file, setFile] = useState({});
  const [firstDivisionList, setFirstDivisionList] = useState([]);
  const [secondDivisionList, setSecondDivisionList] = useState([]);

  let viewMode = calcViewMode();

  // handle logic for uploading an image
  const beforeUpload = (file) => {
    const isJEPG = file.type === "application/pdf";
    if (!isJEPG) {
      Alert.error("You can only upload PDF file.");
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      Alert.error("Image must be smaller than 10MB!");
    }
    if (isJEPG && isLt10M) {
      handleFileUploader(file);
      return isJEPG && isLt10M;
    }
  };

  const handleFileUploader = (file) => {
    getBase64(file).then((data) => {
      const base64Data = data.split(",")[1];
      setFile({
        pdf: file,
        base64: base64Data,
        type: file.type,
        name: file.name,
        size: file.size,
      });
    });
  };

  useEffect(() => {
    fetchAppraisalType();
  }, []);

  const onSubmit = () => {
    validateFields((error, value) => {
      if (!error) {
        console.log({ parcelData });
        console.log(value);
        let data = {
          type1: value.type1.id,
          type1SubDivision: value.type1SubDivision.id,
          type1Value: value.type1SubDivision.value,
          type2: "",
          type2SubDivision: "",
          type2Value: "",
          leaseTerm: value.leaseTerm,
          fileFormat: "pdf",
          file: file.base64,
          parcels: [
            {
              FID: parcelData.FID,
              parcelNumber: parcelData.ParcelNumber,
              parcelSize: parcelData.Shape__Area,
            },
          ],
        };
        createAppraisal(data);
      }
    });
  };
  let errors;

  let modiAppraisalType = appraisalTypes.map((item) => {
    return { label: item.description, ...item };
  });

  const handleFirstType = (item) => {
    setFieldsValue({
      type1SubDivision: null,
    });
    const list = item.subTypes.map((element) => ({
      label: element.description,
      ...element,
    }));
    setFirstDivisionList(list);
  };

  return (
    <>
      <ModalComponent
        show={appraisalModal}
        size={"md"}
        onHide={closeModal}
        title={<PageTitle margin="5px 0">Plot Appraisal</PageTitle>}
        footer={
          <>
            <Button pale onClick={closeModal}>
              Cancel
            </Button>
            <Button
              progress={isLoading}
              disabled={isLoading}
              onClick={onSubmit}
            >
              Appraise Plot
            </Button>
          </>
        }
      >
        <Grid
          desktop="repeat(2, 1fr)"
          tablet="repeat(2, 1fr)"
          mobile="repeat(1,1fr)"
        >
          <Boxed pad="10px 0">
            <AsyncSelect
              label="Appraisal Type"
              placeholder="Select Type..."
              options={modiAppraisalType}
              error={
                (errors = getFieldError("type1"))
                  ? "Appraisal Type is required"
                  : null
              }
              {...getFieldProps("type1", {
                initialValue: "",
                rules: [{ required: true }],
                onChange: (value) => handleFirstType(value),
              })}
            />
          </Boxed>

          <Boxed pad="10px 0">
            <AsyncSelect
              label=" Sub Division"
              placeholder="Select sub division..."
              options={firstDivisionList}
              error={
                (errors = getFieldError("type1SubDivision"))
                  ? "Sub Division is required"
                  : null
              }
              {...getFieldProps("type1SubDivision", {
                initialValue: "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>
        </Grid>
        <Boxed pad="10px 0">
          <Input
            label="Lease Term (Years)"
            type="number"
            min={0}
            placeholder="Select lease term..."
            error={
              (errors = getFieldError("leaseTerm"))
                ? "Lease Term is required"
                : null
            }
            {...getFieldProps("leaseTerm", {
              initialValue: "",
              rules: [{ required: true }],
            })}
          />
        </Boxed>
        <Text padding="10px 0">
          Selected the aprraisal value :{" "}
          <b>{getFieldValue("type1SubDivision")?.value}</b>
        </Text>
        <Boxed pad="10px 0">
          <Text fontSize={Theme.SecondaryFontSize} fontWeight="bold">
            Upload Instrument
          </Text>
          {file.base64 ? (
            <Boxed display="flex" pad="10px">
              <FileIcon type="pdf" size="60px" />
              <Boxed pad="0 10px">
                <Text> {file.name}</Text>
                <Text fontSize={Theme.SecondaryFontSize}>
                  {" "}
                  {file.size &&
                    formatCurrency(Math.floor(file.size / 1024) || 0)}{" "}
                  KB
                </Text>
              </Boxed>
            </Boxed>
          ) : (
            <Upload
              type="drap"
              multiple={false}
              beforeUpload={(pdf) => beforeUpload(pdf)}
              onChange={() => {}}
            >
              <Boxed
                height="120px"
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
                  <Text>Click or drag instrument file here to upload. </Text>
                </Boxed>
              </Boxed>
            </Upload>
          )}
        </Boxed>
      </ModalComponent>
    </>
  );
};
