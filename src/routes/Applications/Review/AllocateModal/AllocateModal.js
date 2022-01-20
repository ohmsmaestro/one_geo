import React, { useState, useEffect } from "react";

import { Input, AsyncSelect } from "../../../../components/Input.components";
import { Grid } from "../../../../components/Grid.components";
import { Boxed } from "../../../../components/Boxed.components";
import { Text } from "../../../../components/Text.components";
import { Button } from "../../../../components/Button.components";
import { Alert } from "../../../../components/Alert.components";
import { ModalComponent } from "../../../../components/Modal.components";
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
  const { closeModal, searchParcels, allocateParcel } = props;

  const [search, setSearch] = useState("");
  const [parcelData, setParcelData] = useState(null);

  const handleSearch = () => {
    let value = search ? search.trim() : "";
    if (value) {
      searchParcels({
        page: 1,
        size: 10,
        search: value,
        allocated: 0,
        appraised: 0,
      });
    }
  };

  const onSubmit = () => {
    if (parcelData) {
      const data = {
        parcelNumber: parcelData.ParcelNumber,
        FID: parcelData.FID,
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
        title={<PageTitle>Allocate Plot</PageTitle>}
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
            type="search"
            placeholder="Search by plot number"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button color={Theme.PrimaryBlue} onClick={() => handleSearch()}>
            Search
          </Button>
        </Grid>
        <Boxed minHeight="150px">
          <Boxed pad="10px 0">
            <AsyncSelect
              label="Plot list"
              placeholder="Search by plot number..."
              loading={isSearching}
              options={modiParcelList}
              onChange={(value) => setParcelData(value)}
            />
          </Boxed>
          {parcelData && (
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
                  <Text>{parcelData.REG_NUMBER}</Text>
                </Boxed>

                <Boxed pad="8px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Registration Date
                  </Text>
                  <Text>
                    {parcelData.REG_DATE &&
                      moment(parcelData.REG_DATE).format("ll")}
                  </Text>
                </Boxed>

                <Boxed pad="8px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Category
                  </Text>
                  <Text>{parcelData.CATEGORY}</Text>
                </Boxed>

                <Boxed pad="8px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Land Type
                  </Text>
                  <Text>{parcelData.LAND_TYPE}</Text>
                </Boxed>
                <Boxed pad="8px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Land Use
                  </Text>
                  <Text>{parcelData.LAND_USE}</Text>
                </Boxed>
                <Boxed pad="8px 0">
                  <Text
                    fontSize={Theme.SecondaryFontSize}
                    color={Theme.SecondaryTextColor}
                  >
                    Area
                  </Text>
                  <Text>
                    {parcelData.Shape__Area &&
                      formatCurrency(
                        Math.round(parcelData.Shape__Area * 100) / 100
                      )}{" "}
                    sqr meter
                  </Text>
                </Boxed>
              </Grid>
              <Boxed pad="5px">
                <iframe
                  src={`${MAP_URL}/map.html?parcel=${parcelData.FID}`}
                  width="100%"
                  height="300px"
                />
              </Boxed>
            </Boxed>
          )}
        </Boxed>
      </ModalComponent>
    </>
  );
};
