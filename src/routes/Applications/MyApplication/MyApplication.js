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

const statusOption = (status) => {
  switch (status) {
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
          ALLOCATED
        </Text>
      );
    case "PENDING":
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
          PENDING REVIEW
        </Text>
      );

    case "APPROVED":
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
          PENDING ALLOCATION
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
    default:
      return "-- / --";
  }
};

export const Applications = (props) => {
  // state props
  const { isLoading, applicationsList, applicationsTotal, fetchActionURL } =
    props;

  // dispatch props
  const { getAllApplications, redirect } = props;

  useEffect(() => {
    let data = {
      page: 1,
      size: 10,
    };
    getAllApplications(data);
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

  const ApplicationCard = ({ record }) => {
    const { id, status, createdAt, firstname, middlename, lastname } = record;
    return (
      <Boxed
        background={Theme.TertiaryDark}
        borderRadius={Theme.SecondaryRadius}
        pad="10px 0"
        boxShadow={Theme.PrimaryShadow}
        border={`0.5px solid ${Theme.PrimaryBorderColor}`}
        cursor="pointer"
        onClick={() => goToReview(id)}
      >
        <Boxed pad="10px" background={Theme.PrimaryDark}>
          <Grid desktop="auto 10px" tablet="auto 10px" mobile="auto 10px">
            <Boxed>
              <Text fontWeight="600">{id}</Text>
              <Text
                fontWeight="600"
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
              >
                App. Number
              </Text>
            </Boxed>
            <Boxed>
              <DropDownMenu record={props} />
            </Boxed>
          </Grid>
        </Boxed>
        <Text
          padding="5px 10px"
          fontSize={Theme.SecondaryFontSize}
          color={Theme.SecondaryTextColor}
        >
          By:{" "}
          <b>
            {firstname ? firstname : ""}
            {middlename ? middlename : ""} {lastname ? lastname : ""}
          </b>
        </Text>
        <Text
          padding="5px 10px"
          align="right"
          fontWeight="600"
          fontSize={Theme.SecondaryFontSize}
          color={Theme.SecondaryTextColor}
        >
          {createdAt && formatDate(createdAt)}
        </Text>
        <Boxed pad="5px 10px">{statusOption(status)}</Boxed>
      </Boxed>
    );
  };

  const columns = [
    {
      title: "App. Number",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "lastname",
      key: "lastname",
      render: (text, record) =>
        text &&
        `${record.firstname ? record.firstname : ""}  ${
          record.middlename ? record.middlename : ""
        } ${text}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Submit Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => text && formatDate(text),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text, record) => {
        return statusOption(text);
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

  return (
    <>
      <Boxed pad="20px">
        <PageTitle>Plot Application Request</PageTitle>
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
              search,
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
                        placeholder="Search by Applicant Name"
                        onChange={(value) => search(value, fetchActionURL)}
                      />
                    </Boxed>
                    <Boxed />
                    <Boxed />
                    <Boxed pad="5px 0" align="right">
                      <Button onClick={() => redirect("application/create")}>
                        Create Application
                      </Button>
                    </Boxed>
                  </Grid>
                  {isLoading ? (
                    <Boxed display="flex" pad="20px">
                      <Loader margin="auto" />
                    </Boxed>
                  ) : (
                    <>
                      {applicationsTotal > 0 ? (
                        // <>
                        //   <TableComponent
                        //     columns={columns}
                        //     data={applicationsList}
                        //   />
                        //   <Boxed pad="10px 0 ">
                        //     <PaginationComponent
                        //       total={applicationsTotal}
                        //       onChange={(page) =>
                        //         handlePagination(page, fetchActionURL)
                        //       }
                        //       current={currentPage}
                        //       pageCounts={pageOptions}
                        //       changePageSize={(pageSize) =>
                        //         changePageSize(pageSize, fetchActionURL)
                        //       }
                        //       pageSize={pageSize}
                        //       itemsDisplayed
                        //       showTotal={(total, range) => {
                        //         return `${range[0]} - ${range[1]} of ${applicationsTotal} items`;
                        //       }}
                        //     />
                        //   </Boxed>
                        // </>

                        <>
                          <Grid
                            desktop="repeat(4,1fr)"
                            tablet="repeat(3, 1fr)"
                            mobile="repeat(1,1fr)"
                            pad="10px 0"
                          >
                            {applicationsList.map((item) => (
                              <Boxed pad="10px 5px">
                                <ApplicationCard record={item} />
                              </Boxed>
                            ))}
                          </Grid>
                          <Boxed pad="10px 0 ">
                            //{" "}
                            <PaginationComponent
                              total={applicationsTotal}
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
                                return `${range[0]} - ${range[1]} of ${applicationsTotal} items`;
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
