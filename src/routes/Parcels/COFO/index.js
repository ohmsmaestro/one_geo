import { connect } from "dva";
import { COFO } from "./COFO";
import { routerRedux } from "dva/router";
// import qs from "query-string";

export const mapStateToProps = (state, ownProps) => {
  const { parcels, loading, lands, entries } = state;
  const params = ownProps?.match?.params;

  const { landData } = lands;
  const { ownersDetail } = entries;

  const isLoadingParcel = loading.effects["lands/getSingleLand"];
  const isLoadingOwner = loading.effects["entries/getLandOwner"];
  return {
    params,
    isLoadingParcel,
    isLoadingOwner,
    landData,
    ownersDetail,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getSingleLand(data) {
      dispatch({ type: "lands/getSingleLand", payload: data });
    },
    getLandOwner(data) {
      dispatch({ type: 'entries/getLandOwner', payload: data })
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(COFO);
