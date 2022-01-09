import { connect } from "dva";
import { CreateApplication } from "./CreateApplication";
import { routerRedux } from "dva/router";
import { createForm } from "rc-form";

export const mapStateToProps = (state, ownProps) => {
  const { loading, auxillary } = state;
  const { stateList, requirementList } = auxillary;

  const modiStateList = stateList.map((item) => ({
    label: item.name,
    ...item,
  }));
  const modiRequirementList = requirementList.map((item) => ({
    label: item.description,
    ...item,
  }));

  const isLoading = loading.effects["parcels/postApplication"];
  const isLoadingStates = loading.effects["auxillary/getAllStates"];
  const isLoadingRequirements = loading.effects["auxillary/getAllStates"];

  return {
    isLoading,
    modiStateList,
    modiRequirementList,
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
      dispatch({ type: "parcels/postApplication", payload: data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(CreateApplication));
