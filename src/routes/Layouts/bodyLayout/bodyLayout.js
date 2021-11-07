import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { transparentize } from "polished";
import SideBar from "../sideBar/index";

import { calcViewMode } from "../../../utils/utils";
// import { Theme } from "../../../utils/theme";

const MainBody = styled.div`
  display: flex;
  flex-direction: wrap;
  min-height: 100vh;
  margin-top: 0;

  & .main-content {
    background: ${(props) => props.theme.PrimaryDark};
    transition: all 0.5s;
    -webkit-transition: all 0.25s;
    width: ${(props) =>
      props.collaspe ? "calc(100% - 60px)" : "calc(100% - 230px)"};
    ${(props) =>
      props.float &&
      css`
        width: 100%;
      `}
    @media print {
      width: 100%;
    }
  }

  & .main-sidebar {
    background: ${(props) => props.theme.SideBarColor};
    min-width: ${(props) => (props.collaspe ? "60px" : "230px")};
    transition: all 0.5s;
    -webkit-transition: all 0.25s;
    z-index: 306;
    ${(props) =>
      props.float &&
      css`
        min-width: 0;
      `}
  }

  .dark-wrapper {
    background: ${`${(props) => props.theme.SecondaryDark}50`};
    transition: all 0.5s;
    -webkit-transition: all 0.25s;
    width: 100%;
    height: 100%;
    z-index: 1;
    top: 0;
    bottom: 0;
    position: fixed;
    z-index: 40;
  }

  & .sidebar-chat {
    background: ${(props) => props.theme.PrimaryDark};
    padding: 0.2rem;
    width: 300px;
  }

  & .body-layout-children {
    // padding-top: 59px;
  }
`;

export const BodyLayout = (props) => {
  // state props received
  const { collaspe, float } = props;
  // diaptch props received
  const { setCollaspe, setFloat } = props;

  let viewMode = calcViewMode();

  useEffect(() => {
    if (viewMode === "desktop") {
      setCollaspe(false);
      setFloat(false);
    } else if (viewMode === "tablet") {
      setCollaspe(true);
      setFloat(false);
    } else if (viewMode === "mobile") {
      setCollaspe(true);
      setFloat(true);
    }
  }, []);

  const toggleSidebar = (props) => {
    setCollaspe(props);
  };

  return (
    <MainBody collaspe={collaspe} float={float}>
      <div className="main-sidebar no-print">
        <SideBar
          collaspe={collaspe}
          float={float}
          toggleSidebar={(event) => toggleSidebar(event)}
          viewMode={viewMode}
        />
      </div>
      {viewMode !== "desktop" && !collaspe ? (
        <div className="dark-wrapper" onClick={() => toggleSidebar(true)} />
      ) : null}
      <div className="main-content">{props.children}</div>
    </MainBody>
  );
};

BodyLayout.propTypes = {};
