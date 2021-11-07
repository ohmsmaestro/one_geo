import React from "react";
import styled, { css } from "styled-components";
import Modal from "react-bootstrap/Modal";

import { Theme } from "../utils/theme";

const StyledModal = styled.div`
    width:100%;
    height: 100%;
    background-color: ${(props) =>
      props.background ? props.background : props.theme.TertiaryDark};
    color: ${(props) => props.theme.PrimaryTextColor};
    border-radius: ${(props) => props.theme.SecondaryRadius};
    padding: 0.25rem;

    .modal-header {
      font-size: 1.2rem;
      font-family: ${(props) => props.theme.SecondaryFontFamily};
      padding: 1rem;
      border-bottom: none;

      & .close { 
          color:${(props) => props.theme.PrimaryTextColor};
          background : transparent;
          border: none;

          : hover { 
            color:${(props) => props.theme.PrimaryColor};
          }

          & .sr-only { 
            display: none;
          }
      }
    }

    .modal-body{
    max-height: 70vh;
    padding: 0.75rem;
    overflow-y: scroll;
    overflow-x: hidden;
    ${(props) =>
      props.dialogClassName === "modal-fullScreen" &&
      css`
        ${"" /* height: 90vh; */}
        max-height: 90vh;
      `}
    }

    .modal-footer {
        border-top: none;   
    }
  }
`;

export const ModalComponent = (props) => {
  const {
    title,
    children,
    footer,
    show,
    onHide,
    centered,
    size,
    dialogClassName,
    fullScreen,
    background,
    border,
  } = props;
  return (
    <Modal
      size={size}
      show={show}
      onHide={onHide}
      centered={centered}
      style={{ background: "none", border: border }}
      backdrop="static"
      keyboard={false}
      dialogClassName={dialogClassName}
    >
      <StyledModal dialogClassName={dialogClassName} background={background}>
        {title ? (
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
        ) : null}
        <Modal.Body>{children}</Modal.Body>
        {footer ? <Modal.Footer>{footer}</Modal.Footer> : null}
      </StyledModal>
    </Modal>
  );
};
