import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Boxed } from '../../../components/Boxed.components';
import { Grid } from '../../../components/Grid.components';
import { PageTitle } from '../../../components/style';
import { Text } from '../../../components/Text.components';
import { Input, RadioButton, AsyncSelect } from '../../../components/Input.components';
import { Button } from '../../../components/Button.components';
import { Theme } from '../../../utils/theme';
import { Checkbox } from '../../../components/Input.components';
import { ownerShipOptions } from '../../../utils/constant';

export const CreateLandForm = (props) => {
  // State props
  const { modiStateList, isLoading, landTypes } = props;

  // Dispatch props
  const { form, createLand, fetchStates, fetchLandType } = props;
  const { getFieldProps, getFieldError, validateFields, setFieldsValue, getFieldValue } = form;

  useEffect(() => {
    fetchStates({});
    fetchLandType();
  }, []);

  const [assigned, setAssigned] = useState(false);
  const [lgaOriginList, setLgaOriginList] = useState([]);

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

  let errors;

  let isRequired = false;

  const onSubmit = () => {
    validateFields((error, values) => {

      if (!error) {
        let payload = {
          parcelNumber: values.parcelNumber,
          landSize: values?.landSize ? Number(values?.landSize) : 0,
          landUse: values.landUse?.value,
          landType: values.landType?.value,
          legalDescription: values.legalDescription,
          lga: values.lga?.value,
          lastPaymentDate: values.lastPaymentDate,
          amount: values?.amount ? Number(values?.amount) : 0,
          paymentOfMethod: values.paymentOfMethod,
          surveyPlanNumber: values.surveyPlanNumber,
          surveyDate: values.surveyDate,
          surveyDesignation: values.surveyDesignation,
          surveyorName: values.surveyorName,
          surveyorGeneralDate: values.surveyorGeneralDate,
          allocationNumber: values.allocationNumber,
          rofoNumber: values.rofoNumber,
          lengthOfTerm: values?.lengthOfTerm ? Number(values?.lengthOfTerm) : 0,
          rentRate: values?.rentRate ? Number(values?.rentRate) : 0,
          commencementDate: values.commencementDate,
          rentRevision: values.rentRevision,
          timeOfErection: values.timeOfErection,
          valueOfImprovement: values?.valueOfImprovement ? Number(values?.valueOfImprovement) : 0,
          cofoNumber: values.cofoNumber,
          executionDate: values.executionDate,
          dateOfExpiration: values.dateOfExpiration,
          registrationNumber: values.registrationNumber,
          regPage: values?.regPage ? Number(values?.regPage) : 0,
          volumeNo: values.volumeNo,
          regDate: values.regDate,
          regTime: values.regTime
        };
        if (isPrivate && assigned) {
          payload['assignedTo'] = {
            age: '',
            title: '',

            ownershipType: values?.ownershipType?.value ?? '',

            gender: values?.gender ?? '',
            nin: values?.nin ?? '',

            firstname: values?.firstname?.trim() ?? '',
            lastname: values?.lastname?.trim() ?? '',

            phone: values?.phone?.trim() ?? '',
            email: values?.email?.trim() ?? '',
            dob: (values?.dob && moment(values?.dob).format('YYYY-MM-DD')) ?? '',

            stateOfOrigin: values?.stateOfOrigin?.stateId ?? '',

            nationality: values?.nationality ?? '',
            residentialAddress: values?.residentialAddress ?? '',

            contactName: values?.contactName ?? '',
            contactAddress: values?.contactAddress ?? '',
            contactPhone: values?.contactPhone ?? '',
          };
        }

        if (isCooperate && assigned) {
          payload['assignedTo'] = {
            residentialAddress: values?.registeredAddress ?? '',
            officeAddress: values?.registeredAddress ?? '',
            nationality: 'Nigeria',
            tin: values?.tin,
            faxNumber: '',
            correspondence: 'correspondence',

            ownershipType: values?.ownershipType?.value ?? '',

            name: values?.name ?? '',
            email: values?.companyEmail ?? '',
            typeOfBusiness: values?.companyType ?? '',
            phone: values?.phone ?? '',

            contactName: values?.contactName ?? '',
            contactPhone: values?.contactPhone ?? '',
            contactAddress: values?.contactAddress ?? '',

            registrationNumber: values?.rcNumber ?? '',
            registrationAddress: values?.registeredAddress ?? '',
            registrationDate: (values?.registrationDate && moment(values?.registrationDate).format("YYYY-MM-DD")) ?? '',
          };
        }

        createLand(payload);
      }
    });
  };


  const landUseList = getFieldValue('landType')?.types ?? [];
  const lgaList = modiStateList[35]?.lgas?.map(item => ({ label: item?.name, value: item?.lgaId })) ?? [];

  console.log({ landTypes, landUseList, modiStateList });

  return (
    <Boxed pad="20px">
      <PageTitle>Create a new Land</PageTitle>

      <Boxed pad="20px 0">
        <Grid desktop="600px auto" tablet="600px auto" mobile="repeat(1,1fr)">
          <Boxed>
            <Text
              fontWeight="600"
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
            >
              Basic Info
            </Text>
            <Grid desktop="repeat(2, 1fr)" tablet="repeat(2, 1fr)" mobile="repeat(1,1fr)">
              <Boxed pad="10px 0">
                <Input
                  label="Plot Number"
                  type="text"
                  placeholder="Enter Plot Number..."
                  error={getFieldError('parcelNumber') ? 'Plot Number is required' : null}
                  {...getFieldProps('parcelNumber', {
                    initialValue: '',
                    rules: [{ required: true }]
                  })}
                />
              </Boxed>
              <Boxed pad="10px 0">
                <Input
                  label="Land Size (square meter)"
                  type="number"
                  placeholder="Enter Land size..."
                  error={getFieldError('landSize') ? 'Land Size is required' : null}
                  {...getFieldProps('landSize', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>

              <Boxed pad="10px 0">
                <AsyncSelect
                  label="Land Use"
                  options={landTypes}
                  placeholder="Select Land Type..."
                  error={getFieldError('landUse') ? 'Land Type is required' : null}
                  {...getFieldProps('landUse', {
                    initialValue: '',
                    rules: [{ required: isRequired }],
                    onChange: () => setFieldsValue({ landType: '' })
                  })}
                />
              </Boxed>
              <Boxed pad="10px 0">
                <AsyncSelect
                  label="Land Use Type"
                  options={landUseList}
                  placeholder="Select Land Use Type..."
                  error={getFieldError('landType') ? 'Land Use Type is required' : null}
                  {...getFieldProps('landType', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>

              <Boxed pad="10px 0">
                <AsyncSelect
                  label="Local Gov. Area."
                  placeholder="Select Local Gov. Area...."
                  options={lgaList}
                  error={getFieldError('lga') ? 'Local Gov. Area. is required' : null}
                  {...getFieldProps('lga', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
              <Boxed />

              <Boxed pad="10px 0">
                <Input
                  label="Survey Plan Number"
                  type="text"
                  placeholder="Enter Survey Plan Number.."
                  error={getFieldError('surveyPlanNumber') ? 'Survey Plan Numberis required' : null}
                  {...getFieldProps('surveyPlanNumber', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
              <Boxed pad="10px 0">
                <Input
                  label="Survey Date"
                  type="date"
                  max={moment().format('YYYY-MM-DD')}
                  placeholder="Select Survey Date..."
                  error={getFieldError('surveyDate') ? 'Survey Date is required' : null}
                  {...getFieldProps('surveyDate', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
              <Boxed pad="10px 0">
                <Input
                  label="Survey Designation"
                  type="text"
                  placeholder="Enter Survey Designation..."
                  error={
                    getFieldError('surveyDesignation') ? 'Survey Designation is required' : null
                  }
                  {...getFieldProps('surveyDesignation', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
              <Boxed pad="10px 0">
                <Input
                  label="Surveyor Name"
                  type="text"
                  placeholder="Enter Surveyor Name..."
                  error={getFieldError('surveyorName') ? 'Surveyor Name is required' : null}
                  {...getFieldProps('surveyorName', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
              <Boxed pad="10px 0">
                <Input
                  type="date"
                  max={moment().format('YYYY-MM-DD')}
                  label="Survey General Date"
                  placeholder="Select Survey General Date..."
                  error={
                    getFieldError('surveyorGeneralDate')
                      ? 'Surveyor General Date is required'
                      : null
                  }
                  {...getFieldProps('surveyorGeneralDate', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
            </Grid>

            <Boxed pad="10px 0">
              <Input
                label="Legal Description"
                type="text"
                placeholder="Enter Legal Description..."
                error={getFieldError('legalDescription') ? 'Legal Description is required' : null}
                {...getFieldProps('legalDescription', {
                  initialValue: '',
                  rules: [{ required: isRequired }]
                })}
              />
            </Boxed>

            <Text
              padding="40px 0 0 0"
              fontWeight="600"
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
            >
              Last Payment Info
            </Text>
            <Grid desktop="repeat(2, 1fr)" tablet="repeat(2, 1fr)" mobile="repeat(1,1fr)">
              <Boxed pad="10px 0">
                <Input
                  label="Last PaymentDate"
                  type="date"
                  max={moment().format('YYYY-MM-DD')}
                  placeholder="Select last payment date..."
                  error={getFieldError('lastPaymentDate') ? 'Last Payment Date is required' : null}
                  {...getFieldProps('lastPaymentDate', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>

              <Boxed pad="10px 0">
                <Input
                  label="Payment Method"
                  type="text"
                  placeholder="Enter Payment Method..."
                  error={getFieldError('paymentOfMethod') ? 'Payment Method is required' : null}
                  {...getFieldProps('paymentOfMethod', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>

              <Boxed pad="10px 0">
                <Input
                  label="Payment Amount"
                  type="number"
                  placeholder="Enter Amount..."
                  min={0}
                  error={getFieldError('amount') ? 'Amount is required' : null}
                  {...getFieldProps('amount', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
            </Grid>

            <Text
              padding="40px 0 0 0"
              fontWeight="600"
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
            >
              Certificate Info
            </Text>
            <Grid desktop="repeat(2, 1fr)" tablet="repeat(2, 1fr)" mobile="repeat(1,1fr)">
              <Boxed pad="10px 0">
                <Input
                  label="Registration Number"
                  type="text"
                  placeholder="Enter Registration Number..."
                  error={
                    getFieldError('registrationNumber') ? 'Registration Number is required' : null
                  }
                  {...getFieldProps('registrationNumber', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>

              <Boxed pad="10px 0">
                <Input
                  label="Allocation Number"
                  type="text"
                  placeholder="Enter Allocation Number..."
                  error={getFieldError('allocationNumber') ? 'Allocation Number is required' : null}
                  {...getFieldProps('allocationNumber', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>

              <Boxed pad="10px 0">
                <Input
                  label="ROFO Number"
                  type="text"
                  placeholder="Enter ROFO Number..."
                  error={getFieldError('rofoNumber') ? 'ROFO Number is required' : null}
                  {...getFieldProps('rofoNumber', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>

              <Boxed pad="10px 0">
                <Input
                  label="COFO Number"
                  type="text"
                  placeholder="Enter COFO Number..."
                  error={getFieldError('cofoNumber') ? 'COFO Number is required' : null}
                  {...getFieldProps('cofoNumber', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>

              <Boxed pad="10px 0">
                <Input
                  label="Length of Term"
                  type="number"
                  placeholder="Enter Length of Term..."
                  error={getFieldError('lengthOfTerm') ? 'Length of Term is required' : null}
                  {...getFieldProps('lengthOfTerm', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
              <Boxed pad="10px 0">
                <Input
                  type="date"
                  max={moment().format('YYYY-MM-DD')}
                  label="Commencement Date"
                  placeholder="Enter Commencement Date..."
                  error={getFieldError('commencementDate') ? 'Commencement Date is required' : null}
                  {...getFieldProps('commencementDate', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
              <Boxed pad="10px 0">
                <Input
                  label="Time of Erection"
                  type="text"
                  placeholder="Enter Time of Erection..."
                  error={getFieldError('timeOfErection') ? 'Time of Erection is required' : null}
                  {...getFieldProps('timeOfErection', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
              <Boxed pad="10px 0">
                <Input
                  label="Value of Improvement"
                  type="number"
                  placeholder="Enter Value of Improvement..."
                  error={
                    getFieldError('valueOfImprovement') ? 'Value of Improvement is required' : null
                  }
                  {...getFieldProps('valueOfImprovement', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
              <Boxed pad="10px 0">
                <Input
                  type="date"
                  max={moment().format('YYYY-MM-DD')}
                  label="Execution Date"
                  placeholder="Enter Execution Date..."
                  error={getFieldError('executionDate') ? 'Execution Date is required' : null}
                  {...getFieldProps('executionDate', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>

              <Boxed pad="10px 0">
                <Input
                  type="date"
                  max={moment().format('YYYY-MM-DD')}
                  label="Expiration Date"
                  placeholder="Enter Expiration Date..."
                  error={getFieldError('dateOfExpiration') ? 'Expiration Date is required' : null}
                  {...getFieldProps('dateOfExpiration', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
              <Boxed pad="10px 0">
                <Input
                  label="Registration Page"
                  type="text"
                  placeholder="Enter Registration Page..."
                  error={getFieldError('regPage') ? 'Registration Page is required' : null}
                  {...getFieldProps('regPage', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
              <Boxed pad="10px 0">
                <Input
                  label="Registration Time"
                  type="text"
                  placeholder="Enter Registration Time..."
                  error={getFieldError('regTime') ? 'Registration Time is required' : null}
                  {...getFieldProps('regTime', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
              <Boxed pad="10px 0">
                <Input
                  type="date"
                  max={moment().format('YYYY-MM-DD')}
                  label="Registration Date"
                  placeholder="Enter registration Date..."
                  error={getFieldError('regDate') ? 'Registration Date is required' : null}
                  {...getFieldProps('regDate', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>

              <Boxed pad="10px 0">
                <Input
                  label="Volume Number"
                  type="text"
                  placeholder="Enter Volume Number..."
                  error={getFieldError('volumeNo') ? 'Volume Number is required' : null}
                  {...getFieldProps('volumeNo', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
            </Grid>
            <Text
              padding="40px 0 0 0"
              fontWeight="600"
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
            >
              Rent Info
            </Text>

            <Grid desktop="repeat(2, 1fr)" tablet="repeat(2, 1fr)" mobile="repeat(1,1fr)">
              <Boxed pad="10px 0">
                <Input
                  label="Rent rate"
                  type="number"
                  placeholder="Enter Rent rate..."
                  error={getFieldError('rentRate') ? 'Rent rate is required' : null}
                  {...getFieldProps('rentRate', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>
              <Boxed pad="10px 0">
                <Input
                  label="Rent Revision"
                  type="text"
                  placeholder="Enter Rent Revision..."
                  error={getFieldError('rentRevision') ? 'Rent Revision is required' : null}
                  {...getFieldProps('rentRevision', {
                    initialValue: '',
                    rules: [{ required: isRequired }]
                  })}
                />
              </Boxed>

            </Grid>

            <Boxed pad="10px 0">
              <Checkbox
                label="Land Owner Exist"
                value={assigned}
                onClick={() => setAssigned(!assigned)}
              />
            </Boxed>

            {assigned ? (
              <>
                <Text> Assigned Owner Details</Text>
                <Grid desktop="repeat(2, 1fr)" tablet="repeat(2, 1fr)" mobile="repeat(1,1fr)">
                  <Boxed margin="10px 0">
                    <AsyncSelect
                      label="Ownership Type"
                      placeholder="Select type..."
                      options={ownerShipOptions}
                      error={
                        (getFieldError('ownershipType'))
                          ? 'Ownership type is required'
                          : null
                      }
                      {...getFieldProps('ownershipType', {
                        rules: [{ required: isRequired }]
                      })}
                    />
                  </Boxed>
                </Grid>
              </>
            ) : null}
          </Boxed>
        </Grid>

        {assigned ? (
          <>
            {isPrivate && (
              <>
                <Grid desktop="repeat(3,1fr)" tablet="repeat(3,1fr)" mobile="repeat(1,1fr)">

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
                    <AsyncSelect
                      label="Gender"
                      placeholder="Select gender..."
                      options={[{ label: 'MALE', value: 'Male' }, { label: 'FEMALE', value: 'Female' },]}
                      {...getFieldProps('gender', {
                        rules: [{ required: isRequired }],
                      })}
                    />
                  </Boxed>
                  <Boxed margin="10px 0" />

                  <Boxed margin="10px 0">
                    <Input
                      label="Surname"
                      type="text"
                      placeholder="Your Surname..."
                      error={(getFieldError('lastname')) ? 'Last Name is required' : null}
                      {...getFieldProps('lastname', {
                        rules: [{ required: true }]
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
                        rules: [{ required: true }]
                      })}
                    />
                  </Boxed>
                  <Boxed margin="10px 0" />

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
                      label="Tax Identification Number"
                      type="text"
                      placeholder="Enter Tax Identification Number..."
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

                  <Boxed pad="15px 0">
                    <Input
                      label="Registration Date"
                      type="date"
                      placeholder="Your Registration Date..."
                      max={moment().format("YYYY-MM-DD")}
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
              </>
            )}

            <Grid
              desktop="repeat(3,1fr)"
              tablet="repeat(3,1fr)"
              mobile="repeat(1,1fr)"
            >
              <Boxed margin="10px 0">
                <Input
                  label="Contact Name"
                  type="text"
                  placeholder="Your Contact name..."
                  error={
                    (getFieldError("contactName")) ? "Contact name  is required" : null
                  }
                  {...getFieldProps("contactName", {
                    rules: [{ required: isRequired }],
                  })}
                />
              </Boxed>
              <Boxed margin="10px 0">
                <Input
                  label="Contact Phone"
                  type="number"
                  placeholder="Your Contact phone..."
                  error={
                    (getFieldError("contactPhone"))
                      ? "Contact phone is required"
                      : null
                  }
                  {...getFieldProps("contactPhone", {
                    rules: [{ required: isRequired }],
                  })}
                />
              </Boxed>
              <Boxed margin="10px 0" />
            </Grid>
            <Boxed margin="10px 0">
              <Input
                label="Contact Address"
                type="text"
                placeholder="Your Contact address..."
                error={
                  (getFieldError("contactAddress")) ? "Contact address  is required" : null
                }
                {...getFieldProps("contactAddress", {
                  rules: [{ required: isRequired }],
                })}
              />
            </Boxed>
          </>
        ) : null}

        <Boxed pad="25px 0 0 0" display="flex">
          <Button disabled={isLoading} progress={isLoading} onClick={onSubmit} margin=" 0 0 0 auto">
            Create Land
          </Button>
        </Boxed>
      </Boxed>
    </Boxed>
  );
};
