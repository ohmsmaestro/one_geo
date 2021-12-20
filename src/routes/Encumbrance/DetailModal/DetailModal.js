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
  const { getEncumbranceDetail, closeModal } = props;

  useEffect(() => {
    getEncumbranceDetail(entryData);
  }, []);

  let viewMode = calcViewMode();

  console.log({ entryData });

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
            Entry Type : <b>{entryData.entity}</b>
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

        {isLoading ? (
          <Boxed pad="20px" display="flex">
            <Loader margin="auto" />
          </Boxed>
        ) : (
          <>
            {entryData.fields &&
              entryData.fields.map((item) => {
                return (
                  <Boxed margin="10px 0">
                    <Boxed
                      pad="5px 8px"
                      background={`${Theme.SecondaryDark}60`}
                      borderRadius={`${Theme.SecondaryRadius} ${Theme.SecondaryRadius} 0 0`}
                    >
                      <Text>
                        <b>{item.fieldName}</b>
                      </Text>
                    </Boxed>
                    <Boxed pad="5px 8px" background={`${Theme.PrimaryGreen}20`}>
                      <Text color={Theme.PrimaryGreen}>
                        New: <b>{item.newValue}</b>
                      </Text>
                    </Boxed>
                    <Boxed
                      pad="5px 8px"
                      background={`${Theme.PrimaryRed}30`}
                      borderRadius={`0 0 ${Theme.SecondaryRadius} ${Theme.SecondaryRadius}`}
                    >
                      <Text color={Theme.PrimaryRed}>
                        Old: <b>{item.oldValue}</b>
                      </Text>
                    </Boxed>
                  </Boxed>
                );
              })}

            {isloadingFile ? (
              <Boxed pad="20px" display="flex">
                <Loader margin="auto" />
              </Boxed>
            ) : (
              <>
                {entryData.file && entryData.fileFormat === "pdf" && (
                  <Boxed>
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
          </>
        )}

        {}
      </ModalComponent>
    </>
  );
};
