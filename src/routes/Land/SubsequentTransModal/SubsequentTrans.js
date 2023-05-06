import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { ModalComponent } from '../../../components/Modal.components';
import { Button } from '../../../components/Button.components';
import { Input, AsyncSelect, RadioButton } from '../../../components/Input.components';
import { Boxed } from '../../../components/Boxed.components';
import { Text } from '../../../components/Text.components';
import { Grid } from '../../../components/Grid.components';

import { PageTitle } from '../../../components/style';
import { Theme } from '../../../utils/theme';
import { formatCurrency } from '../../../utils/utils';

export const SubsequentTransForm = (props) => {
    // State props
    const { isLoading, subsequentTransModal, subsequentTransTypes, landData } = props;

    // Dispatch props
    const { form, onCloseModal, fetchSubsequentTransType, createSubsequentTrans } = props;
    const { getFieldProps, getFieldError, validateFields, setFieldsValue, getFieldValue } = form;

    useEffect(() => {
        fetchSubsequentTransType();
    }, []);

    const onSubmit = () => {
        validateFields((error, values) => {
            if (!error) {
                const data = {
                    ...values,
                    plotNumber: landData.parcelNumber,
                    subTransType: values?.subTransType?.value,
                }
                createSubsequentTrans(data)
            }
        });
    };

    const isRequired = false;

    const selectedType = getFieldValue('subTransType')?.value;

    const RenderFooter = () => (
        <>
            <Button pale onClick={onCloseModal}>
                Cancel
            </Button>
            <Button progress={isLoading} disabled={isLoading} onClick={onSubmit}>
                Save
            </Button>
        </>
    );

    let showExpiryDate = false;
    let showCollateral = false;
    let showConsideration = false;
    let showValuationDate = false;

    switch (selectedType) {
        case 'SUBLEASE':
        case 'FURTHER_CHARGES':
            showExpiryDate = true;
            showCollateral = false;
            showValuationDate = true;
            break;

        case 'DEED_OF_MORTGAGE':
            showExpiryDate = true;
            showCollateral = true;
            showValuationDate = false;
            break;

        case 'POWER_OF_ATTORNEY':
            showConsideration = true;
            break;

        default:
            showValuationDate = true;
            break;
    }

    return (
        <>
            <ModalComponent
                show={subsequentTransModal}
                size={'md'}
                onHide={onCloseModal}
                title={<PageTitle margin="5px 0">Create Subseqent Transaction</PageTitle>}
                footer={<RenderFooter />}
            >
                <><Boxed
                    pad="10px"
                    border={`1px solid ${Theme.PrimaryBlue}`}
                    background={`${Theme.PrimaryBlue}30`}
                    borderRadius={Theme.SecondaryRadius}
                >
                    <Text fontSize={Theme.SecondaryFontSize}>
                        Plot Number : <b>{landData.parcelNumber}</b>
                    </Text>
                    <Text fontSize={Theme.SecondaryFontSize}>
                        Reg. Number : <b>{landData.registrationNumber}</b>
                    </Text>
                    <Text fontSize={Theme.SecondaryFontSize}>
                        Plot Size :
                        <b>
                            {landData?.landSize &&
                                formatCurrency(
                                    Math.round(landData?.landSize * 100) / 100
                                )}{" "}
                            square meter
                        </b>
                    </Text>
                    <Text fontSize={Theme.SecondaryFontSize}>
                        Land Type : <b>{landData.landType}</b>
                    </Text>
                    <Text fontSize={Theme.SecondaryFontSize}>
                        Land Use : <b>{landData.landUse}</b>
                    </Text>
                </Boxed>

                    <Grid desktop="repeat(2, 1fr)" tablet="repeat(2, 1fr)" mobile="repeat(1,1fr)">
                        <Boxed pad="10px 0">
                            <AsyncSelect
                                label="Subsequent Type"
                                options={subsequentTransTypes?.map((item) => ({
                                    label: item.value,
                                    value: item.name
                                }))}
                                placeholder="Select Subsequent Type..."
                                error={getFieldError('subTransType') ? 'Subsequent Type is required' : null}
                                {...getFieldProps('subTransType', {
                                    initialValue: '',
                                    rules: [{ required: isRequired }]
                                })}
                            />
                        </Boxed>

                        <Boxed pad="10px 0">
                            <Input
                                label="Reference Number"
                                type="text"
                                placeholder="Enter Reference Number..."
                                error={getFieldError('referenceNo') ? 'Reference Number is required' : null}
                                {...getFieldProps('referenceNo', {
                                    initialValue: '',
                                    rules: [{ required: true }]
                                })}
                            />
                        </Boxed>
                    </Grid>
                    <Boxed pad="10px 0">
                        <Input
                            label="New Occupant(s) Name"
                            type="text"
                            placeholder="Enter Name..."
                            error={getFieldError('newOccupant') ? 'Name is required' : null}
                            {...getFieldProps('newOccupant', {
                                initialValue: '',
                                rules: [{ required: true }]
                            })}
                        />
                    </Boxed>
                    <Grid desktop="repeat(2, 1fr)" tablet="repeat(2, 1fr)" mobile="repeat(1,1fr)">
                        <Boxed pad="10px 0">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter Email..."
                                error={getFieldError('email') ? 'Email is required' : null}
                                {...getFieldProps('email', {
                                    initialValue: '',
                                    rules: [{ required: isRequired, type: 'email' }]
                                })}
                            />
                        </Boxed>
                        <Boxed pad="10px 0">
                            <Input
                                label="Phone Number"
                                type="number"
                                placeholder="Enter Phone Number..."
                                error={getFieldError('phone') ? 'Phone Number is required' : null}
                                {...getFieldProps('phone', {
                                    initialValue: '',
                                    rules: [{ required: isRequired }]
                                })}
                            />
                        </Boxed>
                    </Grid>
                    <Boxed pad="10px 0">
                        <Input
                            label="Address"
                            type="text"
                            placeholder="Enter address..."
                            error={getFieldError('address') ? 'Address is required' : null}
                            {...getFieldProps('address', {
                                initialValue: '',
                                rules: [{ required: isRequired }]
                            })}
                        />
                    </Boxed>
                    <Grid desktop="repeat(2, 1fr)" tablet="repeat(2, 1fr)" mobile="repeat(1,1fr)">
                        {showValuationDate ? (
                            <>
                                <Boxed pad="10px 0">
                                    <Input
                                        label="Valuation (N)"
                                        type="number"
                                        placeholder="Enter Amount..."
                                        error={getFieldError('valuation') ? 'Valuation is required' : null}
                                        {...getFieldProps('valuation', {
                                            initialValue: '',
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed pad="10px 0">
                                    <Input
                                        label="Date"
                                        type="date"
                                        placeholder="Select date..."
                                        error={getFieldError('dateOccured') ? 'Date is required' : null}
                                        {...getFieldProps('dateOccured', {
                                            initialValue: '',
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                            </>
                        ) : null}

                        {showExpiryDate ? (
                            <Boxed pad="10px 0">
                                <Input
                                    label="Expiry date"
                                    type="date"
                                    placeholder="Select Expiry date..."
                                    error={getFieldError('expiryDate') ? 'Expiry date is required' : null}
                                    {...getFieldProps('expiryDate', {
                                        initialValue: '',
                                        rules: [{ required: isRequired }]
                                    })}
                                />
                            </Boxed>
                        ) : null}

                        {showCollateral ? (
                            <Boxed pad="10px 0">
                                <Input
                                    label="Collateral"
                                    type="text"
                                    placeholder="Enter Collateral..."
                                    error={getFieldError('collateral') ? 'Collateral is required' : null}
                                    {...getFieldProps('collateral', {
                                        initialValue: '',
                                        rules: [{ required: isRequired }]
                                    })}
                                />
                            </Boxed>
                        ) : null}
                        {showConsideration ? (
                            <Boxed pad="10px 0">
                                <Input
                                    label="Consideration"
                                    type="text"
                                    placeholder="Enter Consideration..."
                                    error={getFieldError('consideration') ? 'Consideration is required' : null}
                                    {...getFieldProps('consideration', {
                                        initialValue: '',
                                        rules: [{ required: isRequired }]
                                    })}
                                />
                            </Boxed>
                        ) : null}

                    </Grid>
                    <Grid desktop="repeat(2, 1fr)" tablet="repeat(2, 1fr)" mobile="repeat(1,1fr)">

                        <Boxed pad="10px 0">
                            <Input
                                label="Registration Number"
                                type="text"
                                placeholder="Enter Registration Number..."
                                error={getFieldError('registrationNumber') ? 'Registration  Number is required' : null}
                                {...getFieldProps('registrationNumber', {
                                    initialValue: '',
                                    rules: [{ required: true }]
                                })}
                            />
                        </Boxed>
                        <Boxed pad="10px 0">
                            <Input
                                label="Reg. Page"
                                type="text"
                                placeholder="Enter Reg. Page..."
                                error={getFieldError('regPage') ? 'Reg. Page is required' : null}
                                {...getFieldProps('regPage', {
                                    initialValue: '',
                                    rules: [{ required: true }]
                                })}
                            />
                        </Boxed>
                        <Boxed pad="10px 0">
                            <Input
                                label="Volume"
                                type="text"
                                placeholder="Enter Volume..."
                                error={getFieldError('volume') ? 'Volume is required' : null}
                                {...getFieldProps('volume', {
                                    initialValue: '',
                                    rules: [{ required: true }]
                                })}
                            />
                        </Boxed>
                        <Boxed pad="10px 0">
                            <Input
                                label="Reg. Date"
                                type="date"
                                placeholder="Select Reg. date..."
                                error={getFieldError('registrationDate') ? 'Reg. Date is required' : null}
                                {...getFieldProps('registrationDate', {
                                    initialValue: '',
                                    rules: [{ required: isRequired }]
                                })}
                            />
                        </Boxed>
                    </Grid>
                </>
            </ModalComponent>
        </>
    );
};
