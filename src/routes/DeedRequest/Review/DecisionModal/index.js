import { connect } from "dva";
import { createForm } from "rc-form";
import { DecisionModal } from "./DecisionModal";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, parcels } = state;
  const isLoading = loading.effects["parcels/approveApplication"];
  const { deedDecisionModal, deedData } = parcels;
  return {
    isLoading,
    deedDecisionModal,
    deedData,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    closeModal() {
      dispatch({
        type: "parcels/save",
        payload: { deedDecisionModal: false },
      });
    },
    approveReview(data) {
      dispatch({ type: "parcels/approveDeed", payload: data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(DecisionModal));
