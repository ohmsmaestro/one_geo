import React from "react";
import styled, { css } from "styled-components";
import { Theme } from "../utils/theme";

const StyledLoader = styled.div`
  position: relative;
  ${(props) =>
    props.margin &&
    css`
      margin: ${props.margin};
    `};

  /* ============================ */
  /* SPINNER GENERAL              */
  /* ============================ */

  %bar {
    width: 8px;
    height: 40px;
    background-color: ${Theme.PrimaryColor};
    border-radius: 4px;
  }

  .spinner {
    display: inline-block;
    position: relative;
    width: 8px;
    height: 40px;
    background-color: ${Theme.PrimaryColor};
    border-radius: 4px;

    :after,
    :before {
      content: "";
      position: absolute;
      display: block;
      width: 8px;
      height: 40px;
      background-color: ${Theme.PrimaryColor};
      border-radius: 4px;
      top: 0px;
    }
    &:before {
      left: -12px;
    }
    &:after {
      left: 12px;
    }
  }

  /* ============================ */
  /* SPINNER BOUNCE BOTTOM        */
  /* ============================ */

  @keyframes bounce-bottom {
    0% {
      height: 10px;
      margin-top: 30px;
    }
    50% {
      height: 40px;
      margin-top: 0px;
    }
    100% {
      height: 10px;
      margin-top: 30px;
    }
  }

  @mixin bounce-bottom($dur: 0.5s, $delay: 0s) {
    animation: bounce-bottom $dur ease $delay infinite;
  }

  .spinner-bounce-bottom {
    animation: bounce-bottom 0.5s ease 0.1s infinite;
    :before,
    :after {
      top: auto;
      bottom: 0px;
    }
    :before {
      animation: bounce-bottom 0.6s ease 0s infinite;
    }
    :after {
      animation: bounce-bottom 0.5s ease 0.2s infinite;
    }
  }
`;

const SpinnerLoader = styled.div`
  position: relative;
  ${(props) =>
    props.margin &&
    css`
      margin: ${props.margin};
    `};

  .spinner {
    height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  }
  .spinner i {
    width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${Theme.PrimaryColor};
  animation: move 500ms linear 0ms infinite;
  margin-right: 30px;
  }
  .spinner i:nth-child(1) {
    position: absolute;
  top: 0;
  left: 0;
  animation: grow 500ms linear 0ms infinite;
  }
  .spinner i:nth-child(2) {
    
  }
  .spinner i:nth-child(4) {
    position: absolute;
  top: 0;
  right: 0;
  margin-right: 0;
  animation: grow 500ms linear 0s infinite reverse;
  }

  @keyframes grow {
    from {
      transform: scale(0, 0);
      opacity: 0;
    }
    to {
      transform: scale(1, 1);
      opacity: 1;
    }
  }
  @keyframes move {
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(45px);
    }
  }
`;

export const Loader = (props) => {
  const { margin } = props;
  return (
    <SpinnerLoader margin={margin}>
      <div className="spinner">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </SpinnerLoader>
  );
};
