import { connect } from "dva";
import { ParcelDetail } from "./ParcelDetail";
import { routerRedux } from "dva/router";
// import qs from "query-string";

export const mapStateToProps = (state, ownProps) => {
  console.log({ ownProps });
  const { parcels } = state;
  const { parcelData } = parcels;
  const params = ownProps?.match?.params;
  console.log({ params });
  return {
    parcelData,
    params,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getSingleParcel(data) {
      dispatch({ type: "parcels/getSingleParcel", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParcelDetail);
