import { connect } from "dva";
import { Review } from "./Review";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, parcels } = state;
  const { parcelData, parcelOwner, deedDecisionModal, deedData } = parcels;

  const isLoading = loading.effects["entries/postApplication"];
  const isLoadingParcel = loading.effects["parcels/getSingleParcel"];
  const isLoadingOwner = loading.effects["parcels/getParcelOwner"];

  const params = ownProps?.match?.params;

  return {
    isLoading,
    isLoadingParcel,
    isLoadingOwner,
    parcelData,
    params,
    parcelOwner,
    deedData,
    deedDecisionModal,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getDeedDetails(data) {
      dispatch({ type: "parcels/getSingleParcel", payload: data });
      dispatch({ type: "parcels/getParcelOwner", payload: data });
      dispatch({ type: "parcels/getSingleDeed", payload: data });
    },
    openDecisionModal(text) {
      dispatch({ type: "parcels/save", payload: { deedDecisionModal: text } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
