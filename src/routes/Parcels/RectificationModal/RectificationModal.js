import React, { useState } from "react";
import Upload from "rc-upload";

import { Input } from "../../../components/Input.components";
import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { Alert } from "../../../components/Alert.components";
import { ModalComponent } from "../../../components/Modal.components";
import { FileIcon, HR, Icon } from "../../../components/style";

import { calcViewMode, formatCurrency, getBase64 } from "../../../utils/utils";
import { Theme } from "../../../utils/theme";
import { PageTitle } from "../../../components/style";

export const RectificationModal = (props) => {
  // State props
  const { rectificationModal, isLoading, parcelData } = props;

  // Dispatch props
  const { form, createRectification, closeModal } = props;
  const { getFieldProps, getFieldError, validateFields } = form;

  const [file, setFile] = useState({});

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

  const onSubmit = () => {
    const payload_create_rectification = {
      entity: "PARCEL",
      entityId: "PARCEL_NUMBER",
      file: "file_base64",
      fileFormat: "pdf",
      description: "something is here .....",
      fields: [
        { fieldName: "firstName", value: "my new name" },
        { fieldName: "lastName", value: "my new last name" },
        { fieldName: "regNumber", value: "my new reg number" },
        { fieldName: "firstName", value: "my new name" },
      ],
    };
    let list = [
      "REG_NUMBER",
      "CATEGORY",
      "LAND_TYPE",
      "LAND_USE",
      "checkedBy",
      "drawnBy",
      "passedBy",
      "surveyedBy",
      "LEGAL_DESC",
    ];

    if (file.base64) {
      validateFields((error, values) => {
        if (!error) {
          console.log(values);

          let field_list = [];
          list.forEach((item) => {
            if (parcelData[item] !== values[item]) {
              field_list.push({
                fieldName: item,
                newValue: values[item],
                oldValue: parcelData[item],
              });
            }
          });

          const payload = {
            entity: "PARCEL",
            entityId: parcelData.FID,
            file: file.base64,
            fileFormat: "pdf",
            description: values.description.trim(),
            fields: field_list,
          };

          createRectification(payload);
        }
      });
    } else {
      Alert.info("Instrument file is required");
    }
  };
  let errors;

  return (
    <>
      <ModalComponent
        show={rectificationModal}
        onHide={closeModal}
        title={<PageTitle margin="5px 0">Add Rectification</PageTitle>}
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
              Save Rectification
            </Button>
          </>
        }
      >
        <Boxed
          pad="10px"
          border={`1px solid ${Theme.PrimaryBlue}`}
          background={`${Theme.PrimaryBlue}30`}
          borderRadius={Theme.SecondaryRadius}
        >
          <Text fontSize={Theme.SecondaryFontSize}>
            Parcel Number : <b>{parcelData.ParcelNumber}</b>
          </Text>
        </Boxed>
        <Grid
          desktop="repeat(2, 1fr)"
          tablet="repeat(2, 1fr)"
          mobile="repeat(1, 1fr)"
        >
          <Boxed pad="10px 0">
            <Input
              type="text"
              label="Registration Number"
              placeholder="Enter Registration number..."
              error={
                (errors = getFieldError("REG_NUMBER"))
                  ? "Registration number is required"
                  : null
              }
              {...getFieldProps("REG_NUMBER", {
                initialValue: parcelData.REG_NUMBER
                  ? parcelData.REG_NUMBER
                  : "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed pad="10px 0">
            <Input
              type="text"
              label="Category"
              placeholder="Enter Category..."
              error={
                (errors = getFieldError("CATEGORY"))
                  ? "Category is required"
                  : null
              }
              {...getFieldProps("CATEGORY", {
                initialValue: parcelData.CATEGORY ? parcelData.CATEGORY : "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>

          <Boxed pad="10px 0">
            <Input
              type="text"
              label="Land Type"
              placeholder="Enter Land type..."
              error={
                (errors = getFieldError("LAND_TYPE"))
                  ? "Land type is required"
                  : null
              }
              {...getFieldProps("LAND_TYPE", {
                initialValue: parcelData.LAND_TYPE ? parcelData.LAND_TYPE : "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed pad="10px 0">
            <Input
              type="text"
              label="Land Use"
              placeholder="Enter Land use..."
              error={
                (errors = getFieldError("LAND_USE"))
                  ? "Land use is required"
                  : null
              }
              {...getFieldProps("LAND_USE", {
                initialValue: parcelData.LAND_USE ? parcelData.LAND_USE : "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>

          <Boxed pad="10px 0">
            <Input
              type="text"
              label="Checked By"
              placeholder="Enter Checked by..."
              error={
                (errors = getFieldError("checkedBy"))
                  ? "Checked by is required"
                  : null
              }
              {...getFieldProps("checkedBy", {
                initialValue: parcelData.checkedBy ? parcelData.checkedBy : "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed pad="10px 0">
            <Input
              type="text"
              label="Drawn By"
              placeholder="Enter Drawn by..."
              error={
                (errors = getFieldError("drawnBy"))
                  ? "Drawn by is required"
                  : null
              }
              {...getFieldProps("drawnBy", {
                initialValue: parcelData.drawnBy ? parcelData.drawnBy : "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>

          <Boxed pad="10px 0">
            <Input
              type="text"
              label="Surveyed by"
              placeholder="Enter Surveyed by..."
              error={
                (errors = getFieldError("surveyedBy"))
                  ? "Surveyed by is required"
                  : null
              }
              {...getFieldProps("surveyedBy", {
                initialValue: parcelData.surveyedBy
                  ? parcelData.surveyedBy
                  : "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed pad="10px 0">
            <Input
              type="text"
              label="Passed by"
              placeholder="Enter Passed by..."
              error={
                (errors = getFieldError("passedBy"))
                  ? "Passed by is required"
                  : null
              }
              {...getFieldProps("passedBy", {
                initialValue: parcelData.passedBy ? parcelData.passedBy : "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>
        </Grid>
        <Boxed pad="10px 0">
          <Input
            type="text"
            label="Legal Description"
            placeholder="Enter Legal Description..."
            error={
              (errors = getFieldError("LEGAL_DESC"))
                ? "Legal Description is required"
                : null
            }
            {...getFieldProps("LEGAL_DESC", {
              initialValue: parcelData.LEGAL_DESC ? parcelData.LEGAL_DESC : "",
              rules: [{ required: true }],
            })}
          />
        </Boxed>
        <HR />
        <Boxed pad="10px 0">
          <Input
            type="text"
            label="Recification Description"
            placeholder="Enter Rectification description..."
            error={
              (errors = getFieldError("description"))
                ? "Rectification description is required"
                : null
            }
            {...getFieldProps("description", {
              initialValue: "",
              rules: [{ required: true }],
            })}
          />
        </Boxed>

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
                <Button margin="5px 0" clear xs onClick={() => setFile({})}>
                  <i className="icon-close" /> Remove
                </Button>
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
