import { connect } from "dva";
import { createForm } from "rc-form";
import { Rent } from "./Rent";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { loading, parcels } = state;
  const isLoading = loading.effects["parcels/createRent"];
  const { rentModal } = parcels;
  return {
    rentModal,
    isLoading,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    createRent(data) {
      dispatch({ type: "parcels/createRent", payload: data });
    },
    closeModal() {
      dispatch({
        type: "parcels/save",
        payload: { rentModal: false, parcelData: {} },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Rent));
