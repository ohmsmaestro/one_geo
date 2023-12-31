import { connect } from 'dva';
import { createForm } from 'rc-form';
import { Lands } from './Land';
import { routerRedux } from 'dva/router';

let fetchActionURL = 'lands/getAllLands';

export const mapStateToProps = (state, ownProps) => {
  const { loading, lands, authentication, parcels } = state;
  const { profile, accessList } = authentication;
  // profile?.isProprietor && (fetchActionURL = "lands/getAllMyParcels");
  const { landsList, landsTotal, subsequentTransModal } = lands;
  const { rectificationModal, appraisalModal, encumbranceModal, applicationFormModal } = parcels;
  const isLoading = loading.effects[fetchActionURL];

  return {
    isLoading,
    landsList,
    landsTotal,
    accessList,
    profile,
    rectificationModal,
    appraisalModal,
    encumbranceModal,
    applicationFormModal,
    subsequentTransModal,
    fetchActionURL
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const redirect = (pathname, search) => dispatch(routerRedux.push({ pathname, search }));

  return {
    redirect,
    getAllLands(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
    openRectificationModal(data) {
      dispatch({
        type: 'parcels/save',
        payload: {
          rectificationModal: true,
          parcelData: data
        }
      });
    },
    openAppraisalModal(data) {
      dispatch({
        type: 'parcels/save',
        payload: { appraisalModal: true, parcelData: data }
      });
    },
    openEncumbranceModal(data) {
      dispatch({
        type: 'parcels/save',
        payload: { encumbranceModal: true, parcelData: data }
      });
    },
    openApplicationFormModal(data) {
      dispatch({ type: 'parcels/save', payload: { applicationFormModal: true, parcelData: data } });
    },
    openSubsequentTransModal(data) {
      dispatch({ type: 'lands/save', payload: { subsequentTransModal: true, landData: data } });
    },
    openLandDetail(data) {
      dispatch({ type: 'lands/save', payload: { landData: data } });
      redirect(`lands/detail/${data.id}`);
    },
    openEditDetail(data) {
      dispatch({ type: 'lands/save', payload: { landData: data } });
      redirect(`lands/edit/${data.id}`);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Lands));
