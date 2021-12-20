import { connect } from "dva";
import { createForm } from "rc-form";
import { Encumbrance } from "./Encumbrance";
import { routerRedux } from "dva/router";

const fetchActionURL = "entries/getAllEncumbrance";

export const mapStateToProps = (state, ownProps) => {
  const { loading, entries } = state;
  const {
    encumbranceList,
    encumbranceTotal,
    terminateModal,
    encumbranceDetailModal,
  } = entries;
  const isLoading = loading.effects[fetchActionURL];
  return {
    isLoading,
    encumbranceList,
    encumbranceTotal,
    fetchActionURL,
    terminateModal,
    encumbranceDetailModal,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getAllEncumbrance(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
    openTerminateModal(data) {
      dispatch({
        type: "entries/save",
        payload: { entryData: data, terminateModal: true },
      });
    },
    openDetailModal(data) {
      dispatch({
        type: "entries/save",
        payload: { encumbranceDetailModal: true, entryData: data },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Encumbrance));
