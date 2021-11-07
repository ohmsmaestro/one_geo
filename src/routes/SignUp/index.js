import { connect } from "dva";
import { SignUp } from "./SignUp";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, authentication } = state;
  const isLoading = loading.effects["authentication/login"];
  const { regForm, regStep } = authentication;
  return {
    isLoading,
    regForm,
    regStep,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
