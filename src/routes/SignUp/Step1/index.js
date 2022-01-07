import { connect } from "dva";
import { createForm } from "rc-form";
import { Step1 } from "./Step1";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, authentication, auxillary } = state;
  const { regForm } = authentication;
  const { stateList } = auxillary;
  const modiStateList = stateList.map((item) => ({
    label: item.name,
    ...item,
  }));
  return {
    regForm,
    modiStateList,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    fetchStates(data) {
      dispatch({ type: "auxillary/getAllStates" });
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
