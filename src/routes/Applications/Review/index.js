import { connect } from "dva";
import { Review } from "./Review";
import { routerRedux } from "dva/router";
import { storagePrivilege } from "../../../utils/constant";

const fetchActionURL = "entries/getApplicationDetail";
const accessList = localStorage.getItem(storagePrivilege)
  ? JSON.parse(localStorage.getItem(storagePrivilege))
  : {};

export const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;
  const { loading, entries, parcels, authentication } = state;
  const { applicationDetail, decisionModal, allocateModal } = entries;
  const isLoading = loading.effects[fetchActionURL];
  const { params } = match;
  const { parcelsList } = parcels;
  const parcelData = parcelsList[0] ? parcelsList[0] : {};
  const { profile } = authentication;

  return {
    isLoading,
    applicationDetail,
    params,
    decisionModal,
    allocateModal,
    parcelData,
    profile,
    accessList,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getApplicationDetail(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
    openDecisionModal(data) {
      dispatch({ type: "entries/save", payload: { decisionModal: data } });
    },
    openAllocateModal() {
      dispatch({ type: "entries/save", payload: { allocateModal: true } });
    },
    openApplicationFile(data) {
      dispatch({ type: "archived/getApplicationFile", payload: data });
    },
    searchParcels(data) {
      dispatch({ type: "parcels/getAllParcels", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
