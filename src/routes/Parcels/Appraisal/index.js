import { connect } from "dva";
import { createForm } from "rc-form";
import { Appraisal } from "./Appraisal";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, parcels } = state;
  const isLoading = loading.effects["parcels/createAppraisal"];
  const { appraisalModal } = parcels;
  return {
    appraisalModal,
    isLoading,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    createAppraisal(data) {
      dispatch({ type: "parcels/createAppraisal", payload: data });
    },
    closeModal() {
      dispatch({
        type: "parcels/save",
        payload: { appraisalModal: false, parcelData: {} },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Appraisal));
