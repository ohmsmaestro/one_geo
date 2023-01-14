import { connect } from "dva";
import { createForm } from "rc-form";
import { Archived } from "./Archived";
import { routerRedux } from "dva/router";

const fetchActionURL = "archived/getParcelArchieved";

const mapStateToProps = (state, ownProps) => {
  const { loading, archived, parcels } = state;
  const { archivedList, archivedTotal } = archived;
  const { parcelData } = parcels
  const isLoading = loading.effects[fetchActionURL];
  return {
    isLoading,
    archivedList,
    archivedTotal: archivedList.length,
    fetchActionURL,
    parcelData,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname, search) {
      dispatch(routerRedux.push({ pathname, search }));
    },
    getAllArchived(data) {
      dispatch({ type: fetchActionURL, payload: data });
      // dispatch({ type: "parcels/getSingleParcel", payload: data });
    },
    openFile(data) {
      console.log({ data });
      dispatch({ type: "archived/readArchivedFile", payload: data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Archived));
