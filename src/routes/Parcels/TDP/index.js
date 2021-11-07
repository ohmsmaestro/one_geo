import { connect } from "dva";
import { TDP } from "./TDP";
import { routerRedux } from "dva/router";
// import qs from "query-string";

export const mapStateToProps = (state, ownProps) => {
  const { parcels } = state;
  const { parcelData } = parcels;

  const search = window?.location?.search;
  return {
    search,
    parcelData,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TDP);
