import { connect } from 'dva';
import { createForm } from 'rc-form';
import { SubsequentTrans } from './SubsequentTrans';
import { routerRedux } from 'dva/router';

const fetchActionURL = 'lands/fetchAllSubsequentTrans';

export const mapStateToProps = (state, ownProps) => {
    const { loading, lands } = state;
    const { subsequentTransList, subsequentTransTotal } = lands;
    const isLoading = loading.effects[fetchActionURL];
    return {
        isLoading,
        subsequentTransList,
        subsequentTransTotal,
        fetchActionURL
    };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        redirect(pathname) {
            dispatch(routerRedux.push({ pathname: `${pathname}` }));
        },
        getAllSubsequentTrans(data) {
            dispatch({ type: fetchActionURL, payload: data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(SubsequentTrans));
