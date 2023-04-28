import { connect } from "dva";
import { AcknowledgementLetter } from "./Acknowledgement";
import { routerRedux } from "dva/router";
// import qs from "query-string";

const fetchActionURL = "entries/getApplicationDetail";

export const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;
  const { params } = match;
  const { loading, entries, authentication } = state;
  const { applicationDetail, } = entries;
  const isLoading = loading.effects[fetchActionURL];
  const { profile, accessList } = authentication;

  console.log({ params })

  return {
    isLoading,
    applicationDetail,
    params,
    profile,
    accessList,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcknowledgementLetter);
