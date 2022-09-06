import { connect } from "dva";
import { createForm } from "rc-form";
import { Parcels } from "./Parcels";
import { routerRedux } from "dva/router";

let fetchActionURL = "parcels/getAllParcels";

export const mapStateToProps = (state, ownProps) => {
  const { loading, parcels, authentication } = state;
  const { profile, accessList } = authentication;
  profile?.isProprietor && (fetchActionURL = "parcels/getAllMyParcels");
  const {
    parcelsList,
    parcelsTotal,
    rentModal,
    appraisalModal,
    encumbranceModal,
    rectificationModal,
    applicationFormModal, assignOwnerModal,
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
    accessList,
    profile,
    applicationFormModal,
    assignOwnerModal,
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
      redirect(`/parcels/tdp`, `?tdp=${data.FID}`);
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
    openApplicationFormModal(data) {
      dispatch({ type: 'parcels/save', payload: { applicationFormModal: true, parcelData: data } })
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
    openAssignOwnerModal(data) {
      dispatch({
        type: "parcels/save",
        payload: { assignOwnerModal: true, parcelData: data },
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Parcels));
