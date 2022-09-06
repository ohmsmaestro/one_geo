import React from "react";

import { Input } from "../../../components/Input.components";
import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { ModalComponent } from "../../../components/Modal.components";

import { calcViewMode, formatCurrency } from "../../../utils/utils";
import { Theme } from "../../../utils/theme";
import { PageTitle, } from "../../../components/style";

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
        validateFields((error, value) => {
            if (!error) {

                let data = {
                };

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
                <Text padding="10px 0" fontWeight="600" fontSize={Theme.SecondaryFontSize}>
                    New Owner Detail
                </Text>
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
                                rules: [{ required: true, type: "email" }],
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
                                rules: [{ required: true }],
                            })}
                        />
                    </Boxed>
                </Grid>
            </ModalComponent>
        </>
    );
};
