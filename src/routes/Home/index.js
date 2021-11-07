import { connect } from "dva";
import { Home } from "./Home";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  return {};
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
