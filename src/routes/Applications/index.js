import { connect } from "dva";
import { Applications } from "./Applications";
import { routerRedux } from "dva/router";

let fetchActionURL = "entries/getAllApplications";

export const mapStateToProps = (state, ownProps) => {
  const { loading, entries, authentication } = state;
  const { profile } = authentication;
  const isProprietor = profile?.isProprietor;
  isProprietor && (fetchActionURL = "entries/getAllMyApplications");
  const isLoading = loading.effects[fetchActionURL];
  const { applicationsList, applicationsTotal } = entries;
  return {
    isLoading,
    applicationsList,
    applicationsTotal,
    fetchActionURL,
    isProprietor,
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
