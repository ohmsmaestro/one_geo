import { connect } from "dva";
import { createForm } from "rc-form";
import { ResetPassword } from "./ResetPassword";
import { routerRedux } from "dva/router";
import qs from "query-string";

export const mapStateToProps = (state, ownProps) => {
  const { token } = qs.parse(window.location.search);
  const { loading } = state;
  const loadingBtn = loading.effects["authentication/resetPassword"];
  return {
    token,
    loadingBtn,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    resetPassword(data) {
      dispatch({ type: "authentication/resetPassword", payload: data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(ResetPassword));
