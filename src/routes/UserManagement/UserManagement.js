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

import CreateModal from "./CreateModal/index";

export const UserManagement = (props) => {
  // state props
  const { isLoading, usersList, usersTotal, fetchActionURL, accessList } =
    props;

  // dispatch props
  const { getAllUsers, openCreateModal, redirect } = props;

  useEffect(() => {
    if (accessList["VIEW_USER"]) {
      let data = {
        page: 1,
        size: 10,
      };
      getAllUsers(data);
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
            <Dropdown.Item>View Profile</Dropdown.Item>
            {accessList["EDIT_USER"] && (
              <Dropdown.Item>Edit Profile</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </StyledDrpDown>
    );
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (text, record) =>
        `${record?.firstname} ${record?.middlename} ${record?.lastname}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No.",
      dataIndex: "phone",
      key: "phone",
    },
    // {
    //   title: "Department",
    //   dataIndex: "department",
    //   align: "center",
    //   key: "department",
    // },
    {
      title: "Role",
      dataIndex: "rolename",
      key: "rolename",
    },
    // {
    //   title: "Created Date",
    //   dataIndex: "created_at",
    //   key: "created_at",
    //   render: (text) => text && formatDate(text),
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
        <PageTitle>Users Management</PageTitle>
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
                        placeholder="Search by name, email & phone"
                        onChange={(value) => search(value, fetchActionURL)}
                      />
                    </Boxed>
                    <Boxed />
                    <Boxed />
                    {accessList["CREATE_USER"] && (
                      <Boxed pad="5px 0" align="right">
                        <Button onClick={() => openCreateModal()}>
                          Add User
                        </Button>
                      </Boxed>
                    )}
                  </Grid>
                  {isLoading ? (
                    <Boxed display="flex" pad="20px">
                      <Loader margin="auto" />
                    </Boxed>
                  ) : (
                    <>
                      {" "}
                      {usersTotal > 0 ? (
                        <>
                          <TableComponent columns={columns} data={usersList} />
                          <Boxed pad="10px 0 ">
                            <PaginationComponent
                              total={usersTotal}
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
                                return `${range[0]} - ${range[1]} of ${usersTotal} items`;
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
      <CreateModal />
    </>
  );
};
