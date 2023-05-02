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

  PaginationComponent,
} from "../../components/Table.components";
import { PageTitle, Icon, DropDownMenu } from "../../components/style";

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
            fontSize="16px"
          />{" "}
          Allocated
        </Text>
      );
    default:
      return "-- / --";
  }
};

export const Applications = (props) => {
  // state props
  const {
    isLoading,
    applicationsList,
    applicationsTotal,
    fetchActionURL,
    isProprietor,
  } = props;

  // dispatch props
  const { getAllApplications, redirect } = props;

  const [status, setStatus] = useState(null);

  useEffect(() => {
    let data = {
      page: 1,
      size: 10,
    };
    getAllApplications(data);
  }, []);

  const goToReview = (id) => redirect(`/application/${id}`);


  let viewMode = calcViewMode();

  // const DropDownMenu = (props) => {
  //   const { record } = props;
  //   return (
  //     <StyledDrpDown>
  //       <Dropdown>
  //         <Dropdown.Toggle variant id="dropdown-basic">
  //           <Icon className="icon-more-vertical" />
  //         </Dropdown.Toggle>
  //         <Dropdown.Menu>
  //           <Dropdown.Item onClick={() => goToReview(record.id)}>
  //             Review
  //           </Dropdown.Item>
  //         </Dropdown.Menu>
  //       </Dropdown>
  //     </StyledDrpDown>
  //   );
  // };
  const dropDownMenu = [
    { key: 1, label: `Review` },
    { key: 2, label: `Acknownledgement Letter` },
    { key: 3, label: `Acceptance Letter` },
  ];

  const handleDropDownMenuAction = (item, record) => {
    switch (item.key) {
      case 1: // Review Application
        goToReview(record.id)
        break;
      case 2: // Aknowledgemnet Letter
        redirect(`/application/acknowledgement/${record.id}`)
        break;
      case 3: // Acceptance Letter
        redirect(`/application/acceptance/${record.id}`)
        break;
      default:
        break;
    }
  };

  const ApplicationCard = ({ record }) => {
    const { id, stageName, createdAt, firstname, middlename, lastname, declined } =
      record;

    const modiDropdownMenu = dropDownMenu.filter(item => {
      if (record.stageId !== 4 && item.key === 3) {
        return false;
      }
      return true;
    })

    return (
      <Boxed
        background={Theme.TertiaryDark}
        borderRadius={Theme.SecondaryRadius}
        pad="10px 0"
        boxShadow={Theme.PrimaryShadow}
        border={`0.5px solid ${Theme.PrimaryBorderColor}`}
      >
        <Boxed pad="10px" background={Theme.PrimaryDark}>
          <Grid desktop="auto 10px" tablet="auto 10px" mobile="auto 10px">
            <Boxed>
              <Text fontWeight="600">{id}</Text>
              <Text
                fontSize={Theme.SecondaryFontSize}
                color={Theme.SecondaryTextColor}
              >
                App. Number
              </Text>
            </Boxed>
            <Boxed>
              <DropDownMenu
                list={modiDropdownMenu}
                handleAction={(e) => handleDropDownMenuAction(e, record)}
              />
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
            {firstname ? firstname : ""} {middlename ? middlename : ""}{" "}
            {lastname ? lastname : ""}
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
        <Boxed pad="5px 10px">{getStatus(stageName, declined)}</Boxed>
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
        `${record.firstname ? record.firstname : ""}  ${record.middlename ? record.middlename : ""
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
        return getStatus(text, record.declined);
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      align: "right",
      render: (text, record) => {
        const modiList = record.filter(item => {
          if (record.stageId !== 4 && item.key === 3) {
            return false;
          }
          return true;
        })

        return <DropDownMenu record={modiList} />
      },
    },
  ];

  let externalParams = { status: status?.value };

  return (
    <>
      <Boxed pad="20px">
        <PageTitle>Title Grant Application Requests</PageTitle>
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
                        placeholder="Search by App. no."
                        onChange={(value) => search(value, fetchActionURL)}
                      />
                    </Boxed>
                    <Boxed pad="5px 0" margin="auto 0 0 0">
                      <AsyncSelect
                        label="Status"
                        options={statusOptions}
                        onChange={(value) => setStatus(value)}
                      />
                    </Boxed>
                    <Boxed />
                    <Boxed pad="5px 0" align="right" margin="auto 0 0 0">
                      {!isProprietor && (
                        <Button onClick={() => redirect("application/create")}>
                          Create Application
                        </Button>
                      )}
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
                              <Boxed pad="10px 0">
                                <ApplicationCard record={item} />
                              </Boxed>
                            ))}
                          </Grid>
                          <Boxed pad="10px 0 ">
                            {" "}
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
