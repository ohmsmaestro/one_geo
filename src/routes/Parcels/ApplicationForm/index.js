import { connect } from "dva";
import { createForm } from "rc-form";
import { ApplicationForm } from "./ApplicationForm";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
    const { loading, parcels, auxillary } = state;
    const { parcelData, applicationFormModal, } = parcels;
    const { applicationFormTypes } = auxillary

    return {
        parcelData,
        applicationFormModal,
        applicationFormTypes: applicationFormTypes.map(item => ({ ...item, value: item.id, label: item.name })),
        isLoadingTypes: loading.effects["auxillary/fetchApplicationFormTypes"],
        isLoading: loading.effects["parcels/createApplicationForm"],
    };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        redirect(pathname) {
            dispatch(routerRedux.push({ pathname: `${pathname}` }));
        },
        fetchApplicationFormTypes() {
            dispatch({ type: 'auxillary/fetchApplicationFormTypes' })
        },
        createApplicationForm(data) {
            dispatch({ type: 'parcels/createApplicationForm', payload: data })
        },
        closeModal() {
            dispatch({
                type: "parcels/save",
                payload: { applicationFormModal: false, parcelData: {} },
            });
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(createForm()(ApplicationForm));
