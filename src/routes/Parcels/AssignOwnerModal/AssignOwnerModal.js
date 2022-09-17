import React from "react";

import { Input, Label } from "../../../components/Input.components";
import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { ModalComponent } from "../../../components/Modal.components";
import { AsyncSelect } from "../../../components/Input.components";
import { PageTitle, } from "../../../components/style";

import { calcViewMode, formatCurrency } from "../../../utils/utils";
import { Theme } from "../../../utils/theme";
import { ownerShipOptions } from "../../../utils/constant";

export const AssignOwnerModal = (props) => {
    // State props
    const { parcelData, assignOwnerModal, isLoading, } = props;

    // Dispatch props
    const { form, closeModal, assignOwner } = props;
    const {
        getFieldProps,
        getFieldError,
        validateFields,
    } = form;

    let viewMode = calcViewMode();

    const onSubmit = () => {
        validateFields((error, values) => {
            if (!error) {
                let data = {
                    ...values,
                    ownershipType: values.value
                };
                console.log({ values, data })
                // file?.base64 && (data['file'] = file.base64)
                assignOwner(data);
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
            Assign Owner
        </Button>
    </>

    return (
        <>
            <ModalComponent
                show={assignOwnerModal}
                size={"md"}
                onHide={closeModal}
                title={<PageTitle margin="5px 0">Assign New Owner</PageTitle>}
                footer={renderFooter()}
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
                <Label padding="10px 0" fontWeight="600" fontSize={Theme.SecondaryFontSize}>
                    New Owner Detail
                </Label>
                <Grid desktop="repeat(2, 1fr)" tablet="repeat(2, 1fr)" mobile="repeat(1, 1fr)">
                    <Boxed pad="10px 0">
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
                </Grid>
                <Boxed pad="10px 0">
                    <Input
                        type="text"
                        label="Full Name"
                        placeholder="Enter full name..."
                        error={
                            (errors = getFieldError("fullName"))
                                ? "Full Name is required"
                                : null
                        }
                        {...getFieldProps("fullName", {
                            initialValue: "",
                            rules: [{ required: true }],
                        })}
                    />
                </Boxed>
                <Grid desktop="repeat(2, 1fr)" tablet="repeat(2, 1fr)" mobile="repeat(1, 1fr)">
                    <Boxed pad="10px 0">
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Enter email..."
                            error={
                                (errors = getFieldError("email"))
                                    ? "Email is required"
                                    : null
                            }
                            {...getFieldProps("email", {
                                initialValue: "",
                                rules: [{ type: "email" }],
                            })}
                        />
                    </Boxed>
                    <Boxed pad="10px 0">
                        <Input
                            type="number"
                            label="Phone Number"
                            placeholder="Enter phone number..."
                            error={
                                (errors = getFieldError("phone"))
                                    ? "Phone number is required"
                                    : null
                            }
                            {...getFieldProps("phone", {
                                initialValue: "",
                                // rules: [{ required: true }],
                            })}
                        />
                    </Boxed>
                </Grid>
            </ModalComponent>
        </>
    );
};
