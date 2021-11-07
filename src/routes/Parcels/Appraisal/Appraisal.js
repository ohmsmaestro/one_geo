import React, { useState } from "react";

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

export const Appraisal = (props) => {
  // State props
  const { appraisalModal, isLoading } = props;

  // Dispatch props
  const { form, createAppraisal, closeModal } = props;
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
        createAppraisal(data);
      }
    });
  };
  let errors;

  return (
    <>
      <ModalComponent
        show={appraisalModal}
        onHide={closeModal}
        title={<PageTitle margin="5px 0">Parcel Appraisal</PageTitle>}
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
              Appraise Parcel
            </Button>
          </>
        }
      >
        <Boxed pad="10px 0">
          <Input
            type="text"
            label="Appraisal Value"
            placeholder="Enter appraisal value..."
            error={
              (errors = getFieldError("appraisal_value"))
                ? "appraisal value is required"
                : null
            }
            {...getFieldProps("appraisal_value", {
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
            <AsyncSelect
              label="Appraisal Instrument"
              placeholder="Select Instrument..."
              options={[
                {
                  label: "PA18923 - Payment for survey",
                  value: "TRANS-4532234445",
                },
                {
                  label: "PA18923 - Payment for survey",
                  value: "TRANS-4532234445",
                },
                {
                  label: "PA18923 - Payment for survey",
                  value: "TRANS-4532234445",
                },
                {
                  label: "PA18923 - Payment for survey",
                  value: "TRANS-4532234445",
                },
              ]}
              error={
                (errors = getFieldError("appraisal_instrument"))
                  ? "appraisal instrument is required"
                  : null
              }
              {...getFieldProps("appraisal_instrument", {
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
