import { connect } from "dva";
import { Appraisal } from "./Appraisal";
import { routerRedux } from "dva/router";

const fetchActionURL = "parcels/getAllAppraisal";

export const mapStateToProps = (state, ownProps) => {
  const { loading, parcels } = state;
  const { appraisalList, appraisalTotal, appraisalReview } = parcels;
  const isLoading = loading.effects[fetchActionURL];

  return {
    isLoading,
    appraisalList,
    appraisalTotal,
    fetchActionURL,
    appraisalReview,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname, search) {
      dispatch(routerRedux.push({ pathname, search }));
    },
    getAllAppraisal(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
    openReviewModal(data) {
      dispatch({
        type: "parcels/save",
        payload: { appraisalReview: true, appraisalDetail: data },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Appraisal);
