import { connect } from "dva";
import { AcceptanceLetter } from "./Acceptance";
import { routerRedux } from "dva/router";
// import qs from "query-string";

const fetchActionURL = "entries/getApplicationDetail";

export const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;
  const { params } = match;
  const { loading, entries, authentication, lands } = state;
  const { applicationDetail, } = entries;
  const { landData } = lands
  const isLoading = loading.effects[fetchActionURL];
  const { profile, accessList } = authentication;

  return {
    isLoading,
    applicationDetail,
    params,
    profile,
    accessList,
    landData,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getApplicationDetail(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
    getSingleLand(data) {
      dispatch({ type: "lands/getSingleLand", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcceptanceLetter);
