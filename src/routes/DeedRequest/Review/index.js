import { connect } from "dva";
import { Review } from "./Review";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, parcels } = state;
  const { parcelData, parcelOwner, deedDecisionModal, deedData, deedNewOwner } =
    parcels;

  const isLoading = loading.effects["entries/postApplication"];
  const isLoadingParcel = loading.effects["parcels/getSingleParcel"];
  const isLoadingOwner = loading.effects["parcels/getParcelOwner"];
  const isLoadingNewOwner = loading.effects["parcels/getDeedNewOwner"];

  const params = ownProps?.match?.params;

  return {
    isLoading,
    isLoadingParcel,
    isLoadingOwner,
    isLoadingNewOwner,
    parcelData,
    params,
    parcelOwner,
    deedData,
    deedDecisionModal,
    deedNewOwner,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getDeedDetails(data) {
      dispatch({ type: "parcels/getSingleDeed", payload: data });
    },
    openDecisionModal(text) {
      dispatch({ type: "parcels/save", payload: { deedDecisionModal: text } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
