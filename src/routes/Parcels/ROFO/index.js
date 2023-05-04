import { connect } from "dva";
import { ROFO } from "./ROFO_new";
import { routerRedux } from "dva/router";
// import qs from "query-string";

export const mapStateToProps = (state, ownProps) => {
    const { parcels, loading, lands, entries } = state;

    const params = ownProps?.match?.params;

    const isLoadingParcel = loading.effects["lands/getSingleLand"];
    const isLoadingOwner = loading.effects["entries/getLandOwner"];
    const { ownersDetail } = entries
    const { landData } = lands
    return {
        params,
        isLoadingParcel,
        isLoadingOwner,
        ownersDetail,
        landData,
    };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        redirect(pathname) {
            dispatch(routerRedux.push({ pathname: `${pathname}` }));
        },

        getSingleLand(data) {
            dispatch({ type: "lands/getSingleLand", payload: data });
        },
        getLandOwner(data) {
            dispatch({ type: 'entries/getLandOwner', payload: data })
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ROFO);
