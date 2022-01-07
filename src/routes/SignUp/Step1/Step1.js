import React, { useEffect, useState } from "react";

import {
  Input,
  RadioButton,
  AsyncSelect,
} from "../../../components/Input.components";
import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";

import { calcViewMode } from "../../../utils/utils";

import { Theme } from "../../../utils/theme";

export const Step1 = (props) => {
  // state props received
  const { regForm, modiStateList } = props;

  // dispatch props received
  const { form, nextStep, redirect, fetchStates } = props;
  const {
    getFieldProps,
    getFieldError,
    validateFields,
    setFieldsValue,
    getFieldValue,
  } = form;
  let viewMode = calcViewMode();

  const [lgaOriginList, setLgaOriginList] = useState([]);
  const [lgaResidenceList, setLgaResidenceList] = useState([]);

  const onSubmit = () => {
    validateFields((error, value) => {
      if (!error) {
        console.log({ value });
        const data = {
          firstname: value.firstname.trim(),
          middlename: value.middlename ? value.middlename.trim() : "",
          lastname: value.lastname.trim(),
          phone: value.phone.trim(),
          email: value.email.trim(),
          password: value.password,
          gender: value.gender,
          dob: value.dob,
          stateOfOrigin: value.stateOfOrigin,
          lgaOfOrigin: value.lgaOfOrigin,
          stateOfResidence: value.stateOfResidence,
          lgaOfResidence: value.lgaOfResidence,
          residentialAddress: value.residentialAddress,
          nin: value.nin,
        };
        nextStep(data);
      }
    });
  };

  const onEnter = (e) => {
    e.stopPropagation();
    e.key === "Enter" && onSubmit();
  };

  const checkConfirmPassword = (value1, rule, value, callback, source) => {
    if (value !== value1) {
      callback("Passwords must match");
    } else {
      callback();
    }
  };

  const checkPassword = (value1, rule, value, callback, source) => {
    if (value) {
      let length = value.length;
      let checkLength = length > 7;

      if (checkLength) {
        let numberTest = /\d/.test(value);
        let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        let specialCharaterTest = value.match(format);
        if (numberTest || specialCharaterTest) {
          callback();
        } else {
          callback("Password must contain either a digit or special charater.");
        }
      } else {
        callback("Password must be atleast 8 characters");
      }
    } else {
      callback();
    }
  };

  useEffect(() => {
    fetchStates({});
  }, []);

  let errors;

  const handleStateOriginSelect = (item) => {
    setFieldsValue({ lgaOfOrigin: {} });
    let list = item.lgas.map((element) => ({
      label: element.name,
      ...element,
    }));
    setLgaOriginList(list ? list : []);
  };

  const handleStateResidenceSelect = (item) => {
    console.log({ item });
    setFieldsValue({ lgaOfResidence: {} });
    let list = item.lgas.map((element) => ({
      label: element.name,
      ...element,
    }));
    setLgaResidenceList(list ? list : []);
  };

  return (
    <>
      <Text fontSize={Theme.SecondaryFontSize} fontWeight="600">
        Gender
      </Text>
      <Boxed pad="10px 0" display="flex">
        <RadioButton
          name="gender"
          value="M"
          label="Male"
          onClick={() => setFieldsValue({ gender: "M" })}
          {...getFieldProps("gender", {
            initialValue: regForm.gender ? regForm.gender : "",
            rules: [{ required: true }],
          })}
          style={{ margin: "0 20px 0 0" }}
        />
        <RadioButton
          name="gender"
          value="F"
          label="Female"
          onClick={() => setFieldsValue({ gender: "F" })}
          {...getFieldProps("gender", {
            initialValue: regForm.gender ? regForm.gender : "",
            rules: [{ required: true }],
          })}
        />
      </Boxed>
      <Grid
        default="repeat(3,1fr)"
        tablet="repeat(3,1fr)"
        mobile="repeat(1,1fr)"
      >
        <Boxed>
          <Input
            label="National Identification Number"
            type="text"
            placeholder="Enter National Identification Number..."
            {...getFieldProps("nin", {
              rules: [],
              initialValue: regForm.nin ? regForm.nin : "",
            })}
          />
        </Boxed>
        <div />
        <div />
        <Boxed margin="10px 0">
          <Input
            label="First Name"
            type="text"
            placeholder="Your first name..."
            error={
              (errors = getFieldError("firstname"))
                ? "First Name is required"
                : null
            }
            {...getFieldProps("firstname", {
              initialValue: regForm.firstname ? regForm.firstname : "",
              rules: [{ required: true }],
            })}
          />
        </Boxed>
        <Boxed margin="10px 0">
          <Input
            label="Middle Name"
            type="text"
            placeholder="Your middle name..."
            {...getFieldProps("middlename", {
              initialValue: regForm.middlename ? regForm.middlename : "",
              rules: [],
            })}
          />
        </Boxed>
        <Boxed margin="10px 0">
          <Input
            label="Last Name"
            type="text"
            placeholder="Your last name..."
            error={
              (errors = getFieldError("lastname"))
                ? "Last Name is required"
                : null
            }
            {...getFieldProps("lastname", {
              initialValue: regForm.lastname ? regForm.lastname : "",
              rules: [{ required: true }],
            })}
          />
        </Boxed>

        <Boxed margin="10px 0">
          <Input
            label="Email "
            type="email"
            placeholder="Your Email..."
            error={
              (errors = getFieldError("email")) ? "Email  is required" : null
            }
            {...getFieldProps("email", {
              initialValue: regForm.email ? regForm.email : "",
              rules: [{ required: true, type: "email" }],
            })}
          />
        </Boxed>
        <Boxed margin="10px 0">
          <Input
            label="Phone Number"
            type="number"
            placeholder="Your phone number..."
            error={
              (errors = getFieldError("phone"))
                ? "Phone number is required"
                : null
            }
            {...getFieldProps("phone", {
              initialValue: regForm.phone ? regForm.phone : "",
              rules: [{ required: true }],
            })}
          />
        </Boxed>
        <Boxed margin="10px 0">
          <Input
            label="Date of Birth"
            type="date"
            placeholder="Your Date of birth..."
            error={
              (errors = getFieldError("dob"))
                ? "Date of birth is required"
                : null
            }
            {...getFieldProps("dob", {
              initialValue: regForm.dob ? regForm.dob : "",
              rules: [{ required: true }],
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
              (errors = getFieldError("stateOfOrigin"))
                ? "State of origin is required"
                : null
            }
            {...getFieldProps("stateOfOrigin", {
              initialValue: regForm.stateOfOrigin ? regForm.stateOfOrigin : "",
              rules: [{ required: true }],
              onChange: (value) => handleStateOriginSelect(value),
            })}
          />
        </Boxed>
        <Boxed margin="10px 0">
          <AsyncSelect
            label="Local Gov. Area of Origin"
            placeholder="Select your LGA of Origin..."
            options={lgaOriginList ? lgaOriginList : []}
            error={
              (errors = getFieldError("lgaOfOrigin")) ? "LGA is required" : null
            }
            {...getFieldProps("lgaOfOrigin", {
              initialValue: regForm.lgaOfOrigin ? regForm.lgaOfOrigin : "",
              rules: [{ required: true }],
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
              (errors = getFieldError("stateOfResidence"))
                ? "State of Residence is required"
                : null
            }
            {...getFieldProps("stateOfResidence", {
              initialValue: regForm.stateOfResidence
                ? regForm.stateOfResidence
                : "",
              rules: [{ required: true }],
              onChange: (value) => handleStateResidenceSelect(value),
            })}
          />
        </Boxed>
        <Boxed margin="10px 0">
          <AsyncSelect
            label="Local Gov. Area of Residence"
            placeholder="Select your LGA of Residence..."
            options={lgaResidenceList ? lgaResidenceList : []}
            error={
              (errors = getFieldError("lgaOfResidence"))
                ? "LGA is required"
                : null
            }
            {...getFieldProps("lgaOfResidence", {
              initialValue: regForm.lgaOfResidence
                ? regForm.lgaOfResidence
                : "",
              rules: [{ required: true }],
            })}
          />
        </Boxed>
      </Grid>
      <Boxed>
        <Input
          label="Residential Address"
          type="text"
          placeholder="Enter residential address..."
          error={
            getFieldError("residentialAddress")
              ? getFieldError("residentialAddress")
              : null
          }
          {...getFieldProps("residentialAddress", {
            rules: [{ required: true }],
            initialValue: regForm.residentialAddress
              ? regForm.residentialAddress
              : "",
          })}
        />
      </Boxed>
      <Grid
        desktop="repeat(3, 1fr)"
        tablet="repeat(2, 1fr)"
        mobile="repeat(1, 1fr)"
      >
        <Boxed margin="10px 0">
          <Input
            label="Password"
            type="password"
            placeholder="New Password..."
            error={getFieldError("password") ? getFieldError("password") : null}
            {...getFieldProps("password", {
              rules: [
                { required: true },
                {
                  validator: checkPassword.bind(
                    this,
                    getFieldValue("password")
                  ),
                },
              ],
              initialValue: regForm.password ? regForm.password : "",
            })}
          />
        </Boxed>

        <Boxed margin="10px 0">
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password..."
            onKeyPress={onEnter}
            error={
              getFieldError("confirmPassword")
                ? "Confirm password must match password"
                : null
            }
            {...getFieldProps("confirmPassword", {
              rules: [
                { required: true },
                {
                  validator: checkConfirmPassword.bind(
                    this,
                    getFieldValue("password")
                  ),
                },
              ],
              initialValue: regForm.password ? regForm.password : "",
            })}
          />
        </Boxed>
      </Grid>
      <Grid
        desktop="repeat(2, 1fr)"
        tablet="repeat(2, 1fr)"
        mobile="repeat(2, 1fr)"
        pad="20px 0 0 0"
      >
        <Boxed pad="5px 0 0 0">
          <Button onClick={onSubmit}>Next</Button>
        </Boxed>
      </Grid>
    </>
  );
};
