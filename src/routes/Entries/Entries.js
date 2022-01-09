import React, { useEffect } from "react";

import Dropdown from "react-bootstrap/Dropdown";

import Wrapper from "../Common/FilterWrapper/index";

import { Grid } from "../../components/Grid.components";
import { Boxed } from "../../components/Boxed.components";
import { Input } from "../../components/Input.components";
import { Text } from "../../components/Text.components";
import { Button } from "../../components/Button.components";
import { Loader } from "../../components/Loader.components";
import { EmptyState } from "../../components/EmptyState.components";
import {
  TableComponent,
  PaginationComponent,
} from "../../components/Table.components";
import { PageTitle, Icon, StyledDrpDown } from "../../components/style";

import { calcViewMode, formatDate } from "../../utils/utils";
import { pageOptions } from "../../utils/constant";
import { Theme } from "../../utils/theme";

export const Entries = (props) => {
  // state props
  const { isLoading, entriesList, entriesTotal, fetchActionURL } = props;

  // dispatch props
  const { getAllEntries } = props;

  useEffect(() => {
    let data = {
      page: 1,
      size: 10,
    };
    getAllEntries(data);
  }, []);

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
            <Dropdown.Item>View Details</Dropdown.Item>
            <Dropdown.Item>Terminate Ownership</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </StyledDrpDown>
    );
  };

  const columns = [
    {
      title: "Entry Number",
      dataIndex: "entry_number",
      key: "entry_number",
    },
    {
      title: "Plot No.",
      dataIndex: "parcel_number",
      key: "parcel_number",
    },
    {
      title: "Proprietor",
      dataIndex: "proprietor",
      key: "proprietor",
    },

    {
      title: "Entry. Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => text && formatDate(text),
    },
    // {
    //   title: "Encumbrance status",
    //   dataIndex: "encumbrace_status",
    //   key: "encumbrace_status",
    //   align: "center",
    //   render: (text, record) => {
    //     switch (text) {
    //       case "SUCCESSFUL":
    //         return (
    //           <Text color={Theme.PrimaryGreen} fontWeight="600" align="center">
    //             {" "}
    //             <Icon
    //               className="icon-ok-circled-1"
    //               color={Theme.PrimaryGreen}
    //               margin="0 5px 0 0"
    //               fontSize="16px"
    //             />{" "}
    //             YES
    //           </Text>
    //         );
    //       case "PENDING":
    //         return (
    //           <Text color={Theme.PrimaryGreen} fontWeight="600" align="center">
    //             {" "}
    //             <Icon
    //               className="icon-ok-circled-1"
    //               color={Theme.PrimaryGreen}
    //               margin="0 5px 0 0"
    //               fontSize="16px"
    //             />{" "}
    //             PENDING
    //           </Text>
    //         );

    //       default:
    //         return "-- / --";
    //     }
    //   },
    // },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      align: "right",
      render: (text, record) => <DropDownMenu record={record} />,
    },
  ];

  return (
    <>
      <Boxed pad="20px">
        <PageTitle>Proprietor Entry</PageTitle>
        <Boxed
          pad="20px 10px"
          background={Theme.TertiaryDark}
          borderRadius={Theme.SecondaryRadius}
        >
          <Wrapper
            externalActionURL={fetchActionURL}
            render={({
              changePageSize,
              handlePagination,
              currentPage,
              pageSize,
            }) => {
              return (
                <>
                  <Grid
                    desktop="repeat(4, 1fr)"
                    tablet="repeat(4, 1fr)"
                    mobile="repeat(1, 1fr)"
                  >
                    <Boxed pad="5px 0">
                      <Input
                        type="search"
                        placeholder="Search by entry number"
                      />
                    </Boxed>
                    <Boxed />
                    <Boxed />
                  </Grid>
                  {isLoading ? (
                    <Boxed display="flex" pad="20px">
                      <Loader margin="auto" />
                    </Boxed>
                  ) : (
                    <>
                      {" "}
                      {entriesTotal > 0 ? (
                        <>
                          <TableComponent
                            columns={columns}
                            data={entriesList}
                          />
                          <Boxed pad="10px 0 ">
                            <PaginationComponent
                              total={entriesTotal}
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
                                return `${range[0]} - ${range[1]} of ${entriesTotal} items`;
                              }}
                            />
                          </Boxed>
                        </>
                      ) : (
                        <EmptyState />
                      )}
                    </>
                  )}
                </>
              );
            }}
          />
        </Boxed>
      </Boxed>
    </>
  );
};
