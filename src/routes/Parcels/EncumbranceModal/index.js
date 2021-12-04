import { connect } from "dva";
import { createForm } from "rc-form";
import { EncumbranceModal } from "./EncumbranceModal";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, parcels } = state;
  const isLoading = loading.effects["parcels/createEncumbrance"];
  const { encumbranceModal, parcelData } = parcels;
  return {
    encumbranceModal,
    parcelData,
    isLoading,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    createEncumbrance(data) {
      dispatch({ type: "parcels/createEncumbrance", payload: data });
    },
    closeModal() {
      dispatch({
        type: "parcels/save",
        payload: { encumbranceModal: false, parcelData: {} },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(EncumbranceModal));
