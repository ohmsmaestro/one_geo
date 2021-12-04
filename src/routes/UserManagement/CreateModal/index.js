import { connect } from "dva";
import { createForm } from "rc-form";
import { CreateModal } from "./CreateModal";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, users } = state;
  const isLoading = loading.effects["users/postCreateUser"];
  const { createUserModal, rolesList } = users;
  return {
    createUserModal,
    rolesList,
    isLoading,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getAllRoles(data) {
      dispatch({ type: "users/getAllRoles", payload: data });
    },
    createUser(data) {
      dispatch({ type: "users/postCreateUser", payload: data });
    },
    closeModal() {
      dispatch({
        type: "users/save",
        payload: { createUserModal: false, usersData: {} },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(CreateModal));
