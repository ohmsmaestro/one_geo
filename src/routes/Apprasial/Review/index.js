import { connect } from "dva";
import { Review } from "./Review";
import { routerRedux } from "dva/router";
import { createForm } from "rc-form";

export const mapStateToProps = (state, ownProps) => {
  const { loading, parcels } = state;
  const { appraisalReview, appraisalDetail } = parcels;
  const isLoading = loading.effects["parcels/approveAppraisal"];
  return {
    appraisalReview,
    appraisalDetail,
    isLoading,
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
        payload: { appraisalReview: false },
      });
    },
    approveApprasial(data) {
      dispatch({
        type: "parcels/approveAppraisal",
        payload: data,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Review));
