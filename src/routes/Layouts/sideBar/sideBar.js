import React from "react";

import styled, { css } from "styled-components";
import { darken, lighten, desaturate, transparentize } from "polished";
import { Boxed } from "../../../components/Boxed.components";
import { Theme } from "../../../utils/theme";

import LOGO from "../../../assets/img/logo-sm-white.png";
import LOGO_FULL from "../../../assets/img/logo-white.png";
import maleImage from "../../../assets/img/male.png";

const SideList = styled.div`
  padding: 25px 0;
  background: ${(props) => props.theme.SideBarColor};
  color: ${(props) => props.theme.PrimaryTextColor};
  width: ${(props) => (props.collaspe ? "60px" : "230px")};
  position: fixed;
  overflow: hidden;
  transition: all 0.5s;
  -webkit-transition: all 0.25s;
  height: 100vh;

  ${(props) =>
    props.float &&
    css`
      z-index: 300;
      width: ${(props) => (props.collaspe ? "0" : "230px")};
      min-height: 100vh;
    `}

  .sideList-toggle {
    text-align: right;
    padding: 0.25rem 1rem;
    ${(props) =>
      props.collaspe &&
      css`
        transform: rotate(180deg);
        text-align: "center";
      `}

    > span {
      cursor: pointer;
    }
  }

  .sideList-group {
    padding: 0.75rem 0;
  }

  .sideList-title {
    font-size: 12px;
    color: #ffffff;
    margin: 0;
    padding: 0.5rem 1rem;
    opacity: ${(props) => (props.collaspe ? "0" : "1")};
  }

  & ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    & li {
      font-size: 13px;
      padding: ${(props) => (props.collaspe ? "0.5rem" : "0.8rem 0.5rem")};
      color: #ffffff;
      cursor: pointer;
      display: flex;
      overflow: hidden;
      width: ${(props) => (props.collaspe ? "60px" : "unset")};
      transition: all 0.5s;
      -webkit-transition: all 0.25s;
      cursor: pointer;
      // border-radius: ${(props) => props.theme.SecondaryRadius};

      :hover {
        background: ${(props) => lighten(0.05, props.theme.PrimaryColor)};

        & i {
          // color: ${(props) => props.theme.PrimaryColor};
        }
      }

      & i {
        font-size: 16px;
        padding: 0 0.5rem;
      }

      .sideList-label {
        padding: 0 0.65rem;
        // font-weight: bold;
        opacity: ${(props) => (props.collaspe ? "0" : "1")};
        margin: auto 0;
        ${(props) =>
          props.collaspe &&
          css`
            display: none;
          `}
      }
    }

    .active {
      // color: ${(props) => props.theme.PrimaryColor};
      // background-color: ${(props) => props.theme.PrimaryDark};
      background: ${(props) => lighten(0.08, props.theme.PrimaryColor)};
    }
  }

  .side-menu-footer {
    width: 100%;
    background: ${(props) => props.theme.PrimaryDark};
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 20px;
    box-sizing: border-box;
  }

  .side-menu-footer .avatar {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    display: inline-block;
  }
  .side-menu-footer .avatar img {
    max-width: 100%;
  }

  .side-menu-footer .user-info {
    display: inline-block;
    margin: 0 10px;
    color: ${Theme.PrimaryDark};
    position: absolute;
    opacity: 1;
    transition: opacity 0.2s ease-in;
  }

  .side-menu.inactive .side-menu-footer .user-info {
    opacity: 1;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .side-menu-footer .user-info h5 {
    font-size: 15px;
  }

  .side-menu-footer .user-info p {
    font-size: 14px;
  }
`;

export const SideBar = (props) => {
  // state props received
  const {
    dataList,
    pathname,
    openMediaMenu,
    collaspe,
    float,
    viewMode,
    profile,
    menuMode,
  } = props;

  // dispatch props received
  const { redirect, toggleSidebar, setPageTitle } = props;

  const onItemClick = (pathname, pageTitle) => {
    viewMode !== "desktop" && toggleSidebar(true);
    setPageTitle(pageTitle);
    redirect(pathname);
  };

  let btnLeft = "10.5rem";
  float && collaspe && (btnLeft = "-100px");
  !float && collaspe && (btnLeft = "0.5rem");

  return (
    <SideList collaspe={collaspe} float={float}>
      <Boxed display="flex">
        <img
          src={collaspe ? LOGO : LOGO_FULL}
          height={collaspe ? "35px" : "50px"}
          style={{ margin: "auto", cursor: "pointer", padding: "5px" }}
          alt="app-logo"
          onClick={() => toggleSidebar(!collaspe)}
        />
      </Boxed>
      {dataList &&
        dataList.map((item, index) => {
          return (
            <div className="sideList-group" key={index}>
              <h3 className="sideList-title">{item.title}</h3>
              <ul>
                {item.list.map((subItem, subIndex) => {
                  return (
                    <li
                      key={subIndex}
                      className={pathname === subItem.pathname ? "active" : ""}
                      onClick={
                        pathname === subItem.pathname
                          ? null
                          : () => onItemClick(subItem.pathname, subItem.label)
                      }
                    >
                      <i className={`icon ${subItem.icon}`} />{" "}
                      <span className="sideList-label">{subItem.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

      {/* <div className="side-menu-footer">
        <div className="avatar">
          <img src={maleImage} alt="user" />
        </div>
        <div className="user-info">
          <h5>{profile?.username}</h5>
          <p>{profile?.email}</p>
        </div>
      </div> */}
    </SideList>
  );
};

SideBar.propTypes = {};
