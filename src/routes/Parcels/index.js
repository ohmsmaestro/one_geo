import { connect } from "dva";
import { createForm } from "rc-form";
import { Parcels } from "./Parcels";
import { routerRedux } from "dva/router";

const fetchActionURL = "parcels/getAllParcels";

export const mapStateToProps = (state, ownProps) => {
  const { loading, parcels } = state;
  const {
    parcelsList,
    parcelsTotal,
    rentModal,
    appraisalModal,
    encumbranceModal,
    rectificationModal,
  } = parcels;
  const isLoading = loading.effects[fetchActionURL];
  return {
    isLoading,
    parcelsList,
    parcelsTotal,
    rentModal,
    appraisalModal,
    fetchActionURL,
    encumbranceModal,
    rectificationModal,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const redirect = (pathname, search) => {
    dispatch(routerRedux.push({ pathname, search }));
  };
  return {
    redirect,
    getAllParcels(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
    viewTDP(data) {
      dispatch({ type: "parcels/save", payload: { parcelData: data } });
      redirect(`/parcels/tdp`, `?tdp=${data.ParcelNumber}`);
    },
    rentParcel(data) {
      dispatch({
        type: "parcels/save",
        payload: { rentModal: true, parcelData: data },
      });
    },
    appraisalParcel(data) {
      dispatch({
        type: "parcels/save",
        payload: { appraisalModal: true, parcelData: data },
      });
    },
    openEncumbranceModal(data) {
      dispatch({
        type: "parcels/save",
        payload: { encumbranceModal: true, parcelData: data },
      });
    },
    openRectificationModal(data) {
      dispatch({
        type: "parcels/save",
        payload: {
          rectificationModal: true,
          parcelData: data,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Parcels));
