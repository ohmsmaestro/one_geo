import { connect } from "dva";
import { CreateApplication } from "./CreateApplication";
import { routerRedux } from "dva/router";
import { createForm } from "rc-form";
import qs from 'query-string';
import { ASSIGN_MODE } from "../../../utils/constant";

export const mapStateToProps = (state, ownProps) => {
  const { loading, auxillary, parcels } = state;
  const { stateList, requirementList } = auxillary;
  const { parcelData } = parcels

  const modiStateList = stateList.map((item) => ({
    ...item,
    label: item.name,
    value: item.id,
  }));

  const isLoading = loading.effects["entries/postApplication"];
  const isLoadingStates = loading.effects["auxillary/getAllStates"];
  const isLoadingRequirements = loading.effects["auxillary/getAllStates"];

  const { match, mode } = ownProps;
  const { params } = match

  return {
    isLoading,
    modiStateList,
    requirementList,
    isLoadingStates,
    isLoadingRequirements,
    params: {
      ...params,
      isAssignMode: mode === ASSIGN_MODE
    },
    parcelData
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },

    fetchStates() {
      dispatch({ type: "auxillary/getAllStates" });
    },

    getParcelDetail(parcelNumber) {
      console.log({ parcelNumber })
      dispatch({ type: 'parcels/getSingleParcel', payload: { search: parcelNumber, size: 10, page: 1 } })
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
