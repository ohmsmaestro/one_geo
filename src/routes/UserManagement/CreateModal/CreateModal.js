import React, { useState, useEffect } from "react";

import {
  AsyncSelect,
  Input,
  InputDate,
  SimpleSelect,
} from "../../../components/Input.components";
import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { ModalComponent } from "../../../components/Modal.components";

import { calcViewMode } from "../../../utils/utils";
import { PageTitle } from "../../../components/style";

export const CreateModal = (props) => {
  // State props
  const { createUserModal, rolesList, isLoading } = props;

  // Dispatch props
  const { form, createUser, closeModal, getAllRoles } = props;
  const { getFieldProps, getFieldError, validateFields, getFieldValue } = form;

  let viewMode = calcViewMode();

  useEffect(() => {
    getAllRoles({ page: 1, size: 50 });
  }, []);

  const onSubmit = () => {
    validateFields((error, value) => {
      if (!error) {
        const data = {
          firstname: value.firstname.trim(),
          middlename: value.middlename.trim(),
          lastname: value.lastname.trim(),
          email: value.email.trim(),
          phone: value.phone.trim(),
          role_id: value.role.id,
          password: value.password,
          enabled: true,
        };
        console.log({ data });
        createUser(data);
      }
    });
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

  const modiRoleList =
    rolesList && rolesList.map((item) => ({ ...item, label: item.name }));

  let errors;

  return (
    <>
      <ModalComponent
        show={createUserModal}
        onHide={closeModal}
        title={<PageTitle margin="5px 0">Add a new User</PageTitle>}
        footer={
          <>
            <Button pale onClick={closeModal}>
              Cancel
            </Button>
            <Button
              progress={isLoading}
              disabled={isLoading}
              onClick={onSubmit}
            >
              Add User
            </Button>
          </>
        }
      >
        <Grid
          desktop="repeat(2, 1fr)"
          tablet="repeat(2, 1fr)"
          mobile="repeat(1,1fr)"
          pad="0 0 30px 0"
        >
          <Boxed pad="10px 0">
            <Input
              type="text"
              label="First Name"
              placeholder="Enter first name..."
              error={
                (errors = getFieldError("firstname"))
                  ? "First name is required"
                  : null
              }
              {...getFieldProps("firstname", {
                initialValue: "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed pad="10px 0">
            <Input
              type="text"
              label="Last Name"
              placeholder="Enter last name..."
              error={
                (errors = getFieldError("lastname"))
                  ? "Last name is required"
                  : null
              }
              {...getFieldProps("lastname", {
                initialValue: "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed pad="10px 0">
            <Input
              type="text"
              label="Middle Name"
              placeholder="Enter middle name..."
              error={
                (errors = getFieldError("middlename"))
                  ? "Middle name is required"
                  : null
              }
              {...getFieldProps("middlename", {
                initialValue: "",
                rules: [{}],
              })}
            />
          </Boxed>
          <Boxed pad="10px 0">
            <Input
              type="text"
              label="Email"
              placeholder="Enter email..."
              error={
                (errors = getFieldError("email")) ? "Email is required" : null
              }
              {...getFieldProps("email", {
                initialValue: "",
                rules: [{ required: true, email: true }],
              })}
            />
          </Boxed>
          <Boxed pad="10px 0">
            <Input
              type="text"
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
          <Boxed pad="10px 0">
            <AsyncSelect
              label="Role"
              placeholder="Select Role..."
              options={[...modiRoleList]}
              error={
                (errors = getFieldError("role")) ? "Role is required" : null
              }
              {...getFieldProps("role", {
                initialValue: "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>

          <Boxed pad="10px 0">
            <Input
              type="password"
              placeholder="New Password..."
              error={
                getFieldError("password") ? getFieldError("password") : null
              }
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
                initialValue: "",
              })}
            />
          </Boxed>
          <Boxed pad="10px 0">
            <Input
              type="password"
              placeholder="Confirm Password..."
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
                initialValue: "",
              })}
            />
          </Boxed>
        </Grid>
      </ModalComponent>
    </>
  );
};
