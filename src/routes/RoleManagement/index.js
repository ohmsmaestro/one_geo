import { connect } from "dva";
import { createForm } from "rc-form";
import { RoleManagement } from "./RoleManagement";
import { routerRedux } from "dva/router";

const fetchActionURL = "users/getAllRoles";

export const mapStateToProps = (state, ownProps) => {
  const { loading, users } = state;
  const { rolesList, rolesTotal } = users;
  const isLoading = loading.effects[fetchActionURL];
  return {
    isLoading,
    rolesList,
    rolesTotal,
    fetchActionURL,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const redirect = (pathname, search) => {
    dispatch(routerRedux.push({ pathname, search }));
  };
  return {
    redirect,
    getAllRoles(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },

    openCreateRole() {
      dispatch({
        type: "users/save",
        payload: { roleData: {}, roleEditMode: false },
      });
      redirect("/role-management/role");
    },
    openEditRole(data) {
      let list = [];

      data?.permissions?.forEach((item) => {
        item.privileges.forEach((permission) => {
          list.push({ id: permission.id, pageId: item.pageId });
        });
      });

      dispatch({
        type: "users/save",
        payload: {
          roleData: { ...data, allPrivileges: list },
          roleEditMode: true,
        },
      });
      redirect("/role-management/role");
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(RoleManagement));
