import { connect } from "dva";
import { createForm } from "rc-form";
import { DetailModal } from "./DetailModal";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, entries } = state;
  const isLoading = loading.effects["entries/getEncumbranceDetail"];
  const isloadingFile = loading.effects["entries/getEncumbranceFile"];
  const { encumbranceDetailModal, entryData } = entries;
  return {
    encumbranceDetailModal,
    entryData,
    isLoading,
    isloadingFile,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getEncumbranceDetail(data) {
      dispatch({ type: "entries/getEncumbranceDetail", payload: data });
    },
    closeModal() {
      dispatch({
        type: "entries/save",
        payload: { encumbranceDetailModal: false, entryData: {} },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(DetailModal));
