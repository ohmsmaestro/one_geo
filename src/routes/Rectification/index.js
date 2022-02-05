import { connect } from "dva";
import { createForm } from "rc-form";
import { Rectification } from "./Rectification";
import { routerRedux } from "dva/router";

import { storagePrivilege } from "../../utils/constant";

const fetchActionURL = "entries/getAllRectification";

const accessList = localStorage.getItem(storagePrivilege)
  ? JSON.parse(localStorage.getItem(storagePrivilege))
  : {};

export const mapStateToProps = (state, ownProps) => {
  const { loading, entries } = state;
  const { rectificationList, rectificationTotal, rectificationDetailModal } =
    entries;
  const isLoading = loading.effects[fetchActionURL];
  return {
    isLoading,
    rectificationList,
    rectificationTotal,
    fetchActionURL,
    rectificationDetailModal,
    accessList,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getAllRectification(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
    openDetailModal(data) {
      dispatch({
        type: "entries/save",
        payload: { rectificationDetailModal: true, entryData: data },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Rectification));
