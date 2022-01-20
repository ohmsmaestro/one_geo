import { connect } from "dva";
import { ParcelDetail } from "./ParcelDetail";
import { routerRedux } from "dva/router";
// import qs from "query-string";

export const mapStateToProps = (state, ownProps) => {
  const { parcels, archived, loading } = state;
  const { parcelData } = parcels;
  const { archivedList } = archived;
  const params = ownProps?.match?.params;

  const isLoading = loading.effects["parcels/getSingleParcel"];
  const isloadingDocuments = loading.effects["archived/getParcelArchieved"];
  return {
    parcelData,
    params,
    archivedList,
    isLoading,
    isloadingDocuments,
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
    openFile(data) {
      console.log({ data });
      dispatch({ type: "archived/readArchivedFile", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParcelDetail);
