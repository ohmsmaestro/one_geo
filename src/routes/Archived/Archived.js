import React, { useState } from "react";

import { Grid } from "../../components/Grid.components";
import { Boxed } from "../../components/Boxed.components";
import { Input } from "../../components/Input.components";
import { Text } from "../../components/Text.components";
import { Button } from "../../components/Button.components";
import { Loader } from "../../components/Loader.components";
import { EmptyState } from "../../components/EmptyState.components";
import { PageTitle, } from "../../components/style";

import { calcViewMode } from "../../utils/utils";
import { Theme } from "../../utils/theme";

import PDF_ICON from "../../assets/img/file-pdf.png";
import DOC_ICON from "../../assets/img/file-doc.png";
import JPG_ICON from "../../assets/img/file-jpg.png";

export const Archived = (props) => {
  // state props
  const { isLoading, archivedList, archivedTotal, parcelData } = props;

  // dispatch props
  const { getAllArchived, openFile } = props;

  const [search, setSearch] = useState('')

  let viewMode = calcViewMode();
  
  const handleSearchArchive = () => {
    getAllArchived({ ParcelNumber: search })
  }

  console.log({ parcelData })

  return (
    <>
      <Boxed pad="20px">
        <PageTitle>Archived Documents</PageTitle>
        <Boxed pad="20px 10px">
          <Grid
            desktop="800px"
            tablet="650px"
            mobile="repeat(1, 1fr)"
          >
            <Boxed pad="5px 0" display="flex">
              <Input
                type="search"
                placeholder="Search by plot number"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button margin="0 0 0 5px" onClick={() => handleSearchArchive()}>
                <i className="icon-search" />
              </Button>
            </Boxed>
          </Grid>
          {isLoading ? (
            <Boxed display="flex" pad="20px">
              <Loader margin="auto" />
            </Boxed>
          ) : (
            <>
              {archivedTotal > 0 ? (
                <>
                  <Grid
                    desktop="repeat(5, 1fr)"
                    tablet="repeat(4, 1fr)"
                    mobile="repeat(2, 1fr)"
                  >
                    {archivedList &&
                      archivedList.map((item, index) => {
                        let ICON = "";
                        switch (item.type) {
                          case "pdf":
                            ICON = PDF_ICON;
                            break;

                          case "doc":
                            ICON = DOC_ICON;
                            break;

                          case "jpg":
                            ICON = JPG_ICON;
                            break;

                          default:
                            ICON = PDF_ICON;
                            break;
                        }

                        return (
                          <Boxed pad="10px" key={index}>
                            <Boxed pad="0 0 10px 0" align="center">
                              <img
                                src={ICON}
                                alt={`doc-type-icon-${index}`}
                                height="64px"
                              />
                            </Boxed>
                            <Text fontSize={Theme.SecondaryFontSize} padding="10px 0">{item}</Text>
                            <Button
                              block
                              pale
                              color={Theme.PrimaryBlue}
                              xs
                              onClick={() => openFile({
                                fileName: item,
                                ParcelNumber: search,
                              })}
                            >
                              View
                            </Button>
                          </Boxed>
                        );
                      })}
                  </Grid>
                </>
              ) : (
                <EmptyState />
              )}
            </>
          )}
        </Boxed>
      </Boxed>
    </>
  );
};
