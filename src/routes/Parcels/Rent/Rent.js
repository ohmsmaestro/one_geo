import React, { useState } from "react";

import { Input, InputDate } from "../../../components/Input.components";
import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { ModalComponent } from "../../../components/Modal.components";

import { calcViewMode } from "../../../utils/utils";
import { PageTitle } from "../../../components/style";

export const Rent = (props) => {
  // State props
  const { rentModal, isLoading } = props;

  // Dispatch props
  const { form, createRent, closeModal } = props;
  const { getFieldProps, getFieldError, validateFields } = form;

  const [rentStart, setRentStart] = useState(new Date());
  const [rentEnd, setRentEnd] = useState(new Date());

  let viewMode = calcViewMode();

  const onSubmit = () => {
    validateFields((error, value) => {
      if (!error) {
        const data = {
          name: value.name.trim(),
        };
        createRent(data);
      }
    });
  };
  let errors;

  return (
    <>
      <ModalComponent
        show={rentModal}
        onHide={closeModal}
        title={<PageTitle margin="5px 0">Parcel Rent</PageTitle>}
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
              Rent Parcel
            </Button>
          </>
        }
      >
        <Boxed pad="0 0 20px 0">
          <Input
            type="text"
            label="Renting To"
            placeholder="Enter name of tenant..."
            error={(errors = getFieldError("name")) ? "Name is required" : null}
            {...getFieldProps("name", {
              initialValue: "",
              rules: [{ required: true }],
            })}
          />
        </Boxed>
        <Grid
          desktop="repeat(2, 1fr)"
          tablet="repeat(2, 1fr)"
          mobile="repeat(1,1fr)"
        >
          <Boxed pad="10px 0">
            <InputDate
              label="Rent Start"
              placeholder="Select rent start..."
              selected={rentStart}
              onChange={(date) => setRentStart(date)}
              error={
                (errors = getFieldError("rent_start"))
                  ? "Rent start is required"
                  : null
              }
              {...getFieldProps("rent_start", {
                initialValue: "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed pad="10px 0">
            <InputDate
              label="Rent End"
              placeholder="Select rent end..."
              selected={rentEnd}
              onChange={(date) => setRentEnd(date)}
              error={
                (errors = getFieldError("rent_end"))
                  ? "Rent end is required"
                  : null
              }
              {...getFieldProps("rent_end", {
                initialValue: "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>
          <Boxed pad="10px 0">
            <Input
              type="text"
              label="Rent Value"
              placeholder="Enter rent value..."
              error={
                (errors = getFieldError("rent_value"))
                  ? "Rent value is required"
                  : null
              }
              {...getFieldProps("rent_value", {
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
