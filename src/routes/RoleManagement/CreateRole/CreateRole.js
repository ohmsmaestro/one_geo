import React, { useEffect, useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";

import { Grid } from "../../../components/Grid.components";
import { Boxed } from "../../../components/Boxed.components";
import { Checkbox, Input } from "../../../components/Input.components";
import { Text } from "../../../components/Text.components";
import { Button } from "../../../components/Button.components";
import { Loader } from "../../../components/Loader.components";
import { EmptyState } from "../../../components/EmptyState.components";
import {
  TableComponent,
  PaginationComponent,
} from "../../../components/Table.components";
import { PageTitle, Icon, StyledDrpDown, HR } from "../../../components/style";

import { calcViewMode, formatDate } from "../../../utils/utils";
import { pageOptions } from "../../../utils/constant";
import { Theme } from "../../../utils/theme";
import { Alert } from "../../../components/Alert.components";

export const CreateRole = (props) => {
  // state props
  const {
    isLoading,
    roleData,
    permissionList,
    roleEditMode,
    isLoadingCreate,
    isLoadingEdit,
  } = props;

  const role_name = roleEditMode ? roleData.name : "";
  const selected_permission = roleEditMode ? roleData.privileges : [];

  // dispatch props
  const { getAllPermissions, redirect, postCreateRole, putEditRole } = props;

  const [roleName, setRoleName] = useState(role_name);
  const [selectedPermissions, setSelectedPermission] =
    useState(selected_permission);

  useEffect(() => {
    getAllPermissions();
  }, []);

  let viewMode = calcViewMode();

  const handleSelect = (page_id, type) => {
    const newList = [...selectedPermissions];
    let pageExist = newList.findIndex((item) => item.pageId === page_id);

    // Check if permission group exist
    if (pageExist > -1) {
      let permission = newList[pageExist];
      // check if permission is active in the group
      if (permission[type]) {
        permission[type] = false;
      } else {
        permission[type] = true;
      }
      setSelectedPermission(newList);
    } else {
      let data = { pageId: page_id, c: false, r: false, u: false, d: false };
      data[type] = true;
      setSelectedPermission((prev) => [...prev, data]);
    }
  };

  const onCreateAction = () => {
    if (roleName) {
      const data = {
        name: roleName,
        privileges: [...selectedPermissions],
      };
      postCreateRole(data);
    } else {
      Alert.error("Role name is required");
    }
  };

  const onEditAction = () => {
    if (roleName && roleEditMode) {
      const data = {
        id: roleData.id,
        name: roleName,
        privileges: [...selectedPermissions],
      };
      putEditRole(data);
    } else {
      Alert.error("Role name is required");
    }
  };

  console.log({ roleData });
  return (
    <>
      <Boxed pad="20px">
        <PageTitle>{roleEditMode ? "Edit" : "Create"} Role</PageTitle>

        {isLoading ? (
          <Boxed pad="20px" display="flex">
            <Loader margin="auto" />
          </Boxed>
        ) : (
          <Boxed>
            <Grid
              desktop="300px auto"
              tablet="230px auto"
              mobile="repeat(1, 1fr)"
            >
              <Boxed pad="10px 0">
                <Boxed display="flex" pad="10px 0">
                  <Button
                    margin="0 0 0 auto"
                    clear
                    color={Theme.SecondaryTextColor}
                    onClick={() => redirect("/role-management")}
                  >
                    Back
                  </Button>

                  {roleEditMode ? (
                    <Button
                      progress={isLoadingEdit}
                      disabled={isLoadingEdit}
                      onClick={() => onEditAction()}
                    >
                      Edit Role
                    </Button>
                  ) : (
                    <Button
                      progress={isLoadingCreate}
                      disabled={isLoadingCreate}
                      onClick={() => onCreateAction()}
                    >
                      Create Role
                    </Button>
                  )}
                </Boxed>

                <Input
                  label="Role Name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
              </Boxed>
              <Boxed>
                {permissionList &&
                  permissionList.map((item, index) => {
                    let existIndex = selectedPermissions.findIndex(
                      (permission) => permission.pageId === item.name
                    );
                    let group = {};
                    if (existIndex > -1) {
                      group = {
                        c: selectedPermissions[existIndex]?.c,
                        r: selectedPermissions[existIndex]?.r,
                        u: selectedPermissions[existIndex]?.u,
                        d: selectedPermissions[existIndex]?.d,
                      };
                    }
                    console.log({ group });
                    return (
                      <Boxed
                        key={index}
                        borderRadius={Theme.PrimaryRadius}
                        background={Theme.TertiaryDark}
                        pad="20px 15px"
                        margin="10px 0"
                        boxShadow={Theme.PrimaryShadow}
                      >
                        <Text>{item.name}</Text>
                        <HR />
                        <Grid
                          desktop="repeat(4, 1fr)"
                          tablet="repeat(4, 1fr)"
                          mobile="repeat(2, 1fr)"
                        >
                          <Boxed pad="10px 5px">
                            <Checkbox
                              label="View"
                              checked={group["r"]}
                              onClick={() => handleSelect(item.id, "r")}
                            />
                          </Boxed>
                          <Boxed pad="10px 5px">
                            <Checkbox
                              label="Create"
                              checked={group["c"]}
                              onClick={() => handleSelect(item.id, "c")}
                            />
                          </Boxed>
                          <Boxed pad="10px 5px">
                            <Checkbox
                              label="Edit"
                              checked={group["u"]}
                              onClick={() => handleSelect(item.id, "u")}
                            />
                          </Boxed>
                          <Boxed pad="10px 5px">
                            <Checkbox
                              label="Delete"
                              checked={group["d"]}
                              onClick={() => handleSelect(item.id, "d")}
                            />
                          </Boxed>
                        </Grid>
                      </Boxed>
                    );
                  })}
              </Boxed>
            </Grid>
          </Boxed>
        )}
      </Boxed>
    </>
  );
};
