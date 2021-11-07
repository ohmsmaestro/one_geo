import { connect } from "dva";
import { BodyLayout } from "./bodyLayout";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { app } = state;
  const { collaspe, float } = app;
  return {
    collaspe,
    float,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    setCollaspe(value) {
      dispatch({ type: "app/save", payload: { collaspe: value } });
    },
    setFloat(value) {
      dispatch({ type: "app/save", payload: { float: value } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BodyLayout);
