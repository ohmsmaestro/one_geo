import React from "react";
import styled, { css, keyframes } from "styled-components";
import { darken, lighten, desaturate, transparentize } from "polished";
import { Theme } from "../utils/theme";

export const Button = styled.button`
  display: inline-block;
  height: 40px;
  padding: 10px 22px;
  font-size: 13px;
  line-height: 20px;
  font-family: ${(props) => props.theme.PrimaryFontFamily};
  background-color: ${(props) =>
    props.color ? props.color : darken(0.05, props.theme.PrimaryColor)};
  border-radius: ${(props) =>
    props.rounded ? "26px" : props.theme.PrimaryRadius};
  color: ${(props) => (props.fontColor ? props.fontColor : "#fff")};
  border: 1px solid transparent;
  text-align: center;
  cursor: pointer;
  transition: ${(props) => props.theme.PrimaryTransition};
  letter-spacing: 1.5px;

  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}

  & + button {
    margin-left: 5px;
    margin-bottom: 5px;
  }

  & svg,
  i {
    display: inline-block;
    margin: 0;
    padding: 0 0.2rem 0 0;
  }

  ${(props) =>
    props.icon &&
    css`
      padding: 12px 12px;
      min-width: 44px;
    `}
  ${(props) =>
    props.iconLeft &&
    css`
      & i {
        margin-left: -8px;
        padding-right: 10px;
      }
    `}
    ${(props) =>
    props.iconRight &&
    css`
      & i {
        padding-left: 10px;
        margin-right: -8px;
      }
    `}
    ${(props) =>
    props.margin &&
    css`
      margin: ${(props) => props.margin} !important;
    `}
    ${(props) =>
    props.width &&
    css`
      min-width: ${(props) => props.width};
    `}

    &:hover {
    background-color: ${(props) =>
      props.color
        ? darken(0.1, props.color)
        : darken(0.1, props.theme.PrimaryColor)};
  }
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  ${(props) =>
    props.disabled &&
    css`
      border-color: transparent;
      color: #272727;
      background-color: ${(props) => props.theme.SecondaryBorderColor};
      background-color: ${(props) =>
        props.color
          ? desaturate(0.7, lighten(0.35, props.theme.SecondaryBorderColor))
          : desaturate(0.7, lighten(0.35, props.theme.SecondaryBorderColor))};
      &:hover {
        color: ${(props) =>
          props.color
            ? desaturate(0.9, lighten(0.1, props.color))
            : desaturate(0.9, lighten(0.1, props.theme.PrimaryColor))};
        background-color: ${(props) =>
          props.color
            ? desaturate(0.7, lighten(0.35, props.color))
            : desaturate(0.7, lighten(0.35, props.theme.PrimaryColor))};
      }
    `}
  ${(props) =>
    props.progress &&
    css`
      position: relative;
      overflow: hidden;
      background: none;
      z-index: 1;
      &:after {
        content: "";
        display: block;
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        right: 0;
        background-color: ${(props) =>
          props.color
            ? darken(0.07, props.color)
            : darken(0.07, props.theme.PrimaryColor)};
        animation: ${InProgress} 1.2s ease-in-out alternate both infinite;
        z-index: -1;
      }
      &:before {
        content: "";
        display: block;
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        right: 0;
        background-color: ${(props) =>
          props.color ? props.color : props.theme.PrimaryColor};
        z-index: -2;
      }
      &:hover {
        background: none;
      }
    `}
    ${(props) =>
    props.small &&
    css`
      min-height: 30px;
      padding: 7px 14px;
      line-height: 16px;
      font-size: 13px;
      ${(props) =>
        props.icon &&
        css`
          padding: 6px 6px;
          min-width: 30px;
        `}
    `}
    ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
    ${(props) =>
    props.pale &&
    css`
      border: 1px solid
        ${(props) =>
          props.color ? props.color : darken(0.05, props.theme.PrimaryColor)};
      background-color: transparent;
      color: ${(props) =>
        props.color ? props.color : darken(0.05, props.theme.PrimaryColor)};

      &:hover {
        background-color: ${(props) =>
          props.color
            ? transparentize(0.8, props.color)
            : transparentize(0.8, props.theme.PrimaryColor)};
      }
    `} 
    ${(props) =>
    props.clear &&
    css`
      border: 0px solid
        ${(props) =>
          props.color ? props.color : darken(0.05, props.theme.PrimaryColor)};
      background-color: transparent;
      color: ${(props) =>
        props.color ? props.color : darken(0.05, props.theme.PrimaryColor)};

      &:hover {
        background-color: ${(props) =>
          props.color
            ? transparentize(0.8, props.color)
            : transparentize(0.8, props.theme.PrimaryColor)};
      }
    `}

    ${(props) =>
    props.small &&
    css`
      height: ${props.height ? props.height : "40px"};
    `} 
      ${(props) =>
    props.xs &&
    css`
      height: ${props.height ? props.height : "30px"};
      line-height: 12.5px;
      font-size: 12px;
      padding: 7px 9px;
    `}

    ${(props) =>
    props.square &&
    css`
      width: ${props.square};
      height: ${props.square};
    `}

    ${(props) =>
    props.clear &&
    css`
      border: none;
      background: transparent;
    `}
    ${(props) =>
    props.pad &&
    css`
      padding: ${props.pad};
    `}
`;

const InProgress = keyframes`
  to {
    width: 0%;
  }
`;

const StyleBtnGroup = styled.div`
  border: 1px solid ${(props) => props.theme.PrimaryColor};
  border-radius: ${(props) =>
    props.rounded ? "26px" : props.theme.SecondaryRadius};

  button {
    margin: 0;
    border: none;
    width: calc(100% / ${(props) => props.number});
  }
`;

export const ButtonGroup = (props) => {
  const { list, rounded, small, onClick, active } = props;
  return (
    <StyleBtnGroup
      rounded={rounded}
      small={small}
      number={list ? list.length : 1}
    >
      {list.map((item, index) => {
        return (
          <Button
            key={index}
            pale={active === item.key ? false : true}
            rounded={rounded}
            small={small}
            onClick={active === item.key ? null : () => onClick(item.key)}
          >
            {item.label}
          </Button>
        );
      })}
    </StyleBtnGroup>
  );
};
