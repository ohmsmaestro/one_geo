import { connect } from "dva";
import { CreateApplication } from "./CreateApplication";
import { routerRedux } from "dva/router";
import { createForm } from "rc-form";

export const mapStateToProps = (state, ownProps) => {
  const { loading, auxillary, entries } = state;
  const { stateList, requirementList } = auxillary;

  const modiStateList = stateList.map((item) => ({
    ...item,
    label: item.name,
    value: item.id,
  }));

  const isLoading = loading.effects["entries/postApplication"];
  const isLoadingStates = loading.effects["auxillary/getAllStates"];
  const isLoadingRequirements = loading.effects["auxillary/getAllStates"];

  return {
    isLoading,
    modiStateList,
    requirementList,
    isLoadingStates,
    isLoadingRequirements,
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

    getAllRequirements(data) {
      dispatch({ type: "auxillary/getAllRequirements", payload: data });
    },

    postApplication(data) {
      dispatch({ type: "entries/postApplication", payload: data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(CreateApplication));
