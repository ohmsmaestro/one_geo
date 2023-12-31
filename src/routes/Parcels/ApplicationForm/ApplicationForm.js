import React, { useEffect, useState } from "react";

import { AsyncSelect, Textarea } from "../../../components/Input.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { ModalComponent } from "../../../components/Modal.components";
import { Uploader } from '../../../components/Uploader.components'

import { calcViewMode, formatCurrency } from "../../../utils/utils";
import { Theme } from "../../../utils/theme";
import { PageTitle, Icon, FileIcon } from "../../../components/style";

export const ApplicationForm = (props) => {
    // State props
    const { parcelData, applicationFormModal, applicationFormTypes, isLoading, isLoadingTypes } = props;

    // Dispatch props
    const { form, fetchApplicationFormTypes, closeModal, createApplicationForm } = props;
    const {
        getFieldProps,
        getFieldError,
        validateFields,
    } = form;

    const [file, setFile] = useState({});

    let viewMode = calcViewMode();

    useEffect(() => {
        fetchApplicationFormTypes();
    }, []);

    const onSubmit = () => {
        validateFields((error, value) => {
            if (!error) {
                let data = {
                    plotNumber: parcelData.parcelNumber,
                    typeId: value.typeId.value,
                    remark: value.remark,
                    files: []
                };
                file?.base64 && (
                    data['files'] = [{
                        requirementId: value.typeId.label,
                        fileFormat: "pdf",
                        file: file.base64,
                    }])
                createApplicationForm(data);
            }
        });
    };
    let errors;
    const renderFooter = () => <>
        <Button pale onClick={closeModal}>
            Cancel
        </Button>
        <Button
            progress={isLoading}
            disabled={isLoading}
            onClick={onSubmit}
        >
            Create Application
        </Button>
    </>

    return (
        <>
            <ModalComponent
                show={applicationFormModal}
                size={"md"}
                onHide={closeModal}
                title={<PageTitle margin="5px 0">Other Application Form</PageTitle>}
                footer={renderFooter()}
            >
                <Boxed
                    pad="10px"
                    border={`1px solid ${Theme.PrimaryBlue}`}
                    background={`${Theme.PrimaryBlue}30`}
                    borderRadius={Theme.SecondaryRadius}
                >
                    <Text fontSize={Theme.SecondaryFontSize}>
                        Plot Number : <b>{parcelData.parcelNumber}</b>
                    </Text>
                    <Text fontSize={Theme.SecondaryFontSize}>
                        Reg. Number : <b>{parcelData.registrationNumber}</b>
                    </Text>
                    <Text fontSize={Theme.SecondaryFontSize}>
                        Plot Size :
                        <b>
                            {parcelData?.landSize &&
                                formatCurrency(
                                    Math.round(parcelData?.landSize * 100) / 100
                                )}{" "}
                            square meter
                        </b>
                    </Text>
                    <Text fontSize={Theme.SecondaryFontSize}>
                        Land Type : <b>{parcelData.landType}</b>
                    </Text>
                    <Text fontSize={Theme.SecondaryFontSize}>
                        Land Use : <b>{parcelData.landUse}</b>
                    </Text>
                </Boxed>
                <Boxed pad="10px 0">
                    <AsyncSelect
                        label="Application Type"
                        placeholder="Select Type..."
                        isLoading={isLoadingTypes}
                        options={applicationFormTypes}
                        error={
                            (errors = getFieldError("typeId"))
                                ? "Applciation Type is required"
                                : null
                        }
                        {...getFieldProps("typeId", {
                            initialValue: "",
                            rules: [{ required: true }],
                        })}
                    />
                </Boxed>
                <Boxed pad="10px 0">
                    <Textarea
                        label="Remark"
                        height="100px"
                        error={
                            (errors = getFieldError("remark"))
                                ? "Applciation Type is required"
                                : null
                        }
                        {...getFieldProps("remark", {
                            initialValue: "",
                            rules: [{ required: true }],
                        })}
                    />
                </Boxed>
                <Boxed pad="10px 0">
                    <Text fontWeight="600" padding="0 0 10px 0" fontSize={Theme.SecondaryFontSize}>Attachment</Text>
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
                        <Uploader callBack={data => setFile(data)} maxSize={10} />
                    )}
                </Boxed>
            </ModalComponent>
        </>
    );
};
