import { connect } from "dva";
import { landDetail } from "./LandDetail";
import { routerRedux } from "dva/router";
// import qs from "query-string";

export const mapStateToProps = (state, ownProps) => {
  const { lands, archived, loading } = state;
  const { landData } = lands;
  const { archivedList } = archived;
  const params = ownProps?.match?.params;

  const isLoading = loading.effects["lands/getSingleLand"];
  const isloadingDocuments = loading.effects["archived/getParcelArchieved"];
  return {
    landData,
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
    getSingleLand(data) {
      dispatch({ type: "land/getSingleLand", payload: data });
    },
    openFile(data) {
      dispatch({ type: "archived/readArchivedFile", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(landDetail);
