import { connect } from "dva";
import { createForm } from "rc-form";
import { OwnersEntries } from "./OwnersEntries";
import { routerRedux } from "dva/router";

const fetchActionURL = "entries/getAllOwnersEntries";

export const mapStateToProps = (state, ownProps) => {
  const { loading, entries } = state;
  const { ownersList, ownersTotal } = entries;
  const isLoading = loading.effects[fetchActionURL];
  return {
    isLoading,
    ownersList,
    ownersTotal,
    fetchActionURL,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getAllOwnersEntries(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(OwnersEntries));
