import { connect } from "dva";
import { Review } from "./Review";
import { routerRedux } from "dva/router";
import { storagePrivilege } from "../../../utils/constant";

const fetchActionURL = "entries/getApplicationDetail";

export const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;
  const { params } = match;
  const { loading, entries, lands, authentication } = state;
  const { applicationDetail, decisionModal, allocateModal } = entries;
  const isLoading = loading.effects[fetchActionURL];

  const { landData } = lands;
  const { profile, accessList } = authentication;

  return {
    isLoading,
    applicationDetail,
    params,
    decisionModal,
    allocateModal,
    landData,
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
    getSingleLand(data) {
      dispatch({ type: "lands/getSingleLand", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
