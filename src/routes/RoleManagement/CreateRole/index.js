import { connect } from "dva";
import { createForm } from "rc-form";
import { CreateRole } from "./CreateRole";
import { routerRedux } from "dva/router";
import qs from "query-string";

export const mapStateToProps = (state, ownProps) => {
  const { loading, users } = state;
  const { roleData, permissionList, roleEditMode } = users;
  const isLoading = loading.effects["users/getAllPermissions"];
  const isLoadingCreate = loading.effects["users/postCreateRole"];
  const isLoadingEdit = loading.effects["users/postCreateRole"];
  const params = qs.parse(window.location.search);
  return {
    isLoading,
    roleData,
    params,
    permissionList,
    roleEditMode,
    isLoadingCreate,
    isLoadingEdit,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname, search) {
      dispatch(routerRedux.push({ pathname, search }));
    },
    getAllPermissions(data) {
      dispatch({ type: "users/getAllPermissions", payload: data });
    },
    postCreateRole(data) {
      dispatch({ type: "users/postCreateRole", payload: data });
    },
    putEditRole(data) {
      dispatch({ type: "users/putEditRole", payload: data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(CreateRole));
