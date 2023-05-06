import React from "react";
import Upload from "rc-upload"
import PropTypes from 'prop-types';

import { Boxed } from "./Boxed.components";
import { Alert } from './Alert.components';
import { Text } from './Text.components';
import { Icon } from "./style";

import { Theme } from "../utils/theme";
import { getBase64 } from "../utils/utils";

export const Uploader = ({ maxSize, types, multiple, callBack, message }) => {

    // handle logic for uploading an image
    const beforeUpload = (file) => {
        const isType = types.includes(file.type);

        if (!isType) {
            Alert.error(`You can only upload${types.map(item => ` ${item},`)} file format.`);
        }
        const isSize = file.size / 1024 / 1024 < maxSize;
        if (!isSize) {
            Alert.error(`Image must be smaller than ${maxSize}MB!`);
        }
        if (isType && isSize) {
            handleFileUploader(file);
            return isType && isSize;
        }
    };

    const handleFileUploader = (file) => {
        getBase64(file).then((data) => {
            const base64Data = data.split(",")[1];

            callBack({
                file: file,
                base64: base64Data,
                type: file.type,
                name: file.name,
                size: file.size,
            });
        });
    };

    return (
        <Upload
            type="drap"
            multiple={multiple}
            beforeUpload={(file) => beforeUpload(file)}
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
                    <Text>{message} </Text>
                </Boxed>
            </Boxed>
        </Upload>
    )
}

Uploader.defaultProps = {
    maxSize: 10,
    multiple: false,
    callBack: () => { },
    message: 'Click or drag instrument file here to upload',
    types: ["application/pdf"]
};

Uploader.propTypes = {
    maxSize: PropTypes.number,
    multiple: PropTypes.bool,
    callBack: PropTypes.func,
    message: PropTypes.string,
    types: PropTypes.array,
};