import React from "react";

import { Input, RadioButton } from "../../../components/Input.components";
import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";

import { calcViewMode } from "../../../utils/utils";

import { Theme } from "../../../utils/theme";

export const Step1 = (props) => {
  // state props received
  const { regForm } = props;

  // dispatch props received
  const { form, nextStep, redirect } = props;
  const {
    getFieldProps,
    getFieldError,
    validateFields,
    setFieldsValue,
    getFieldValue,
  } = form;
  let viewMode = calcViewMode();

  const onSubmit = () => {
    validateFields((error, value) => {
      if (!error) {
        const data = {
          first_name: value.first_name.trim(),
          middle_name: value.middle_name ? value.middle_name.trim() : "",
          last_name: value.last_name.trim(),
          phone_number: value.phone_number.trim(),
          email: value.email.trim(),
          password: value.password,
          gender: value.gender,
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

  let errors;

  return (
    <>
      <Grid
        default="repeat(3,1fr)"
        tablet="repeat(3,1fr)"
        mobile="repeat(1,1fr)"
      >
        <Boxed margin="10px 0">
          <Input
            label="First Name"
            type="text"
            placeholder="Your first name..."
            error={
              (errors = getFieldError("first_name"))
                ? "First Name is required"
                : null
            }
            {...getFieldProps("first_name", {
              initialValue: regForm.first_name ? regForm.first_name : "",
              rules: [{ required: true }],
            })}
          />
        </Boxed>
        <Boxed margin="10px 0">
          <Input
            label="Middle Name"
            type="text"
            placeholder="Your middle name..."
            error={
              (errors = getFieldError("middle_name"))
                ? "Middle Name is required"
                : null
            }
            {...getFieldProps("middle_name", {
              initialValue: regForm.middle_name ? regForm.middle_name : "",
              rules: [{ required: true }],
            })}
          />
        </Boxed>
        <Boxed margin="10px 0">
          <Input
            label="Last Name"
            type="text"
            placeholder="Your last name..."
            error={
              (errors = getFieldError("last_name"))
                ? "Last Name is required"
                : null
            }
            {...getFieldProps("last_name", {
              initialValue: regForm.last_name ? regForm.last_name : "",
              rules: [{ required: true }],
            })}
          />
        </Boxed>
      </Grid>
      <Grid
        desktop="repeat(2, 1fr)"
        tablet="repeat(2, 1fr)"
        mobile="repeat(1, 1fr)"
      >
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
            label=" Phone Number"
            type="number"
            placeholder="Your phone number..."
            error={
              (errors = getFieldError("phone_number"))
                ? "Phone number is required"
                : null
            }
            {...getFieldProps("phone_number", {
              initialValue: regForm.phone_number ? regForm.phone_number : "",
              rules: [{ required: true }],
            })}
          />
        </Boxed>

        <Boxed margin="10px 0">
          <Input
            type="password"
            placeholder="New Password..."
            onKeyPress={onEnter}
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
        <Boxed pad="20px 0" display="flex">
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
