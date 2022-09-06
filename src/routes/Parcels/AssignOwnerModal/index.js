import { connect } from "dva";
import { createForm } from "rc-form";
import { AssignOwnerModal } from "./AssignOwnerModal";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
    const { loading, parcels } = state;
    const { parcelData, assignOwnerModal, } = parcels;
    return {
        parcelData,
        assignOwnerModal,
        isLoading: loading.effects["parcels/assignOwner"],
    };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        redirect(pathname) {
            dispatch(routerRedux.push({ pathname: `${pathname}` }));
        },
        assignOwner(data) {
            dispatch({ type: 'parcels/assignOwner', payload: data })
        },
        closeModal() {
            dispatch({
                type: "parcels/save",
                payload: { assignOwnerModal: false, parcelData: {} },
            });
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(createForm()(AssignOwnerModal));
