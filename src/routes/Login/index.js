import { connect } from "dva";
import { createForm } from "rc-form";
import { Login } from "./Login";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading } = state;
  const isLoading = loading.effects["authentication/login"];
  return {
    isLoading,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    login(data) {
      dispatch({ type: "authentication/login", payload: data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Login));
