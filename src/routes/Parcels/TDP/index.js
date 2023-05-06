import { connect } from "dva";
import { TDP } from "./TDP";
import { routerRedux } from "dva/router";
// import qs from "query-string";

export const mapStateToProps = (state, ownProps) => {
  const { lands, loading, entries, parcels } = state;
  const { tdpData, landData } = lands;
  const params = ownProps?.match?.params;
  const showPrint = ownProps.showPrint;
  const isLoading = loading.effects['lands/fetchTDP'];
  const { ownersDetail } = entries;
  const { parcelData } = parcels;
  return {
    tdpData,
    params,
    showPrint,
    isLoading,
    landData,
    ownersDetail,
    parcelData,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    fetchTDP(data) {
      // dispatch({ type: 'lands/fetchTDP', payload: data })
    },
    getSingleLand(data) {
      dispatch({ type: "lands/getSingleLand", payload: data });
      dispatch({ type: 'parcels/getSingleParcel', payload: data });
    },
    getLandOwner(data) {
      dispatch({ type: 'entries/getLandOwner', payload: data })
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TDP);
