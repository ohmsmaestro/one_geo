import React from 'react';
import Switch from 'react-switch';
import styled, { css } from 'styled-components';
import { Theme } from '../utils/theme';

const SwitchWrapper = styled.span`
  .react-switch-bg {
    height: 15px !important;
    width: 33px !important;
    margin-left: 2px !important;
  }
  .react-switch-handle {
    width: 25px !important;
    height: 25px !important;
    top: -5px !important;
    background: #3d3d3d !important;
  }

  svg {
    display: none;
  }
`;

export const SwitchComp = (props) => {
  return (
    <SwitchWrapper>
      <Switch
        onColor={Theme.PrimaryColor}
        handleDiameter={18}
        height={20}
        width={30}
        {...props}
      />
    </SwitchWrapper>
  );
};
