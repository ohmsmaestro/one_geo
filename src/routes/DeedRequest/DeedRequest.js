import React, { useEffect, useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";

import Wrapper from "../Common/FilterWrapper/index";

import { Grid } from "../../components/Grid.components";
import { Boxed } from "../../components/Boxed.components";
import { AsyncSelect, Input } from "../../components/Input.components";
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

const statusOptions = [
  { value: 1, label: "Pending Review" },
  { value: 2, label: "Pending Allocation" },
  { value: 3, label: "Pending Allocation Review" },
  { value: 4, label: "Pending User Review" },
  { value: 5, label: "Allocated" },
];

const getStatus = (status, declined) => {
  if (declined) {
    return (
      <Text
        color={Theme.PrimaryRed}
        fontWeight="600"
        fontSize={Theme.SecondaryFontSize}
        align="center"
      >
        {" "}
        <Icon
          className="icon-cancel-circled"
          color={Theme.PrimaryRed}
          margin="0 5px 0 0"
          fontSize="16px"
        />{" "}
        Declined [{status}]
      </Text>
    );
  }
  switch (status) {
    case "PENDING REVIEW":
      return (
        <Text
          color={Theme.PrimaryYellow}
          fontSize={Theme.SecondaryFontSize}
          align="center"
        >
          {" "}
          <Icon
            className="icon-attention-1"
            color={Theme.PrimaryYellow}
            margin="0 5px 0 0"
            fontSize="16px"
          />{" "}
          Pending Review
        </Text>
      );

    case "PENDING ALLOCATION":
      return (
        <Text
          color={Theme.PrimaryBlue}
          fontSize={Theme.SecondaryFontSize}
          align="center"
        >
          {" "}
          <Icon
            className="icon-attention-1"
            color={Theme.PrimaryBlue}
            margin="0 5px 0 0"
            fontSize="16px"
          />{" "}
          Pending Allocation
        </Text>
      );

    case "PENDING ALLOCATION APPROVAL":
      return (
        <Text
          color={Theme.PrimaryYellow}
          fontSize={Theme.SecondaryFontSize}
          align="center"
        >
          {" "}
          <Icon
            className="icon-attention-1"
            color={Theme.PrimaryYellow}
            margin="0 5px 0 0"
            fontSize="16px"
          />{" "}
          Pending Allocation Approval
        </Text>
      );

    case "PENDING ACCEPTANCE":
      return (
        <Text
          color={Theme.PrimaryBlue}
          fontSize={Theme.SecondaryFontSize}
          align="center"
        >
          {" "}
          <Icon
            className="icon-attention-1"
            color={Theme.PrimaryBlue}
            margin="0 5px 0 0"
            fontSize="16px"
          />{" "}
          Pending Acceptance
        </Text>
      );

    case "REJECTED":
      return (
        <Text
          color={Theme.PrimaryRed}
          fontWeight="600"
          fontSize={Theme.SecondaryFontSize}
          align="center"
        >
          {" "}
          <Icon
            className="icon-cancel-circled"
            color={Theme.PrimaryRed}
            margin="0 5px 0 0"
            fontSize="16px"
          />{" "}
          REJECTED
        </Text>
      );
    case "ALLOCATED":
      return (
        <Text
          color={Theme.PrimaryGreen}
          align="center"
          fontSize={Theme.SecondaryFontSize}
        >
          {" "}
          <Icon
            className="icon-ok-circled-1"
            color={Theme.PrimaryGreen}
            margin="0 5px 0 0"
            fontSize={Theme.SecondaryFontSize}
            fontSize="16px"
          />{" "}
          Allocated
        </Text>
      );
    default:
      return "-- / --";
  }
};

export const DeedRequest = (props) => {
  // state props
  const { isLoading, deedList, deedTotal, fetchActionURL, isProprietor } =
    props;

  // dispatch props
  const { getAllDeedRequest, redirect } = props;

  const [status, setStatus] = useState(null);

  useEffect(() => {
    let data = {
      page: 1,
      size: 10,
    };
    getAllDeedRequest(data);
  }, []);

  const goToReview = (id) => {
    redirect(`/application/${id}`);
  };

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
            <Dropdown.Item onClick={() => goToReview(record.id)}>
              Review
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </StyledDrpDown>
    );
  };

  const columns = [
    {
      title: "Deed Number",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Plot Number",
      dataIndex: "plotNumber",
      key: "plotNumber",
    },
    {
      title: "Old Owner",
      dataIndex: "oldLastname",
      key: "oldLastname",
      render: (text, record) =>
        text &&
        `${record.oldFirstname ? record.oldFirstname : ""}  ${
          record.oldMiddlename ? record.oldMiddlename : ""
        } ${text}`,
    },
    {
      title: "New Owner",
      dataIndex: "newLastname",
      key: "newLastname",
      render: (text, record) =>
        text &&
        `${record.newFirstname ? record.newFirstname : ""}  ${
          record.newMiddlename ? record.newMiddlename : ""
        } ${text}`,
    },
    {
      title: "Submitted Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => text && formatDate(text),
    },
    {
      title: "Status",
      dataIndex: "stageName",
      key: "stageName",
      align: "center",
      render: (text, record) => {
        return getStatus(text, record.declined);
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      align: "right",
      render: (text, record) => <DropDownMenu record={record} />,
    },
  ];

  let externalParams = { status: status?.value };

  return (
    <>
      <Boxed pad="20px">
        <PageTitle>Deeds Request</PageTitle>
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
              search,
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
                        placeholder="Search by Deed. no."
                        onChange={(value) => search(value, fetchActionURL)}
                      />
                    </Boxed>
                    <Boxed pad="5px 0" margin="auto 0 0 0">
                      <AsyncSelect
                        label="status"
                        options={statusOptions}
                        onChange={(value) => setStatus(value)}
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
                      {deedTotal > 0 ? (
                        <>
                          <TableComponent columns={columns} data={deedList} />
                          <Boxed pad="10px 0 ">
                            <PaginationComponent
                              total={deedTotal}
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
                                return `${range[0]} - ${range[1]} of ${deedTotal} items`;
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
