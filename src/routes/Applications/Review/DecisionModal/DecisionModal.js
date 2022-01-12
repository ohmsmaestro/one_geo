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
  const { decisionModal, isLoading, applicationDetail } = props;

  // Dispatch props
  const { closeModal, form } = props;
  const { getFieldProps, getFieldError, validateFields } = form;

  let viewMode = calcViewMode();

  const onSubmit = (status) => {
    validateFields((error, value) => {
      if (!error) {
        const data = {
          status: status,
          applicationId: applicationDetail.id,
          comment: value.comment,
        };
        console.log(data);
      }
    });
  };
  let errors;

  return (
    <>
      <ModalComponent
        show={decisionModal}
        onHide={closeModal}
        title={
          <PageTitle margin="5px 0">
            {decisionModal === "DECLINED" ? "Decline" : "Approve"} Modal
          </PageTitle>
        }
        footer={
          <>
            <Button clear onClick={closeModal}>
              Close
            </Button>
            <Button
              color={
                decisionModal === "DECLINED"
                  ? Theme.PrimaryRed
                  : Theme.PrimaryGreen
              }
              onClick={() => onSubmit(decisionModal)}
            >
              {decisionModal === "DECLINED" ? "Decline" : "Approve"} Application
            </Button>
          </>
        }
      >
        <Boxed
          pad="10px"
          border={`1px solid ${Theme.PrimaryBlue}`}
          background={`${Theme.PrimaryBlue}30`}
          borderRadius={Theme.SecondaryRadius}
        >
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
