import { connect } from "dva";
import { createForm } from "rc-form";
import { ForgotPassword } from "./ForgotPassword";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading } = state;
  return {};
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    forgotPassword(data) {
      dispatch({ type: "authentication/forgotPassword", payload: data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(ForgotPassword));
