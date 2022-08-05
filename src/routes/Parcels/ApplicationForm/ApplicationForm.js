import React, { useEffect, useState } from "react";

import { AsyncSelect, Textarea } from "../../../components/Input.components";
import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { ModalComponent } from "../../../components/Modal.components";
import { Uploader } from '../../../components/Uploader.components'

import { calcViewMode, formatCurrency, getBase64 } from "../../../utils/utils";
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
                console.log({ parcelData, value });
                let data = {
                };
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
                title={<PageTitle margin="5px 0">Plot Appraisal</PageTitle>}
                footer={renderFooter()}
            >

                <Boxed pad="10px 0">
                    <AsyncSelect
                        label="Application Type"
                        placeholder="Select Type..."
                        isLoading={isLoadingTypes}
                        options={applicationFormTypes}
                        error={
                            (errors = getFieldError("type"))
                                ? "Applciation Type is required"
                                : null
                        }
                        {...getFieldProps("type", {
                            initialValue: "",
                            rules: [{ required: true }],
                        })}
                    />
                </Boxed>
                <Boxed pad="10px 0">
                    <Textarea
                        label="Description"
                        height="100px"
                        error={
                            (errors = getFieldError("description"))
                                ? "Applciation Type is required"
                                : null
                        }
                        {...getFieldProps("description", {
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
