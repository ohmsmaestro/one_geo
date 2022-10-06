import { connect } from "dva";
import { createForm } from "rc-form";
import { Profile } from "./Profile";
import { routerRedux } from "dva/router";

const fetchActionURL = "users/getUserDetails";

export const mapStateToProps = (state, ownProps) => {
    const { loading, users } = state;
    const { usersDetail } = users;
    const isLoading = loading.effects[fetchActionURL];

    const { match } = ownProps;
    const { params } = match;

    return {
        isLoading,
        params,
        usersDetail
    };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        redirect(pathname) {
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
