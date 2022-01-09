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
            <Dropdown.Item
              onClick={() => redirect(`/application/${record.id}`)}
            >
              Review
            </Dropdown.Item>
            <Dropdown.Item>Allocate Plot</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </StyledDrpDown>
    );
  };

  const columns = [
    {
      title: "App. Number",
      dataIndex: "application_number",
      key: "application_number",
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Submit Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => text && formatDate(text),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text, record) => {
        switch (text) {
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
          case "PENDING_REVIEW":
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

          case "PENDING_ALLOCATION":
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
                      {" "}
                      {applicationsTotal > 0 ? (
                        <>
                          <TableComponent
                            columns={columns}
                            data={applicationsList}
                          />
                          <Boxed pad="10px 0 ">
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
