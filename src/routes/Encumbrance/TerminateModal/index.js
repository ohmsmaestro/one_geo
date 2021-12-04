import { connect } from "dva";
import { createForm } from "rc-form";
import { TerminateModal } from "./TerminateModal";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, entries } = state;
  const isLoading = loading.effects["entries/terminateEncumbrance"];
  const { terminateModal, entryData } = entries;
  return {
    terminateModal,
    entryData,
    isLoading,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    terminateEncumbrance(data) {
      dispatch({ type: "entries/terminateEncumbrance", payload: data });
    },
    closeModal() {
      dispatch({
        type: "entries/save",
        payload: { terminateModal: false, entryData: {} },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(TerminateModal));
