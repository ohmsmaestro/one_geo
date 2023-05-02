import { connect } from "dva";
import { createForm } from "rc-form";
import { CreateLandForm } from "./CreateLand";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, authentication, auxillary, lands } = state;
  const { profile } = authentication;
  const isLoading = loading.effects['lands/createLand'];

  const { stateList, landTypes } = auxillary
  const { landData } = lands;
  const { mode } = ownProps;

  const modiStateList = stateList.map((item) => ({
    ...item,
    label: item.name,
    value: item.id,
  }));

  return {
    isLoading,
    modiStateList,
    landTypes,
    mode,
    landData,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const redirect = (pathname, search) => {
    dispatch(routerRedux.push({ pathname, search }));
  };
  return {
    redirect,
    createLand(data) {
      dispatch({ type: 'lands/createLand', payload: data })
    },
    fetchStates() {
      dispatch({ type: "auxillary/getAllStates" });
    },
    fetchLandType(data) {
      dispatch({ type: 'auxillary/getAllLandTypes', payload: data })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(CreateLandForm));
