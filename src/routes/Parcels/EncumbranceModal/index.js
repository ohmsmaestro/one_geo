import { connect } from "dva";
import { createForm } from "rc-form";
import { EncumbranceModal } from "./EncumbranceModal";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, parcels, auxillary } = state;
  const isLoading = loading.effects["parcels/createEncumbrance"];
  const { encumbranceModal, parcelData } = parcels;
  const { defectTypes } = auxillary
  return {
    encumbranceModal,
    parcelData,
    isLoading,
    defectTypes
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getAllDefectTypes() {
      dispatch({ type: 'auxillary/getAllDefectTypes' })
    },
    createDefect(data) {
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
