import { connect } from "dva";
import { FileViewer } from "./FileViewer";
import { routerRedux } from "dva/router";

export const mapStateToProps = (state, ownProps) => {
  const { app } = state;
  const { openFileViewer, file } = app;
  return {
    openFileViewer,
    file,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    closeModal() {
      dispatch({
        type: "app/save",
        payload: { openFileViewer: false, file: {} },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileViewer);
