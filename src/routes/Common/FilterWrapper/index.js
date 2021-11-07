import { connect } from "dva";
import { Wrapper } from "./Wrapper";

export const mapStateToProps = (state, ownProps) => {
  const { externalParams } = ownProps;
  let externalProps = { ...externalParams };
  return {
    externalProps,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData(action, payload) {
      dispatch({
        type: action,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
