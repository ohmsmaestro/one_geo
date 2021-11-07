import React from 'react';
import styled from 'styled-components';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const StyledAvatar = styled.div`
  .slide {
    background: transparent !important;
  }
`;

export class CarouselComp extends React.Component {
  render() {
    return (
      <StyledAvatar>
        <Carousel {...this.props} />
      </StyledAvatar>
    );
  }
}
