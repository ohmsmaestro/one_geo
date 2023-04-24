import { connect } from "dva";
import { LandDetail } from "./LandDetail";
import { routerRedux } from "dva/router";
// import qs from "query-string";

export const mapStateToProps = (state, ownProps) => {
  const { lands, archived, loading, entries } = state;
  const { landData, subsequentTransList } = lands;
  const { archivedList } = archived;
  const { ownersDetail } = entries
  const params = ownProps?.match?.params;

  const isLoading = loading.effects["lands/getSingleLand"];
  const isloadingDocuments = loading.effects["archived/getParcelArchieved"];
  const isloadingSubsequentTrans = loading.effects['lands/getSubsequentTrans'];
  return {
    landData,
    params,
    archivedList,
    isLoading,
    isloadingDocuments,
    isloadingSubsequentTrans,
    ownersDetail,
    subsequentTransList,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getSingleLand(data) {
      // dispatch({ type: "lands/getSingleLand", payload: data });
    },
    openFile(data) {
      dispatch({ type: "archived/readArchivedFile", payload: data });
    },
    getLandDetails(data) {
      dispatch({ type: "archived/getParcelArchieved", payload: { ParcelNumber: data.parcelNumber } });
      dispatch({ type: "lands/fetchSubsequentTransById", payload: { parcelNumber: data.parcelNumber } });
    },
    getLandOwner(data) {
      dispatch({ type: 'entries/getLandOwner', payload: data })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandDetail);
