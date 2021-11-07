import React from 'react';
import styled from 'styled-components';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import { Theme } from '../utils/theme';

const StyledAlert = styled.div`
  .s-alert-box {
    background-color: ${Theme.SecondaryDark};
    border-radius: ${`${Theme.SecondaryRadius} ${Theme.SecondaryRadius} 0 0 `};
    z-index: 1101;
  }
  .s-alert-success {
    border-bottom: 1.5px solid
      ${Theme.PrimaryGreen ? Theme.PrimaryGreen : 'green'};

    .s-alert-box-inner {
      color: ${Theme.PrimaryTextColor ? Theme.PrimaryTextColor : 'green'};
    }

    .s-alert-close:before,
    .s-alert-close:after {
      background: ${Theme.PrimaryTextColor ? Theme.PrimaryTextColor : 'green'};
    }
  }

  .s-alert-error {
    border-bottom: 1.5px solid ${Theme.PrimaryRed ? Theme.PrimaryRed : 'red'};

    .s-alert-box-inner {
      color: ${Theme.PrimaryRed ? Theme.PrimaryRed : 'red'};
    }
    .s-alert-close::before,
    .s-alert-close::after {
      background: ${Theme.PrimaryTextColor ? Theme.PrimaryTextColor : 'red'};
    }
  }
`;

export const AlertComponent = (props) => {
  return (
    <StyledAlert>
      <Alert
        stack={{ limit: 3, spacing: 10 }}
        effect="slide"
        position="top-right"
        offset={10}
      />
    </StyledAlert>
  );
};

export { Alert };
