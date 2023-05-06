import React, { useEffect } from "react";

import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { Loader } from "../../../components/Loader.components";
import { ModalComponent } from "../../../components/Modal.components";
import { PDFReader } from "../../../components/Reader.component";

import { calcViewMode, formatDate } from "../../../utils/utils";
import { Theme } from "../../../utils/theme";
import { PageTitle } from "../../../components/style";

export const DetailModal = (props) => {
  // State props
  const { encumbranceDetailModal, isLoading, entryData, isloadingFile } = props;

  // Dispatch props
  const { getEncumbranceFile, closeModal } = props;

  useEffect(() => {
    getEncumbranceFile(entryData);
  }, []);

  let viewMode = calcViewMode();

  return (
    <>
      <ModalComponent
        size="xl"
        show={encumbranceDetailModal}
        onHide={closeModal}
        title={<PageTitle margin="5px 0">Encumbrance Detail</PageTitle>}
        footer={
          <>
            <Button clear onClick={closeModal}>
              Close
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
          <Text fontSize={Theme.SecondaryFontSize}>
            Plot Number : <b>{entryData.parcelNumber}</b>
          </Text>
          <Text fontSize={Theme.SecondaryFontSize}>
            Description : <b>{entryData.description}</b>
          </Text>
          <Text fontSize={Theme.SecondaryFontSize}>
            Entered By : <b>{entryData.createdBy}</b>
          </Text>
          <Text fontSize={Theme.SecondaryFontSize}>
            Entry Date :{" "}
            <b>{entryData.createdAt && formatDate(entryData.createdAt)}</b>
          </Text>
        </Boxed>
        {isloadingFile ? (
          <Boxed pad="20px" display="flex">
            <Loader margin="auto" />
          </Boxed>
        ) : (
          <>
            {entryData.file && entryData.fileFormat === "pdf" && (
              <Boxed pad="10px 0">
                <Text fontWeight="bold">Instrument</Text>
                {
                  <Boxed>
                    <PDFReader document={{ base64: entryData.file }} />
                  </Boxed>
                }
              </Boxed>
            )}
          </>
        )}
      </ModalComponent>
    </>
  );
};
