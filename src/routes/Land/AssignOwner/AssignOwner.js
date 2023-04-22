import { useEffect, useState } from "react";
import moment from 'moment';

import { ModalComponent } from "../../../components/Modal.components";
import { Button } from "../../../components/Button.components";
import { Input, AsyncSelect, RadioButton } from "../../../components/Input.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Grid } from "../../../components/Grid.components";

import { PageTitle } from "../../../components/style";
import { Theme } from "../../../utils/theme";
import { maritalOptions } from "../../../utils/constant";


export const AssignOwnerForm = props => {
    // State props
    const { isLoading,
        modiStateList,
        assignOnwerModal,
        landData, } = props;

    // Dispatch props
    const { form, onCloseModal, fetchStates } = props;
    const {
        getFieldProps,
        getFieldError,
        validateFields,
        setFieldsValue,
        getFieldValue,
    } = form;

    const [lgaOriginList, setLgaOriginList] = useState([]);
    const [lgaResidenceList, setLgaResidenceList] = useState([]);

    useEffect(() => {
        fetchStates({});
    }, []);

    const onSubmit = () => {
        validateFields((error, values) => {
            console.log({ values });
            if (!error) { }
        })
    }

    const isRequired = false;

    const isPrivate = getFieldValue('ownershipType')?.value === 'PRIVATE';
    const isCooperate = getFieldValue('ownershipType')?.value === 'COOPERATE';

    const handleStateOriginSelect = (item) => {
        setFieldsValue({ lgaOfOrigin: {} });
        let list = item.lgas.map((element) => ({
            label: element.name,
            ...element
        }));
        setLgaOriginList(list ? list : []);
    };

    const handleStateResidenceSelect = (item) => {
        setFieldsValue({ lgaOfResidence: {} });
        let list = item.lgas.map((element) => ({
            label: element.name,
            ...element
        }));
        setLgaResidenceList(list ? list : []);
    };

    let errors;

    return (
        <>
            <ModalComponent
                show={assignOnwerModal}
                size={"md"}
                onHide={onCloseModal}
                title={<PageTitle margin="5px 0">Assign Owner</PageTitle>}
                footer={
                    <>
                        <Button pale onClick={onCloseModal}>
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

                <>
                    {isPrivate && (
                        <>
                            <Grid desktop="repeat(3,1fr)" tablet="repeat(3,1fr)" mobile="repeat(1,1fr)">
                                <Boxed margin="10px 0">
                                    <Text fontSize={Theme.SecondaryFontSize} fontWeight="600">
                                        Gender
                                    </Text>
                                    <Boxed pad="10px 0" display="flex">
                                        <RadioButton
                                            name="gender"
                                            value="M"
                                            label="Male"
                                            onClick={() => setFieldsValue({ gender: 'M' })}
                                            {...getFieldProps('gender', {
                                                rules: [{ required: isRequired }]
                                            })}
                                            style={{ margin: '0 20px 0 0' }}
                                        />
                                        <RadioButton
                                            name="gender"
                                            value="F"
                                            label="Female"
                                            onClick={() => setFieldsValue({ gender: 'F' })}
                                            {...getFieldProps('gender', {
                                                rules: [{ required: isRequired }]
                                            })}
                                        />
                                    </Boxed>
                                </Boxed>
                                <Boxed margin="10px 0">
                                    <AsyncSelect
                                        label="Marital Status"
                                        placeholder="Select Marital Status..."
                                        options={maritalOptions}
                                        error={
                                            (getFieldError('maritalStatus'))
                                                ? 'Marital Status is required'
                                                : null
                                        }
                                        {...getFieldProps('maritalStatus', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <div />

                                <Boxed margin="10px 0">
                                    <Input
                                        label="National Identification Number"
                                        type="text"
                                        placeholder="Enter National Identification Number..."
                                        error={(getFieldError('nin')) ? 'NIN is required' : null}
                                        {...getFieldProps('nin', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed margin="10px 0">
                                    <Input
                                        label="Passport Number"
                                        type="text"
                                        placeholder="Enter Passport Number..."
                                        error={
                                            (getFieldError('passportNumber'))
                                                ? 'Passport Number is required'
                                                : null
                                        }
                                        {...getFieldProps('passportNumber', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed margin="10px 0">
                                    <Input
                                        label="Tax Identification Number"
                                        type="text"
                                        placeholder="Enter TIN ..."
                                        error={
                                            (getFieldError('tin'))
                                                ? 'Tax Identification Number is required'
                                                : null
                                        }
                                        {...getFieldProps('tin', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>

                                <Boxed margin="10px 0">
                                    <Input
                                        label="Surname"
                                        type="text"
                                        placeholder="Your Surname..."
                                        error={(getFieldError('lastname')) ? 'Last Name is required' : null}
                                        {...getFieldProps('lastname', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed margin="10px 0">
                                    <Input
                                        label="First Name"
                                        type="text"
                                        placeholder="Your first name..."
                                        error={
                                            (getFieldError('firstname')) ? 'First Name is required' : null
                                        }
                                        {...getFieldProps('firstname', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed margin="10px 0">
                                    <Input
                                        label="Middle Name"
                                        type="text"
                                        placeholder="Your middle name..."
                                        {...getFieldProps('middlename', {
                                            rules: []
                                        })}
                                    />
                                </Boxed>

                                <Boxed margin="10px 0">
                                    <Input
                                        label="Email "
                                        type="email"
                                        placeholder="Your Email..."
                                        error={(getFieldError('email')) ? 'Email  is required' : null}
                                        {...getFieldProps('email', {
                                            rules: [{ required: isRequired, type: 'email' }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed margin="10px 0">
                                    <Input
                                        label="Phone Number"
                                        type="number"
                                        placeholder="Your phone number..."
                                        error={(getFieldError('phone')) ? 'Phone number is required' : null}
                                        {...getFieldProps('phone', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed margin="10px 0">
                                    <Input
                                        label="Date of Birth"
                                        type="date"
                                        placeholder="Your Date of birth..."
                                        max={moment().subtract(18, 'years').format('YYYY-MM-DD')}
                                        error={(getFieldError('dob')) ? 'Date of birth is required' : null}
                                        {...getFieldProps('dob', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>

                                <Boxed margin="10px 0">
                                    <Input disabled label="Country of Origin" value="Nigeria" />
                                </Boxed>
                                <Boxed margin="10px 0">
                                    <AsyncSelect
                                        label="State of Origin"
                                        placeholder="Select your state of origin..."
                                        options={modiStateList ? modiStateList : []}
                                        error={
                                            (getFieldError('stateOfOrigin'))
                                                ? 'State of origin is required'
                                                : null
                                        }
                                        {...getFieldProps('stateOfOrigin', {
                                            rules: [{ required: isRequired }],
                                            onChange: (value) => handleStateOriginSelect(value)
                                        })}
                                    />
                                </Boxed>
                                <Boxed margin="10px 0">
                                    <AsyncSelect
                                        label="Local Gov. Area of Origin"
                                        placeholder="Select your LGA of Origin..."
                                        options={lgaOriginList ? lgaOriginList : []}
                                        error={(getFieldError('lgaOfOrigin')) ? 'LGA is required' : null}
                                        {...getFieldProps('lgaOfOrigin', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>

                                <Boxed margin="10px 0">
                                    <Input disabled label="Country of Residence" value="Nigeria" />
                                </Boxed>
                                <Boxed margin="10px 0">
                                    <AsyncSelect
                                        label="State of Residence"
                                        placeholder="Select your state of Residence..."
                                        options={modiStateList ? modiStateList : []}
                                        error={
                                            (getFieldError('stateOfResidence'))
                                                ? 'State of Residence is required'
                                                : null
                                        }
                                        {...getFieldProps('stateOfResidence', {
                                            rules: [{ required: isRequired }],
                                            onChange: (value) => handleStateResidenceSelect(value)
                                        })}
                                    />
                                </Boxed>
                                <Boxed margin="10px 0">
                                    <AsyncSelect
                                        label="Local Gov. Area of Residence"
                                        placeholder="Select your LGA of Residence..."
                                        options={lgaResidenceList ? lgaResidenceList : []}
                                        error={(getFieldError('lgaOfResidence')) ? 'LGA is required' : null}
                                        {...getFieldProps('lgaOfResidence', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>

                                <Boxed pad="10px 0">
                                    <Input
                                        label="Nationality"
                                        type="text"
                                        placeholder="Enter Nationality..."
                                        error={getFieldError('nationality') ? 'Nationality is required' : null}
                                        {...getFieldProps('nationality', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed pad="10px 0">
                                    <Input
                                        label="Home Town"
                                        type="text"
                                        placeholder="Enter home town..."
                                        error={getFieldError('homeTown') ? 'Home town is required' : null}
                                        {...getFieldProps('homeTown', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed pad="10px 0">
                                    <Input
                                        label="Mailing Address"
                                        type="text"
                                        placeholder="Enter mailing address..."
                                        error={getFieldError('mailAddress') ? 'Mailing Address is required' : null}
                                        {...getFieldProps('mailAddress', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <div />
                            </Grid>
                            <Boxed pad="10px 0">
                                <Input
                                    label="Residential Address"
                                    type="text"
                                    placeholder="Enter residential address..."
                                    error={
                                        getFieldError('residentialAddress') ? 'Residential Address is required' : null
                                    }
                                    {...getFieldProps('residentialAddress', {
                                        rules: [{ required: isRequired }]
                                    })}
                                />
                            </Boxed>
                            <Grid desktop="repeat(3,1fr)" tablet="repeat(3,1fr)" mobile="repeat(1,1fr)">
                                <Boxed margin="10px 0">
                                    <Input
                                        label="Occupation"
                                        type="text"
                                        placeholder="Enter your occupation..."
                                        error={
                                            (getFieldError('occupation')) ? 'Occupation  is required' : null
                                        }
                                        {...getFieldProps('occupation', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed margin="10px 0">
                                    <Input
                                        label="Employer Name"
                                        type="text"
                                        placeholder="Your Employer name..."
                                        error={
                                            (getFieldError('employerName'))
                                                ? 'Employer Name  is required'
                                                : null
                                        }
                                        {...getFieldProps('employerName', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed margin="10px 0">
                                    <Input
                                        label="Employer Address"
                                        type="text"
                                        placeholder="Your Employer Address..."
                                        error={
                                            (getFieldError('employerAddress'))
                                                ? 'Employer Address  is required'
                                                : null
                                        }
                                        {...getFieldProps('employerAddress', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                            </Grid>
                        </>
                    )}

                    {isCooperate && (
                        <>
                            <Grid desktop="2fr 1fr" tablet="2fr 1fr" mobile="repeat(1,1fr)">
                                <Boxed pad="15px 0">
                                    <Input
                                        label="Company Name"
                                        type="text"
                                        placeholder="Enter company name..."
                                        error={(getFieldError('name')) ? 'Company name is required' : null}
                                        {...getFieldProps('name', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                            </Grid>
                            <Grid desktop="repeat(3,1fr)" tablet="repeat(3,1fr)" mobile="repeat(1,1fr)">
                                <Boxed pad="15px 0">
                                    <Input
                                        label="Company Email"
                                        type="text"
                                        placeholder="Enter company email..."
                                        error={
                                            (getFieldError('companyEmail'))
                                                ? 'Company Email is required'
                                                : null
                                        }
                                        {...getFieldProps('companyEmail', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed pad="15px 0">
                                    <Input
                                        label="Company Type"
                                        type="text"
                                        placeholder="Enter company type..."
                                        error={
                                            (getFieldError('companyType')) ? 'Company type is required' : null
                                        }
                                        {...getFieldProps('companyType', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed pad="15px 0">
                                    <Input
                                        label="Company Phone"
                                        type="number"
                                        placeholder="Enter company phone..."
                                        error={(getFieldError('phone')) ? 'Company phone is required' : null}
                                        {...getFieldProps('phone', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>

                                <Boxed pad="15px 0">
                                    <Input
                                        label="Contact Name"
                                        type="text"
                                        placeholder="Enter contact name..."
                                        error={
                                            (getFieldError('contactName')) ? 'Contact name is required' : null
                                        }
                                        {...getFieldProps('contactName', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed pad="15px 0">
                                    <Input
                                        label="Contact Phone"
                                        type="number"
                                        placeholder="Enter contact phone..."
                                        error={
                                            (getFieldError('contactPhone'))
                                                ? 'Contact Phone is required'
                                                : null
                                        }
                                        {...getFieldProps('contactPhone', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed pad="15px 0">
                                    <Input
                                        label="Contact Address"
                                        type="text"
                                        placeholder="Enter contact address..."
                                        error={
                                            (getFieldError('contactAddress'))
                                                ? 'Contact address is required'
                                                : null
                                        }
                                        {...getFieldProps('contactAddress', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>

                                <Boxed pad="15px 0">
                                    <Input
                                        label="Source of Capital"
                                        type="text"
                                        placeholder="Enter Source of capital..."
                                        error={
                                            (getFieldError('sourceOfCapital'))
                                                ? 'Source of capital is required'
                                                : null
                                        }
                                        {...getFieldProps('sourceOfCapital', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed pad="15px 0">
                                    <Input
                                        label="RC Number"
                                        type="text"
                                        placeholder="Enter RC number..."
                                        error={
                                            (getFieldError('rcNumber'))
                                                ? 'RC number is required'
                                                : null
                                        }
                                        {...getFieldProps('rcNumber', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed pad="15px 0">
                                    <Input
                                        label="Registration Date"
                                        type="date"
                                        placeholder="Your Registration Date..."
                                        // max={moment().subtract(18, "years").format("YYYY-MM-DD")}
                                        error={
                                            (getFieldError('registrationDate'))
                                                ? 'Registration Date is required'
                                                : null
                                        }
                                        {...getFieldProps('registrationDate', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                            </Grid>

                            <Boxed pad="15px 0">
                                <Input
                                    label="Registered Address"
                                    type="text"
                                    placeholder="Enter Registered address..."
                                    error={
                                        (getFieldError('registeredAddress'))
                                            ? 'registered address is required'
                                            : null
                                    }
                                    {...getFieldProps('registeredAddress', {
                                        rules: [{ required: isRequired }]
                                    })}
                                />
                            </Boxed>

                            <Grid desktop="repeat(3,1fr)" tablet="repeat(3,1fr)" mobile="repeat(1,1fr)">
                                <Boxed pad="15px 0">
                                    <Input
                                        label="Manager Name"
                                        type="text"
                                        placeholder="Enter Manager Name..."
                                        error={
                                            (getFieldError('managerName')) ? 'Manager Name is required' : null
                                        }
                                        {...getFieldProps('managerName', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed pad="15px 0">
                                    <Input
                                        label="Manager Phone"
                                        type="number"
                                        placeholder="Enter Manager Phone..."
                                        error={
                                            (getFieldError('managerPhone'))
                                                ? 'Manager Phone is required'
                                                : null
                                        }
                                        {...getFieldProps('managerPhone', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <div />
                                <Boxed pad="15px 0">
                                    <Input
                                        label="CEO Name"
                                        type="text"
                                        placeholder="Enter CEO Name..."
                                        error={(getFieldError('ceoName')) ? 'CEO Name is required' : null}
                                        {...getFieldProps('ceoName', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                                <Boxed pad="15px 0">
                                    <Input
                                        label="CEO Phone"
                                        type="number"
                                        placeholder="Enter CEO Phone..."
                                        error={(getFieldError('ceoPhone')) ? 'CEO Phone is required' : null}
                                        {...getFieldProps('ceoPhone', {
                                            rules: [{ required: isRequired }]
                                        })}
                                    />
                                </Boxed>
                            </Grid>
                        </>
                    )}
                </>
            </ModalComponent>
        </>
    )
}