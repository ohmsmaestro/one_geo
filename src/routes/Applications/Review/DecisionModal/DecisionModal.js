import React, { useEffect, useState } from 'react';

import { Boxed } from '../../../../components/Boxed.components';
import { Button } from '../../../../components/Button.components';
import { ModalComponent } from '../../../../components/Modal.components';
import { Input } from '../../../../components/Input.components';
import { Text } from '../../../../components/Text.components';
import { Uploader } from '../../../../components/Uploader.components';
import { Alert } from '../../../../components/Alert.components';
import { PageTitle, FileIcon } from '../../../../components/style';

import { calcViewMode } from '../../../../utils/utils';
import { Theme } from '../../../../utils/theme';

export const DecisionModal = (props) => {
  // State props
  const { decisionModal, isLoading, applicationDetail } = props;

  // Dispatch props
  const { closeModal, form, approveApplicationReview } = props;
  const { getFieldProps, getFieldError, validateFields } = form;

  const [file, setFile] = useState({});

  let viewMode = calcViewMode();

  const onSubmit = (status) => {
    validateFields((error, value) => {
      if (!error) {
        // if(applicationDetail?.stageId === 4 ){}
        const data = {
          status: status,
          applicationId: applicationDetail.id,
          stageId: applicationDetail.stageId,
          comment: value.comment
        };

        if (applicationDetail?.stageId === 4) {
          if (file.base64) {
            data['file'] = file.base64;
            data['fileFormat'] = 'pdf';
            return approveApplicationReview(data);
          } else {
            return Alert.info("Acceptance letter is required")
          }
        } else {
          approveApplicationReview(data);
        }
      }
    });
  };

  return (
    <>
      <ModalComponent
        show={decisionModal}
        onHide={closeModal}
        title={
          <PageTitle margin="5px 0">
            {decisionModal === 'REJECTED'
              ? 'Decline Action'
              : `${applicationDetail?.stageId === 4 ? `Accept Allocation` : `Approve Action`}`}
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
              color={decisionModal === 'REJECTED' ? Theme.PrimaryRed : Theme.PrimaryGreen}
              onClick={() => onSubmit(decisionModal)}
            >
              {decisionModal === 'REJECTED'
                ? 'Decline'
                : `${applicationDetail?.stageId === 4 ? `Accept` : `Approve`}`}
            </Button>
          </>
        }
      >
        <Boxed pad="10px">
          <Input
            label="Comment"
            type="text"
            placeholder="Enter comment..."
            error={getFieldError('comment') ? 'Comment is required' : null}
            {...getFieldProps('comment', {
              initialValue: '',
              rules: [{ required: true }]
            })}
          />
        </Boxed>
        {applicationDetail.stageId === 4 && (
          <Boxed pad="10px">
            <Text fontSize={Theme.SecondaryFontSize} fontWeight="600">
              Attach Acceptance Letter
            </Text>
            {file?.base64 ? (
              <Boxed display="flex" pad="10px">
                <FileIcon type="pdf" size="30px" />
                <Text>{file.name}</Text>
                <Button clear pale xs onClick={() => setFile({})}>
                  remove
                </Button>
              </Boxed>
            ) : (
              <Uploader
                types={['application/pdf']}
                callBack={(file) => setFile(file)}
                message="Click or Drag Acceptance letter here"
              />
            )}
          </Boxed>
        )}
      </ModalComponent>
    </>
  );
};
