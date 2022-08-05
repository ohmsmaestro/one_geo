import React, { useEffect, useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";

import Wrapper from "../Common/FilterWrapper/index";

import { Grid } from "../../components/Grid.components";
import { Boxed } from "../../components/Boxed.components";
import { Input, AsyncSelect } from "../../components/Input.components";
import { Text } from "../../components/Text.components";
import { Button } from "../../components/Button.components";
import { Loader } from "../../components/Loader.components";
import { Badge } from "../../components/Badge.components";
import { EmptyState } from "../../components/EmptyState.components";
import {
  TableComponent,
  PaginationComponent,
} from "../../components/Table.components";
import { PageTitle, Icon, StyledDrpDown } from "../../components/style";

import { calcViewMode, formatDate } from "../../utils/utils";
import { pageOptions } from "../../utils/constant";
import { Theme } from "../../utils/theme";

import TerminateModal from "./TerminateModal/index";
import DetailModal from "./DetailModal/index";

const statusOptions = [
  { value: 1, label: "Closed" },
  { value: 2, label: "Open" },
];

export const Encumbrance = (props) => {
  // state props
  const {
    isLoading,
    encumbranceList,
    encumbranceTotal,
    fetchActionURL,
    terminateModal,
    encumbranceDetailModal,
    accessList,
  } = props;

  // dispatch props
  const { getAllEncumbrance, openTerminateModal, openDetailModal, redirect } =
    props;

  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (accessList["VIEW_ENCUMBRANCE"]) {
      let data = { size: 10, page: 1 };
      getAllEncumbrance(data);
    } else {
      redirect("/dashboard");
    }
  }, []);

  let viewMode = calcViewMode();

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Plot Number",
      dataIndex: "parcelNumber",
      key: "parcelNumber",
    },
    {
      title: "Entered By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => text && formatDate(text),
    },
    {
      title: "Status",
      dataIndex: "close",
      key: "close",
      render: (text) =>
        text ? (
          <Badge color={Theme.PrimaryGreen}>Closed</Badge>
        ) : (
          <Badge color={Theme.PrimaryRed}>Open</Badge>
        ),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      align: "right",
      render: (text, record) => {
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
                {!record.close && accessList["TERMINATE_ENCUMBRANCE"] && (
                  <Dropdown.Item onClick={() => openTerminateModal(record)}>
                    Terminate Entry
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </StyledDrpDown>
        );
      },
    },
  ];

  let externalParams = {
    status: status?.value,
  };
  return (
    <>
      <Boxed pad="20px">
        <PageTitle>Title Defect Entry</PageTitle>
        <Boxed
          pad="20px 10px"
          background={Theme.TertiaryDark}
          borderRadius={Theme.SecondaryRadius}
        >
          <Wrapper
            externalParams={externalParams}
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
                    <Boxed pad="5px 0" margin="auto 0 0 0">
                      <Input
                        type="search"
                        placeholder="Search by plot number"
                      />
                    </Boxed>
                    <Boxed>
                      <AsyncSelect
                        label="Status"
                        options={statusOptions}
                        onChange={(value) => setStatus(value)}
                      />
                    </Boxed>
                    <Boxed />
                  </Grid>
                  {isLoading ? (
                    <Boxed display="flex" pad="20px">
                      <Loader margin="auto" />
                    </Boxed>
                  ) : (
                    <>
                      {" "}
                      {encumbranceTotal > 0 ? (
                        <>
                          <TableComponent
                            columns={columns}
                            data={encumbranceList}
                          />
                          <Boxed pad="10px 0 ">
                            <PaginationComponent
                              total={encumbranceTotal}
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
                                return `${range[0]} - ${range[1]} of ${encumbranceTotal} items`;
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

      {terminateModal && <TerminateModal />}
      {encumbranceDetailModal && <DetailModal />}
    </>
  );
};
