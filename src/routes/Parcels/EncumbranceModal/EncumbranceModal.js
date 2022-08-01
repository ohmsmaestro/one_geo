import React, { useState, useEffect } from "react";
import Upload from "rc-upload";

import { Input, AsyncSelect } from "../../../components/Input.components";
import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { Alert } from "../../../components/Alert.components";
import { ModalComponent } from "../../../components/Modal.components";
import { FileIcon, Icon } from "../../../components/style";

import { calcViewMode, formatCurrency, getBase64 } from "../../../utils/utils";
import { Theme } from "../../../utils/theme";
import { PageTitle } from "../../../components/style";

const DefectOptions = [
  { value: 'ENCUMBRANCE', label: 'Encumbrance Defect' },
  { value: '', label: 'Title Defect' },
]

export const EncumbranceModal = (props) => {
  // State props
  const { encumbranceModal, isLoading, parcelData, defectTypes } = props;

  // Dispatch props
  const { form, createDefect, closeModal, getAllDefectTypes } = props;
  const { getFieldProps, getFieldError, validateFields } = form;

  useEffect(() => {
    //Fetch all defect types
    getAllDefectTypes();
  }, [])

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
    if (file.base64) {
      validateFields((error, value) => {
        if (!error) {
          const data = {
            description: value.encumbrance_text.trim(),
            file: file.base64,
            fileFormat: "pdf",
            parcelNumber: parcelData.ParcelNumber,
          };
          createDefect(data);
        }
      });
    } else {
      Alert.info("Instrument file is required");
    }
  };

  const defectTypeOptions = defectTypes.map(item => ({ value: item.value, value: item.label }));
  let errors;

  return (
    <>
      <ModalComponent
        show={encumbranceModal}
        onHide={closeModal}
        title={<PageTitle margin="5px 0">Create Defect</PageTitle>}
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
              Create Defect
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
            Plot Number : <b>{parcelData.ParcelNumber}</b>
          </Text>
          <Text fontSize={Theme.SecondaryFontSize}>
            Reg. Number : <b>{parcelData.REG_NUMBER}</b>
          </Text>
          <Text fontSize={Theme.SecondaryFontSize}>
            Plot Size :
            <b>
              {parcelData.Shape__Area &&
                formatCurrency(
                  Math.round(parcelData.Shape__Area * 100) / 100
                )}{" "}
              square meter
            </b>
          </Text>
          <Text fontSize={Theme.SecondaryFontSize}>
            Land Type : <b>{parcelData.LAND_TYPE}</b>
          </Text>
          <Text fontSize={Theme.SecondaryFontSize}>
            Land Use : <b>{parcelData.LAND_USE}</b>
          </Text>
        </Boxed>
        <Boxed pad="10px 0">
          <AsyncSelect
            label="Defect Type"
            options={defectTypeOptions}
            error={
              (errors = getFieldError("defect_type"))
                ? "Defect Type is required"
                : null
            }
            {...getFieldProps("defect_type", {
              initialValue: "",
              rules: [{ required: true }],
            })}
          />
        </Boxed>

        <Boxed pad="10px 0">
          <Input
            type="text"
            label="Defect Text"
            placeholder="Enter Defect text..."
            error={
              (errors = getFieldError("defect_text"))
                ? "Defect Text is required"
                : null
            }
            {...getFieldProps("defect_text", {
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
              </Boxed>
            </Boxed>
          ) : (
            <Upload
              type="drap"
              multiple={false}
              beforeUpload={(pdf) => beforeUpload(pdf)}
              onChange={() => { }}
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
