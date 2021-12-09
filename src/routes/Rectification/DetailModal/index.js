import { connect } from "dva";
import { createForm } from "rc-form";
import { DetailModal } from "./DetailModal";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, entries } = state;
  const isLoading = loading.effects["entries/getRectificationDetail"];
  const { rectificationDetailModal, entryData } = entries;
  return {
    rectificationDetailModal,
    entryData,
    isLoading,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getRectificationDetail(data) {
      dispatch({ type: "entries/getRectificationDetail", payload: data });
    },
    closeModal() {
      dispatch({
        type: "entries/save",
        payload: { rectificationDetailModal: false, entryData: {} },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(DetailModal));
