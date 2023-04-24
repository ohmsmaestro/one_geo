import { connect } from "dva";
import { createForm } from "rc-form";
import { routerRedux } from "dva/router";
import { SubsequentTransForm } from "./SubsequentTrans";

export const mapStateToProps = (state, ownProps) => {
    const { loading, authentication, auxillary, lands } = state;
    const { profile } = authentication;
    const isLoading = loading.effects['lands/assignOnwer'];

    const { subsequentTransTypes } = auxillary
    const { subsequentTransModal, landData } = lands;

    return {
        isLoading,
        subsequentTransTypes,
        subsequentTransModal,
        landData,
    };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
    const redirect = (pathname, search) => {
        dispatch(routerRedux.push({ pathname, search }));
    };
    return {
        redirect,
        createSubsequentTrans(data) {
            dispatch({ type: 'lands/createSubsequentTrans', payload: data })
        },
        fetchStates() {
            dispatch({ type: "auxillary/getAllStates" });
        },
        onCloseModal() {
            dispatch({ type: 'lands/save', payload: { subsequentTransModal: false } })
        },
        fetchSubsequentTransType() {
            dispatch({ type: "auxillary/getAllSubsequentTransType" });
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(createForm()(SubsequentTransForm));
