import { connect } from "dva";
import { createForm } from "rc-form";
import { AllocateModal } from "./AllocateModal";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, lands, entries } = state;
  const isLoading = loading.effects["entries/allocateParcel"];
  const isSearching = loading.effects["lands/getAllLands"];
  const { landsList } = lands;
  const { allocateModal, applicationDetail } = entries;

  const modiParcelList = landsList?.map((item) => ({
    ...item,
    label: item.parcelNumber,
    value: item.id,
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
    searchLands(data) {
      dispatch({ type: "lands/getAllLands", payload: data });
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
