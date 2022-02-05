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

import DetailModal from "./DetailModal/index";

export const Rectification = (props) => {
  // state props
  const {
    isLoading,
    rectificationList,
    rectificationTotal,
    fetchActionURL,
    rectificationDetailModal,
    accessList,
  } = props;

  // dispatch props
  const { getAllRectification, openDetailModal, redirect } = props;

  useEffect(() => {
    if (accessList["VIEW_RECTIFICATION"]) {
      let data = { size: 10, page: 1 };
      getAllRectification(data);
    } else {
      redirect("/dashboard");
    }
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
            <Dropdown.Item onClick={() => openDetailModal(record)}>
              View Details
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </StyledDrpDown>
    );
  };

  const columns = [
    {
      title: "Entry Type",
      dataIndex: "entity",
      key: "entity",
      render: (text) => {
        if (text === "PARCEL") {
          return "PLOT";
        }
        return text;
      },
    },
    {
      title: "Entry Ref.",
      dataIndex: "entityId",
      key: "entityId",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Entered By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Entry Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => text && formatDate(text),
    },
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
        <PageTitle>Rectification Entry</PageTitle>
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
                      {rectificationTotal > 0 ? (
                        <>
                          <TableComponent
                            columns={columns}
                            data={rectificationList}
                          />
                          <Boxed pad="10px 0 ">
                            <PaginationComponent
                              total={rectificationTotal}
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
                                return `${range[0]} - ${range[1]} of ${rectificationTotal} items`;
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

      {rectificationDetailModal && <DetailModal />}
    </>
  );
};
