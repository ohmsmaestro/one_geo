import { connect } from "dva";
import { createForm } from "rc-form";
import { Step2 } from "./Step2";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, authentication } = state;
  const isLoading = loading.effects["authentication/signup"];
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
    registerAccount(data) {
      dispatch({
        type: "authentication/signup",
        payload: data,
      });
    },
    goBack() {
      dispatch({ type: "authentication/save", payload: { regStep: 1 } });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Step2));
