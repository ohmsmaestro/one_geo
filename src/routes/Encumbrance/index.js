import { connect } from "dva";
import { createForm } from "rc-form";
import { Encumbrance } from "./Encumbrance";
import { routerRedux } from "dva/router";
import { storagePrivilege } from "../../utils/constant";

const fetchActionURL = "entries/getAllEncumbrance";
const accessList = localStorage.getItem(storagePrivilege)
  ? JSON.parse(localStorage.getItem(storagePrivilege))
  : {};

export const mapStateToProps = (state, ownProps) => {
  const { loading, entries, auxillary } = state;
  const {
    encumbranceList,
    encumbranceTotal,
    terminateModal,
    encumbranceDetailModal,
  } = entries;
  const { defectTypes } = auxillary;
  const isLoading = loading.effects[fetchActionURL];
  return {
    isLoading,
    encumbranceList,
    encumbranceTotal,
    fetchActionURL,
    terminateModal,
    encumbranceDetailModal,
    accessList,
    defectTypes
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
