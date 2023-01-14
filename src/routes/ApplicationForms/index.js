import { connect } from "dva";
import { ApplicationForms } from "./ApplicationForms";
import { routerRedux } from "dva/router";

let fetchActionURL = "parcels/fetchAllApplicationForms";

export const mapStateToProps = (state, ownProps) => {
    const { loading, parcels, authentication, auxillary } = state;
    const { profile } = authentication;
    const isProprietor = profile?.isProprietor;
    const { applicationFormList, applicationFormTotal } = parcels
    const { applicationFormTypes } = auxillary
    const isLoading = loading.effects[fetchActionURL];
    return {
        applicationFormList,
        applicationFormTotal,
        applicationFormTypes: applicationFormTypes?.map(item => ({ ...item, value: item.id, label: item.name })) ?? [],
        isLoading,
        fetchActionURL,
    };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        redirect(pathname, search) {
            dispatch(routerRedux.push({ pathname, search }));
        },
        fetchApplicationFormTypes() {
            dispatch({ type: 'auxillary/fetchApplicationFormTypes' })
        },
        getAllApplicationForms(data) {
            dispatch({ type: fetchActionURL, payload: data });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationForms);
