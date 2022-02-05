import { connect } from "dva";
import { createForm } from "rc-form";
import { DecisionModal } from "./DecisionModal";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, entries } = state;
  const isLoading = loading.effects["entries/approveApplication"];
  const { applicationDetail, decisionModal } = entries;
  return {
    applicationDetail,
    isLoading,
    decisionModal,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    closeModal() {
      dispatch({
        type: "entries/save",
        payload: { decisionModal: false },
      });
    },
    approveApplicationReview(data) {
      dispatch({ type: "entries/approveApplication", payload: data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(DecisionModal));
