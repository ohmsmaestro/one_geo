import { connect } from "dva";
import { createForm } from "rc-form";
import { Profile } from "./Profile";
import { routerRedux } from "dva/router";

const fetchActionURL = "users/getUserDetails";

export const mapStateToProps = (state, ownProps) => {
    const { loading, users } = state;
    const { userDetail } = users;
    const isLoading = loading.effects[fetchActionURL];

    const { match } = ownProps;
    const { params } = match;

    return {
        isLoading,
        params,
        userDetail
    };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        redirect(pathname) {
            console.log({ pathname })
            dispatch(routerRedux.push({ pathname: `${pathname}` }));
        },
        getUserDetails(data) {
            dispatch({ type: fetchActionURL, payload: data });
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(createForm()(Profile));
