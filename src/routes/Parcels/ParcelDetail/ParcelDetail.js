import React, { useEffect } from "react";
import moment from "moment";

import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { Loader } from "../../../components/Loader.components";
import { FileComponent } from "../../../components/File.components";
import { PageTitle } from "../../../components/style";

import { Theme } from "../../../utils/theme";
import { formatCurrency } from "../../../utils/utils";

export const ParcelDetail = (props) => {
  // state props received
  const { params, parcelData, archivedList, isLoading, isloadingDocuments } =
    props;

  // dispatch props received
  const { redirect, getSingleParcel, openFile } = props;

  useEffect(() => {
    if (params.id) {
      getSingleParcel({ page: 1, size: 5, search: params.id });
    }
  }, []);

  return (
    <Boxed pad="10px 20px">
      <Boxed align="right" pad="15px 0" className="no-print">
        <Button
          clear
          color={Theme.SecondaryTextColor}
          onClick={() => redirect("/parcels")}
        >
          Back
        </Button>
      </Boxed>
      <PageTitle>Plot Detail</PageTitle>
      {isLoading ? (
        <Boxed pad="20px" display="flex">
          <Loader margin="auto" />
        </Boxed>
      ) : (
        <>
          <Boxed pad="8px 0">
            <Text
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
            >
              Plot Number
            </Text>
            <Text>{parcelData.ParcelNumber}</Text>
          </Boxed>
          <Grid
            desktop="repeat(3, 1fr)"
            tablet="repeat(3,1fr)"
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
              <Text>{parcelData.REG_DATE}</Text>
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

            <Boxed pad="8px 0">
              <Text
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
              >
                Checked By
              </Text>
              <Text>{parcelData.checkedBy}</Text>
            </Boxed>
            <Boxed pad="8px 0">
              <Text
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
              >
                Passed By
              </Text>
              <Text>{parcelData.passedBy}</Text>
            </Boxed>
            <Boxed pad="8px 0">
              <Text
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
              >
                Drawn By
              </Text>
              <Text>{parcelData.drawnBy}</Text>
            </Boxed>
            <Boxed pad="8px 0">
              <Text
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
              >
                Surveyed By
              </Text>
              <Text>{parcelData.surveyedBy}</Text>
            </Boxed>
          </Grid>
          <Boxed pad="8px 0">
            <Text
              fontSize={Theme.SecondaryFontSize}
              color={Theme.SecondaryTextColor}
            >
              Legal Description
            </Text>
            <Text>{parcelData.LEGAL_DESC}</Text>
          </Boxed>

          <Text
            fontSize={Theme.SecondaryFontSize}
            color={Theme.SecondaryTextColor}
          >
            Archived Documents
          </Text>
          {isloadingDocuments ? (
            <Boxed pad="20px" display="flex">
              <Loader margin="auto" />
            </Boxed>
          ) : (
            <Boxed pad="10px 0">
              <Grid
                desktop="repeat(4, 1fr)"
                tablet="repeat(3,1fr)"
                mobile="repeat(2, 1fr)"
              >
                {archivedList?.map((item, index) => {
                  return (
                    <Boxed pad="10px" key={index}>
                      <Boxed pad="0 0 10px 0" align="center" cursor="pointer">
                        <FileComponent
                          size="50px"
                          type="pdf"
                          onClick={() =>
                            openFile({
                              fileName: item,
                              ParcelNumber: parcelData.ParcelNumber,
                            })
                          }
                          name={item}
                        />
                      </Boxed>
                    </Boxed>
                  );
                })}
              </Grid>
            </Boxed>
          )}
        </>
      )}
    </Boxed>
  );
};
