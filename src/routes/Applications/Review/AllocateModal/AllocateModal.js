import React, { useState, useEffect } from "react";

import { Input, AsyncSelect } from "../../../../components/Input.components";
import { Grid } from "../../../../components/Grid.components";
import { Boxed } from "../../../../components/Boxed.components";
import { Text } from "../../../../components/Text.components";
import { Button } from "../../../../components/Button.components";
import { Alert } from "../../../../components/Alert.components";
import { ModalComponent } from "../../../../components/Modal.components";
import { Loader } from "../../../../components/Loader.components";
import { FileIcon, Icon } from "../../../../components/style";

import {
  calcViewMode,
  formatCurrency,
  getBase64,
} from "../../../../utils/utils";
import { Theme } from "../../../../utils/theme";
import { PageTitle } from "../../../../components/style";
import { MAP_URL } from "../../../../utils/config";
import moment from "moment";

export const AllocateModal = (props) => {
  // State props
  const {
    allocateModal,
    isLoading,
    modiParcelList,
    isSearching,
    applicationDetail,
  } = props;

  // Dispatch props
  const { closeModal, searchLands, allocateParcel } = props;

  const [lastSearch, setLastSearch] = useState("")
  const [search, setSearch] = useState("");
  const [landData, setLandData] = useState(null);

  const onSearch = () => {
    let value = search ? search.trim() : "";
    if (value) {
      setLastSearch(value);
      searchLands({
        page: 1,
        size: 10,
        search: value,
        assigned: 0,
      });
    }
  };

  const onSubmit = () => {
    if (landData) {
      const data = {
        parcelNumber: landData.parcelNumber,
        applicationId: applicationDetail.id,
      };
      allocateParcel(data);
    } else {
      Alert.info("Plot is required");
    }
  };

  return (
    <>
      <ModalComponent
        size="lg"
        show={allocateModal}
        onHide={closeModal}
        title={<PageTitle>Allocate Land</PageTitle>}
        footer={
          <>
            <Button clear onClick={closeModal}>
              Cancel
            </Button>
            <Button
              progress={isLoading}
              disabled={isLoading}
              onClick={() => onSubmit()}
            >
              Allocate
            </Button>
          </>
        }
      >
        <Grid desktop="auto 120px" tablet="auto 120px" mobile="auto 120px">
          <Input
            label="Search for Available land"
            type="search"
            placeholder="Search by land number"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button color={Theme.PrimaryBlue} onClick={() => onSearch()}>
            Search
          </Button>
        </Grid>
        {lastSearch !== '' && <Text padding="5px 0" align="center">
          This is the search result for <b><i>"{lastSearch}"</i></b>
        </Text>}
        <Boxed minHeight="150px">
          {isSearching ? (
            <Boxed display="flex" pad="20px">
              <Loader margin="auto" />
            </Boxed>
          ) : (
            <Boxed pad="10px 0">
              <AsyncSelect
                label="Land list"
                placeholder="Search by land number..."
                loading={isSearching}
                options={lastSearch ? modiParcelList : []}
                onChange={(value) => setLandData(value)}
              />
            </Boxed>
          )}
          {landData && (
            <Boxed pad="5px 0">
              <Grid
                desktop="repeat(2, 1fr)"
                tablet="repeat(2,1fr)"
                mobile="repeat(2, 1fr)"
              >
                <Boxed pad="8px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Registration Number
                  </Text>
                  <Text>{landData.registrationNumber}</Text>
                </Boxed>

                <Boxed pad="8px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Registration Date
                  </Text>
                  <Text>
                    {landData.regDate &&
                      moment(landData.regDate).format("ll")}
                  </Text>
                </Boxed>

                <Boxed pad="8px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Land Use
                  </Text>
                  <Text>{landData.landUse}</Text>
                </Boxed>
                <Boxed pad="8px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Land Type
                  </Text>
                  <Text>{landData.landType}</Text>
                </Boxed>

                <Boxed pad="8px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Area
                  </Text>
                  <Text>
                    {landData.landSize &&
                      formatCurrency(
                        Math.round(landData.landSize * 100) / 100
                      )}{" "}
                    sqr meter
                  </Text>
                </Boxed>
              </Grid>
              {/* <Boxed pad="5px">
                <iframe
                  src={`${MAP_URL}/map.html?parcel=${landData.FID}`}
                  width="100%"
                  height="300px"
                />
              </Boxed> */}
            </Boxed>
          )}
        </Boxed>
      </ModalComponent>
    </>
  );
};
