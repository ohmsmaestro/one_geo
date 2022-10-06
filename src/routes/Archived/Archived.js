import React, { useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";

import { Grid } from "../../components/Grid.components";
import { Boxed } from "../../components/Boxed.components";
import { Input } from "../../components/Input.components";
import { Text } from "../../components/Text.components";
import { Button } from "../../components/Button.components";
import { Loader } from "../../components/Loader.components";
import { EmptyState } from "../../components/EmptyState.components";
import { PageTitle, Icon, StyledDrpDown } from "../../components/style";

import { calcViewMode } from "../../utils/utils";
import { Theme } from "../../utils/theme";

import PDF_ICON from "../../assets/img/file-pdf.png";
import DOC_ICON from "../../assets/img/file-doc.png";
import JPG_ICON from "../../assets/img/file-jpg.png";

export const Archived = (props) => {
  // state props
  const { isLoading, archivedList, archivedTotal } = props;

  // dispatch props
  const { getAllArchived } = props;

  const [search, setSearch] = useState('')

  // useEffect(() => {
  //   let data = {
  //     page: 1,
  //     size: 20,
  //   };
  //   getAllArchived(data);
  // }, []);

  let viewMode = calcViewMode();

  const DropDownMenu = (props) => {
    const { record } = props;
    return (
      <StyledDrpDown>
        <Dropdown>
          <Dropdown.Toggle variant id="dropdown-basic">
            <Icon className="icon-more-vertical" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Edit File</Dropdown.Item>
            <Dropdown.Item>Delete File</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </StyledDrpDown>
    );
  };

  const handleSearchArchive = () => {
    getAllArchived({ ParcelNumber: search })
  }

  return (
    <>
      <Boxed pad="20px">
        <PageTitle>Archived Documents</PageTitle>
        <Boxed pad="20px 10px">
          <Grid
            desktop="repeat(4, 1fr)"
            tablet="repeat(4, 1fr)"
            mobile="repeat(1, 1fr)"
          >
            <Boxed pad="5px 0" display="flex">
              <Input
                type="search"
                placeholder="Search by plot number"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={() => handleSearchArchive()}>
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
                            <Boxed align="right">
                              <DropDownMenu record={item} />
                            </Boxed>
                            <Boxed pad="0 0 10px 0" align="center">
                              <img
                                src={ICON}
                                alt={`doc-type-icon-${index}`}
                                height="64px"
                              />
                            </Boxed>
                            <Text fontSize={Theme.SecondaryFontSize} padding="10px 0">{item.name}</Text>
                            <Button
                              block
                              pale
                              color={Theme.PrimaryBlue}
                              xs
                            >
                              View
                            </Button>
                          </Boxed>
                        );
                      })}
                  </Grid>

                  {/* <Boxed pad="10px 0 ">
                            <PaginationComponent
                              total={archivedTotal}
                              onChange={(page) =>
                                handlePagination(page, fetchActionURL)
                              }
                              current={currentPage}
                              pageCounts={pageOptions}
                              changePageSize={(pageSize) =>
                                changePageSize(pageSize, fetchActionURL)
                              }
                              pageSize={pageSize}
                              itemsDisplayed
                              showTotal={(total, range) => {
                                return `${range[0]} - ${range[1]} of ${archivedTotal} items`;
                              }}
                            />
                          </Boxed> */}
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
