import { connect } from "dva";
import { TDP } from "./TDP";
import { routerRedux } from "dva/router";
// import qs from "query-string";

export const mapStateToProps = (state, ownProps) => {
  const { parcels, loading } = state;
  const { parcelData, parcelOwner } = parcels;
  const params = ownProps?.match?.params;
  console.log({ ownProps });
  const showPrint = ownProps.showPrint;

  const isLoadingParcel = loading.effects["parcels/getSingleParcel"];
  const isLoadingOwner = loading.effects["parcels/getParcelOwner"];
  return {
    parcelData,
    parcelOwner,
    params,
    isLoadingParcel,
    isLoadingOwner,
    showPrint,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getParcelDetails(data) {
      dispatch({ type: "parcels/getSingleParcel", payload: data });
      dispatch({ type: "parcels/getParcelOwner", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TDP);
