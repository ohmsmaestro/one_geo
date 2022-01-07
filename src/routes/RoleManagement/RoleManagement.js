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
import { PageTitle, Icon, StyledDrpDown } from "../../components/style";

import { calcViewMode } from "../../utils/utils";
import { Theme } from "../../utils/theme";

export const RoleManagement = (props) => {
  // state props
  const { isLoading, rolesList, rolesTotal, fetchActionURL, accessList } =
    props;

  // dispatch props
  const { getAllRoles, redirect, openCreateRole, openEditRole } = props;

  useEffect(() => {
    if (accessList["VIEW_ROLE"] || true) {
      let data = {
        page: 1,
        size: 10,
      };
      getAllRoles(data);
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
            <Dropdown.Item>View Details</Dropdown.Item>
            <Dropdown.Item onClick={() => openEditRole(record)}>
              Edit Details
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </StyledDrpDown>
    );
  };

  const columns = [
    {
      title: "role name",
      dataIndex: "role_name",
      key: "role_name",
    },
    {
      title: "Parcel No.",
      dataIndex: "parcel_number",
      key: "parcel_number",
    },
    {
      title: "No. of Users",
      dataIndex: "users_count",
      key: "users_count",
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
        <PageTitle>Role Management</PageTitle>
        <Boxed pad="20px 10px">
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
                      <Input type="search" placeholder="Search by name" />
                    </Boxed>
                    <Boxed />
                    <Boxed />
                    <Boxed pad="5px 0" display="flex">
                      <Button
                        margin="auto 0 auto auto"
                        onClick={() => openCreateRole()}
                      >
                        Create Role
                      </Button>
                    </Boxed>
                  </Grid>
                  {isLoading ? (
                    <Boxed display="flex" pad="20px">
                      <Loader margin="auto" />
                    </Boxed>
                  ) : (
                    <>
                      {rolesTotal > 0 ? (
                        <>
                          <Grid
                            desktop="repeat(4, 1fr)"
                            tablet="repeat(3, 1fr)"
                            mobile="repeat(1,fr)"
                            pad="10px 0"
                          >
                            {rolesList &&
                              rolesList.map((item, index) => {
                                return (
                                  <Boxed
                                    key={index}
                                    margin="5px"
                                    pad="8px 10px"
                                    display="flex"
                                    boxShadow={Theme.PrimaryShadow}
                                    borderRadius={Theme.PrimaryRadius}
                                    background={Theme.TertiaryDark}
                                  >
                                    <Text> {item.name} </Text>
                                    <Boxed margin="auto 0 auto auto">
                                      <DropDownMenu record={item} />
                                    </Boxed>
                                  </Boxed>
                                );
                              })}
                          </Grid>
                          <Boxed pad="10px 0 ">
                            {/* <PaginationComponent
                              total={rolesTotal}
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
                                return `${range[0]} - ${range[1]} of ${rolesTotal} items`;
                              }}
                            /> */}
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
