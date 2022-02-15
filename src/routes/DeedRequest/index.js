import { connect } from "dva";
import { DeedRequest } from "./DeedRequest";
import { routerRedux } from "dva/router";

let fetchActionURL = "parcels/getAllDeedRequest";

const mapStateToProps = (state, ownProps) => {
  const { loading, parcels, authentication } = state;
  const { deedList, deedTotal } = parcels;
  const isLoading = loading.effects[fetchActionURL];
  return {
    deedList,
    deedTotal,
    isLoading,
    fetchActionURL,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname, search) {
      dispatch(routerRedux.push({ pathname, search }));
    },
    getAllDeedRequest(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeedRequest);
