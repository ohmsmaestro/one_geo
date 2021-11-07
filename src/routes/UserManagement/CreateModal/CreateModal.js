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
  const { createUserModal, isLoading } = props;

  // Dispatch props
  const { form, createUser, closeModal, getAllRoles } = props;
  const { getFieldProps, getFieldError, validateFields } = form;

  let viewMode = calcViewMode();

  useEffect(() => {
    getAllRoles({ page: 1, size: 50 });
  }, []);

  const onSubmit = () => {
    validateFields((error, value) => {
      if (!error) {
        const data = {
          name: value.name.trim(),
        };
        createUser(data);
      }
    });
  };
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
              options={[
                {
                  label: "Admin",
                  value: 2,
                },
                {
                  label: "Super Admin",
                  value: 3,
                },
              ]}
              error={
                (errors = getFieldError("role")) ? "Role is required" : null
              }
              {...getFieldProps("role", {
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
