import { connect } from "dva";
import { createForm } from "rc-form";
import { AllocateModal } from "./AllocateModal";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, parcels, entries } = state;
  const isLoading = loading.effects["entries/allocateParcel"];
  const isSearching = loading.effects["parcels/getAllParcels"];
  const { parcelsList } = parcels;
  const { allocateModal, applicationDetail } = entries;

  const modiParcelList = parcelsList?.map((item) => ({
    label: item.ParcelNumber,
    ...item,
  }));

  return {
    allocateModal,
    isLoading,
    modiParcelList,
    applicationDetail,
    isSearching,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    searchParcels(data) {
      dispatch({ type: "parcels/getAllParcels", payload: data });
    },
    allocateParcel(data) {
      dispatch({ type: "entries/allocateParcel", payload: data });
    },
    closeModal() {
      dispatch({
        type: "entries/save",
        payload: { allocateModal: false, parcelData: {} },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(AllocateModal));
