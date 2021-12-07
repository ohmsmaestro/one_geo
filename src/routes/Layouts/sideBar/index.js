import { connect } from "dva";
import { SideBar } from "./sideBar";
import { routerRedux } from "dva/router";

import adminMenu from "./adminMenu";
import usersMenu from "./usersMenu";

const mapStateToProps = (state, ownProps) => {
  const { app, authentication } = state;
  const { openMediaMenu, menuMode } = app;
  console.log({ authentication });
  const { profile } = authentication;
  const { collaspe } = ownProps;

  let dataList = usersMenu;
  const isAdmin = profile?.roles?.includes("ADMIN");

  // if (isAdmin) {
  //   dataList = adminMenu;
  // }

  return {
    profile,
    openMediaMenu,
    collaspe,
    dataList,
    pathname: state.routing.location.pathname,
    menuMode,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { toggleSidebar } = ownProps;
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    toggleSidebar,
    toggleMediaMenu(data, mode) {
      dispatch({
        type: "app/save",
        payload: { openMediaMenu: data, menuMode: mode },
      });
    },
    setPageTitle(pageTitle) {
      dispatch({
        type: "app/save",
        payload: { pageTitle },
      });
    },
    logOut() {
      dispatch({
        type: "authentication/logOut",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
