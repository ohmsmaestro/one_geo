import { connect } from "dva";
import { createForm } from "rc-form";
import { Step1 } from "./Step1";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, authentication } = state;
  const { regForm } = authentication;
  return {
    regForm,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    nextStep(data) {
      dispatch({
        type: "authentication/save",
        payload: { regForm: data, regStep: 2 },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Step1));
