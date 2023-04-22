import { connect } from "dva";
import { createForm } from "rc-form";
import { AssignOwnerForm } from "./AssignOwner";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
    const { loading, authentication, auxillary, lands } = state;
    const { profile } = authentication;
    const isLoading = loading.effects['lands/assignOnwer'];

    const { stateList } = auxillary
    const { assignOnwerModal, landData } = lands

    const modiStateList = stateList.map((item) => ({
        ...item,
        label: item.name,
        value: item.id,
    }));

    return {
        isLoading,
        modiStateList,
        assignOnwerModal,
        landData,
    };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
    const redirect = (pathname, search) => {
        dispatch(routerRedux.push({ pathname, search }));
    };
    return {
        redirect,
        assignOnwer(data) {
            dispatch({ type: 'lands/assignOnwer', payload: data })
        },
        fetchStates() {
            dispatch({ type: "auxillary/getAllStates" });
        },
        onCloseModal() {
            dispatch({ type: 'lands/save', payload: { assignOnwerModal: false } })
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(createForm()(AssignOwnerForm));
