import { connect } from "dva";
import { createForm } from "rc-form";
import { RectificationModal } from "./RectificationModal";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, parcels } = state;
  const isLoading = loading.effects["parcels/createRectification"];
  const { rectificationModal, parcelData } = parcels;
  return {
    rectificationModal,
    parcelData,
    isLoading,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    createRectification(data) {
      dispatch({ type: "parcels/createRectification", payload: data });
    },
    closeModal() {
      dispatch({
        type: "parcels/save",
        payload: { rectificationModal: false, parcelData: {} },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(RectificationModal));
