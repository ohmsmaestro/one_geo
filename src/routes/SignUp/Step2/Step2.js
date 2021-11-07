import React, { useState } from "react";
import Upload from "rc-upload";

import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { Alert } from "../../../components/Alert.components";
import { Icon } from "../../../components/style";

import { calcViewMode } from "../../../utils/utils";

import { Theme } from "../../../utils/theme";
import { getBase64 } from "../../../utils/utils";

export const Step2 = (props) => {
  // state props
  const { regForm, isLoading } = props;

  // dispatch props
  const { registerAccount, redirect, goBack } = props;
  let viewMode = calcViewMode();

  const [file, setFile] = useState({});

  const onSubmit = ({ skip }) => {
    if (file.base64 || skip) {
      let data = {
        ...regForm,
      };
      !skip && (data["base64"] = file.base64);
      console.log(data);
      registerAccount(data);
    } else {
      Alert.error("Upload is required");
    }
  };

  // handle logic for uploading an image
  const beforeUpload = (file) => {
    const isJEPG = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJEPG) {
      Alert.error("You can only upload JEPG & PNG file.");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Alert.error("Image must be smaller than 2MB!");
    }
    if (isJEPG && isLt2M) {
      handleFileUploader(file);
      return isJEPG && isLt2M;
    }
  };

  const handleFileUploader = (file) => {
    getBase64(file).then((data) => {
      const base64Data = data.split(",")[1];
      setFile({
        pdf: file,
        base64: base64Data,
        format: file.type,
        name: file.name,
      });
    });
  };

  let errors;

  return (
    <>
      <Grid
        desktop="repeat(2, 1fr)"
        tablet="repeat(2, 1fr)"
        mobile="repeat(1, 1fr)"
        pad="20px 0"
      >
        <Boxed pad="10px">
          <Text fontWeight="600" padding="10px 0">
            Choose passport{" "}
          </Text>
          {file.base64 ? (
            <Boxed>
              <embed
                type={file.format}
                src={`data:${file.format}; base64, ${file.base64}`}
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
            </Boxed>
          ) : (
            <Upload
              type="drap"
              multiple={false}
              beforeUpload={(pdf) => beforeUpload(pdf)}
              onChange={() => {}}
            >
              <Boxed
                height="200px"
                width="200px"
                border={`1px dashed ${Theme.SecondaryTextColor}`}
                bColor={`${Theme.SecondaryDark}50`}
                display="flex"
                borderRadius="100%"
                boxShadow={Theme.PrimaryShadow}
              >
                <Boxed margin="auto" align="center">
                  <Icon
                    className="icon-users"
                    fontSize="35px"
                    color={Theme.PrimaryTextColor}
                  />
                  <Text>Click or drag passport file here to upload. </Text>
                </Boxed>
              </Boxed>
            </Upload>
          )}
        </Boxed>
        <Boxed pad="10px" display="flex">
          <Boxed margin="auto 0">
            {file.name && <Text margin="auto 5px"> {file.name}</Text>}
            {file.base64 && (
              <Button pale color={Theme.PrimaryRed} onClick={() => setFile({})}>
                Remove
              </Button>
            )}
            <Text padding="10px 0">
              Image formate accepted are JEPG & PNG, and size must not be
              greater than 2mb.
            </Text>
          </Boxed>
        </Boxed>
      </Grid>
      <Boxed pad="20px 0 0 0">
        <Button disabled={isLoading} progress={isLoading} onClick={onSubmit}>
          Submit
        </Button>
        <Button pale disabled={isLoading} progress={isLoading} onClick={goBack}>
          Previous
        </Button>
        <Button
          clear
          disabled={isLoading}
          progress={isLoading}
          onClick={() => onSubmit({ skip: true })}
        >
          Skip & Submit
        </Button>
      </Boxed>
    </>
  );
};
