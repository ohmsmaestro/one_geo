import { connect } from "dva";
import { SideBar } from "./sideBar";
import { routerRedux } from "dva/router";

import { adminMenu, usersMenu } from "./menu";

import { storagePrivilege } from "../../../utils/constant";

const accessList = localStorage.getItem(storagePrivilege)
  ? JSON.parse(localStorage.getItem(storagePrivilege))
  : {};

const mapStateToProps = (state, ownProps) => {
  const { app, authentication } = state;
  const { openMediaMenu, menuMode } = app;

  const { profile } = authentication;
  const { collaspe } = ownProps;

  let dataList = usersMenu;

  const isProprietor = profile?.isProprietor;
  !isProprietor && (dataList = adminMenu);

  return {
    profile,
    openMediaMenu,
    collaspe,
    dataList,
    pathname: state.routing.location.pathname,
    menuMode,
    accessList,
    isProprietor,
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
