import React, { useEffect, useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";

import Wrapper from "../Common/FilterWrapper/index";

import { Grid } from "../../components/Grid.components";
import { Boxed } from "../../components/Boxed.components";
import { AsyncSelect, Input } from "../../components/Input.components";
import { Text } from "../../components/Text.components";
import { Loader } from "../../components/Loader.components";
import { EmptyState } from "../../components/EmptyState.components";
import {
  TableComponent,
  PaginationComponent,
} from "../../components/Table.components";
import { PageTitle, Icon, StyledDrpDown } from "../../components/style";

import { calcViewMode, formatDate } from "../../utils/utils";
import { pageOptions, deedStatusOption } from "../../utils/constant";
import { Theme } from "../../utils/theme";

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
        Declined
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
    case "TRANSFER COMPLETED":
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
            fontSize={`16px`}
          />{" "}
          Completed
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
    redirect(`/deeds/review/${id}`);
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
      title: "Deed Type",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (<span>
        {record.deed_type} <br/>
        <small style={{ color: Theme.PrimaryBlue }}>No. {text}</small>
      </span>)
    },
    {
      title: "Plot Number",
      dataIndex: "plot_number",
      key: "plot_number",
    },
    {
      title: "Old Owner",
      dataIndex: "old_name",
      key: "old_name",
    },
    {
      title: "New Owner",
      dataIndex: "new_name",
      key: "new_name",
    },
    {
      title: "Submitted Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => text && formatDate(text),
    },
    {
      title: "Status",
      dataIndex: "stage_name",
      key: "stage_name",
      align: "center",
      render: (text, record) => {
        return getStatus(text, record.rejected);
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
                        placeholder="Search by plot number."
                        onChange={(value) => search(value, fetchActionURL)}
                      />
                    </Boxed>
                    <Boxed pad="5px 0" margin="auto 0 0 0">
                      <AsyncSelect
                        label="Status"
                        options={deedStatusOption}
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
