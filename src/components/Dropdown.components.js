import React from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';

const StyledList = styled.div``;

export const DropDownList = (props) => {
  const { menu } = props;
  return (
    <StyledList>
      <Dropdown>
        <Dropdown.Toggle>{props.children}</Dropdown.Toggle>
        <Dropdown.Menu>
          {menu &&
            menu.map((item, index) => {
              <Dropdown.Item href={item.pathname}>{item.name}</Dropdown.Item>;
            })}
        </Dropdown.Menu>
      </Dropdown>
    </StyledList>
  );
};
