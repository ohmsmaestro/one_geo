import React, { useEffect } from "react";

import Dropdown from "react-bootstrap/Dropdown";

import Wrapper from "../Common/FilterWrapper/index";

import { Grid } from "../../components/Grid.components";
import { Boxed } from "../../components/Boxed.components";
import { Input } from "../../components/Input.components";
import { Text } from "../../components/Text.components";
import { Loader } from "../../components/Loader.components";
import { EmptyState } from "../../components/EmptyState.components";
import {
  TableComponent,
  PaginationComponent,
} from "../../components/Table.components";
import { PageTitle, Icon, StyledDrpDown } from "../../components/style";

import { calcViewMode, formatCurrency, formatDate } from "../../utils/utils";
import { pageOptions } from "../../utils/constant";
import { Theme } from "../../utils/theme";

import ReviewModal from "./Review/index";

export const Appraisal = (props) => {
  // state props
  const {
    isLoading,
    appraisalList,
    appraisalTotal,
    fetchActionURL,
    appraisalReview,
  } = props;

  // dispatch props
  const { getAllAppraisal, openReviewModal } = props;

  useEffect(() => {
    let data = {
      page: 1,
      size: 10,
    };
    getAllAppraisal(data);
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
            <Dropdown.Item onClick={() => openReviewModal(record)}>
              Review
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </StyledDrpDown>
    );
  };

  const columns = [
    {
      title: "Plot Number",
      dataIndex: "parcelNumber",
      key: "parcelNumber",
    },

    {
      title: "Apprisal Type",
      dataIndex: "appraisalType",
      key: "appraisalType",
    },

    {
      title: "Sub. App. Type",
      dataIndex: "subAppraisalType",
      key: "subAppraisalType",
    },
    {
      title: "Sub. App. Type",
      dataIndex: "value",
      key: "value",
    },

    {
      title: "value(₦)",
      dataIndex: "value",
      key: "value",
      render: (text) => text && formatCurrency(text),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Created Date",
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
        switch (text) {
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
                color={Theme.PrimaryGreen}
                fontSize={Theme.SecondaryFontSize}
                align="center"
              >
                {" "}
                <Icon
                  className="icon-ok"
                  color={Theme.PrimaryGreen}
                  margin="0 5px 0 0"
                  fontSize="16px"
                />{" "}
                APPROVED
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
        <PageTitle>Appraisal Request</PageTitle>
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
                        placeholder="Search by appraisal"
                        onChange={(value) => search(value, fetchActionURL)}
                      />
                    </Boxed>
                  </Grid>
                  {isLoading ? (
                    <Boxed display="flex" pad="20px">
                      <Loader margin="auto" />
                    </Boxed>
                  ) : (
                    <>
                      {" "}
                      {appraisalTotal > 0 ? (
                        <>
                          <TableComponent
                            columns={columns}
                            data={appraisalList}
                          />
                          <Boxed pad="10px 0 ">
                            <PaginationComponent
                              total={appraisalTotal}
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
                                return `${range[0]} - ${range[1]} of ${appraisalTotal} items`;
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
        {appraisalReview && <ReviewModal />}
      </Boxed>
    </>
  );
};
