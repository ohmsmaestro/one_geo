import { connect } from "dva";
import { CreateDeedRequest } from "./CreateDeedRequest";
import { routerRedux } from "dva/router";
import { createForm } from "rc-form";

export const mapStateToProps = (state, ownProps) => {
  const { loading, auxillary, parcels } = state;
  const { stateList, requirementList, deedTypes, } = auxillary;
  const { parcelData, parcelOwner } = parcels;

  const modiStateList = stateList.map((item) => ({
    label: item.name,
    ...item,
  }));

  const isLoading = loading.effects["parcels/postDeepRequest"];
  const isLoadingStates = loading.effects["auxillary/getAllStates"];
  const isLoadingDeedTypes = loading.effects["auxillary/getAllDeedTypes"];
  const isLoadingRequirements = loading.effects["auxillary/getAllRequirements"];
  const isLoadingParcel = loading.effects["parcels/getSingleParcel"];
  const isLoadingOwner = loading.effects["parcels/getParcelOwner"];

  const params = ownProps?.match?.params;

  return {
    modiStateList,
    requirementList,
    isLoading,
    isLoadingStates,
    isLoadingRequirements,
    isLoadingParcel,
    isLoadingOwner,
    parcelData,
    params,
    parcelOwner,
    isLoadingDeedTypes,
    deedTypes,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getSingleParcel(data) {
      dispatch({ type: "parcels/getSingleParcel", payload: data });
      dispatch({ type: "parcels/getParcelOwner", payload: data });
    },

    fetchStates() {
      dispatch({ type: "auxillary/getAllStates" });
    },
    fetchDeedTypes(){
      dispatch({ type: "auxillary/getAllDeedTypes" });
    },

    getAllRequirements(data) {
      dispatch({ type: "auxillary/getAllRequirements", payload: data });
    },

    postDeepRequest(data) {
      dispatch({ type: "parcels/postDeepRequest", payload: data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(CreateDeedRequest));
