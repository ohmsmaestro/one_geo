import { connect } from "dva";
import { Applications } from "./Applications";
import { routerRedux } from "dva/router";

const fetchActionURL = "entries/getAllApplications";

export const mapStateToProps = (state, ownProps) => {
  const { loading, entries } = state;
  const { applicationsList, applicationsTotal } = entries;
  const isLoading = loading.effects[fetchActionURL];
  return {
    isLoading,
    applicationsList,
    applicationsTotal,
    fetchActionURL,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname, search) {
      dispatch(routerRedux.push({ pathname, search }));
    },
    getAllApplications(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
