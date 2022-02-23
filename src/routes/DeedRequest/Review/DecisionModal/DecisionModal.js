import React, { useEffect } from "react";

import { Boxed } from "../../../../components/Boxed.components";
import { Button } from "../../../../components/Button.components";
import { ModalComponent } from "../../../../components/Modal.components";
import { Input } from "../../../../components/Input.components";
import { Alert } from "../../../../components/Alert.components";
import { PageTitle } from "../../../../components/style";

import { calcViewMode } from "../../../../utils/utils";
import { Theme } from "../../../../utils/theme";

export const DecisionModal = (props) => {
  // State props
  const { deedDecisionModal, isLoading, deedData } = props;

  // Dispatch props
  const { closeModal, form, approveReview } = props;
  const { getFieldProps, getFieldError, validateFields } = form;

  let viewMode = calcViewMode();

  const onSubmit = (status) => {
    validateFields((error, value) => {
      if (!error) {
        const data = {
          status: status,
          id: deedData?.id,
          comment: value.comment,
        };

        approveReview(data);
      }
    });
  };
  let errors;

  return (
    <>
      <ModalComponent
        show={deedDecisionModal}
        onHide={closeModal}
        title={
          <PageTitle margin="5px 0">
            {deedDecisionModal === "DECLINED" ? "Decline" : "Approve"} Modal
          </PageTitle>
        }
        footer={
          <>
            <Button clear onClick={closeModal}>
              Close
            </Button>
            <Button
              progress={isLoading}
              disabled={isLoading}
              color={
                deedDecisionModal === "DECLINED"
                  ? Theme.PrimaryRed
                  : Theme.PrimaryGreen
              }
              onClick={() => onSubmit(deedDecisionModal)}
            >
              {deedDecisionModal === "DECLINED" ? "Decline" : "Approve"}
            </Button>
          </>
        }
      >
        <Boxed pad="10px">
          <Input
            label="Comment"
            type="text"
            placeholder="Enter comment..."
            error={
              (errors = getFieldError("comment")) ? "Comment is required" : null
            }
            {...getFieldProps("comment", {
              initialValue: "",
              rules: [{ required: true }],
            })}
          />
        </Boxed>
      </ModalComponent>
    </>
  );
};
