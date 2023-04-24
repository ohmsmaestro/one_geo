import { connect } from "dva";
import { createForm } from "rc-form";
import { UserManagement } from "./UserManagement";
import { routerRedux } from "dva/router";

import { storagePrivilege } from "../../utils/constant";

const fetchActionURL = "users/getAllUsers";

export const mapStateToProps = (state, ownProps) => {
  const { loading, users } = state;
  const { usersList, usersTotal, createUserModal } = users;
  const isLoading = loading.effects[fetchActionURL];

  const accessList = localStorage.getItem(storagePrivilege)
    ? JSON.parse(localStorage.getItem(storagePrivilege))
    : {};

  return {
    isLoading,
    usersList,
    usersTotal,
    fetchActionURL,
    accessList,
    createUserModal,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getAllUsers(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
    openCreateModal() {
      dispatch({ type: "users/save", payload: { createUserModal: true } });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(UserManagement));
