import React from "react";

import { Boxed } from "../../../../components/Boxed.components";
import { Text } from "../../../../components/Text.components";
import { Button } from "../../../../components/Button.components";
import { ModalComponent } from "../../../../components/Modal.components";
import { PDFReader } from "../../../../components/Reader.component";

import { PageTitle } from "../../../../components/style";

export const FileViewer = (props) => {
  // State props
  const { openFileViewer, file } = props;

  // Dispatch props
  const { closeModal } = props;

  return (
    <>
      <ModalComponent
        size="xl"
        show={openFileViewer}
        onHide={closeModal}
        title={<PageTitle>{file.name}</PageTitle>}
        footer={
          <>
            <Button clear onClick={closeModal}>
              Close
            </Button>
          </>
        }
      >
        <Boxed pad="20px">
          {file.file && file.fileFormat === "pdf" && (
            <Boxed pad="10px 0">
              {
                <Boxed>
                  <PDFReader document={{ base64: file.file }} />
                </Boxed>
              }
            </Boxed>
          )}
        </Boxed>
      </ModalComponent>
    </>
  );
};
