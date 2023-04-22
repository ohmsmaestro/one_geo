import { connect } from "dva";
import { createForm } from "rc-form";
import { Lands } from "./Land";
import { routerRedux } from "dva/router";

let fetchActionURL = "lands/getAllLands";

export const mapStateToProps = (state, ownProps) => {
  const { loading, lands, authentication, parcels } = state;
  const { profile, accessList } = authentication;
  // profile?.isProprietor && (fetchActionURL = "lands/getAllMyParcels");
  const {
    landsList,
    landsTotal,
  } = lands;
  const { rectificationModal } = parcels
  const isLoading = loading.effects[fetchActionURL];

  return {
    isLoading,
    landsList,
    landsTotal,
    accessList,
    profile,
    rectificationModal,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const redirect = (pathname, search) => {
    dispatch(routerRedux.push({ pathname, search }));
  };
  return {
    redirect,
    getAllLands(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
    openRectificationModal(data) {
      dispatch({
        type: "parcels/save",
        payload: {
          rectificationModal: true,
          parcelData: data,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Lands));
