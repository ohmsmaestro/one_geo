import React from "react";

import { ModalComponent } from "../../../components/Modal.components";
import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Input } from "../../../components/Input.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { PageTitle } from "../../../components/style";

import { calcViewMode, formatCurrency, formatDate } from "../../../utils/utils";
import { Theme } from "../../../utils/theme";

export const Review = (props) => {
  // state props
  const { appraisalReview, appraisalDetail, isLoading } = props;

  // dispatch props
  const { redirect, closeModal, approveApprasial, form } = props;
  const { getFieldProps, getFieldError, validateFields } = form;

  let viewMode = calcViewMode();

  const onSubmit = (status) => {
    validateFields((error, values) => {
      if (!error) {
        let data = {
          FID: appraisalDetail.FID, // Confirm from Mohammed
          status: status,
          comment: values.comment,
          parcels: [
            { id: appraisalDetail.id, fileNumber: appraisalDetail.fileNumber },
          ],
        };
        approveApprasial(data);
      }
    });
  };

  let errors;
  return (
    <>
      <ModalComponent
        show={appraisalReview}
        size={"xl"}
        onHide={closeModal}
        title={<PageTitle margin="5px 0">Apprasial Review</PageTitle>}
        footer={
          <Boxed display="flex" width="100%">
            <Button clear onClick={closeModal}>
              Cancel
            </Button>
            {appraisalDetail.status === "UNATTENDED" && (
              <>
                <Button
                  margin="0 0 0 auto"
                  color={Theme.PrimaryRed}
                  onClick={() => onSubmit("REJECTED")}
                >
                  Decline
                </Button>
                <Button
                  progress={isLoading}
                  disabled={isLoading}
                  onClick={() => onSubmit("APPROVED")}
                >
                  Approve
                </Button>
              </>
            )}
          </Boxed>
        }
      >
        <Grid
          default="repeat(3, 1fr)"
          tablet="repeat(2, 1fr)"
          mobile="repeat(2, 1fr)"
        >
          <Boxed pad="10px 0">
            <Text
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
              fontWeight="600"
            >
              Plot number
            </Text>
            <Text>{appraisalDetail.parcelNumber}</Text>
          </Boxed>
          <Boxed />
          <Boxed pad="10px 0">
            <Text
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
              fontWeight="600"
            >
              status
            </Text>
            <Text>{appraisalDetail.status}</Text>
          </Boxed>

          <Boxed pad="10px 0">
            <Text
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
              fontWeight="600"
            >
              Appraisal Type
            </Text>
            <Text>{appraisalDetail.appraisalType}</Text>
          </Boxed>
          <Boxed pad="10px 0">
            <Text
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
              fontWeight="600"
            >
              Sub. Category
            </Text>
            <Text>{appraisalDetail.subAppraisalType}</Text>
          </Boxed>
          <Boxed pad="10px 0">
            <Text
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
              fontWeight="600"
            >
              Appraisal Value
            </Text>
            <Text>
              {appraisalDetail.value &&
                `₦ ${formatCurrency(appraisalDetail.value)}`}
            </Text>
          </Boxed>

          <Boxed pad="10px 0">
            <Text
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
              fontWeight="600"
            >
              Created By
            </Text>
            <Text>{appraisalDetail.createdBy}</Text>
          </Boxed>
          <Boxed pad="10px 0">
            <Text
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
              fontWeight="600"
            >
              Date
            </Text>
            <Text>
              {appraisalDetail.createdAt &&
                formatDate(appraisalDetail.createdAt)}
            </Text>
          </Boxed>
        </Grid>

        {appraisalDetail.status === "UNATTENDED" ? (
          <Boxed pad="15px 0">
            <Input
              type="text"
              label="Comment"
              placeholder="Enter comment..."
              error={
                (errors = getFieldError("comment"))
                  ? "Comment is required"
                  : null
              }
              {...getFieldProps("comment", {
                initialValue: "",
                rules: [{ required: true }],
              })}
            />
          </Boxed>
        ) : (
          <Boxed>
            <Text
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
              fontWeight="600"
            >
              Status
            </Text>
            <Text>{appraisalDetail.status}</Text>
          </Boxed>
        )}
      </ModalComponent>
    </>
  );
};
