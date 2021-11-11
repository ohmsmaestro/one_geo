import React from "react";
import Select from "react-select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styled, { css } from "styled-components";
import { transparentize, lighten } from "polished";
import { Theme } from "../utils/theme";

export const Label = styled.p`
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : props.theme.PrimaryFontSize};
  font-weight: normal;
  font-family: ${(props) => props.theme.PrimaryFont};
  margin: ${(props) => (props.margin ? props.margin : 0)};
  padding: ${(props) => (props.pad ? props.pad : "0.15rem 10px")};
  color: ${(props) =>
    props.color ? props.color : props.theme.PrimaryFontColor};
  letter-spacing: 0.45;
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : "unset")};
`;

export const Warning = styled.em`
  padding: 0.15rem 10px;
  margin: 0;
  padding: 0;
  line-height: 11px;
  text-align: right;
  font-size: 10px;
  font-weight: normal;
  width: 100%;
  color: red;
`;

const InputWrapper = styled.div`
  form {
    margin: 2em 0;
  }

  input {
    font-size: 1.5em;
    border: 0;
    border-bottom: 1.5px solid #707070;
    font-family: inherit;
    -webkit-appearance: none;
    cursor: text;
  }

  input:focus {
    outline: 0;
  }

  label {
    font-size: ${(props) => props.theme.SecondaryFontSize};
    font-weight: bold;
    color: ${(props) => props.theme.PrimaryTextColor};
  }

  input:focus {
    ::-webkit-input-placeholder {
      opacity: 1;
      color: ${(props) => props.theme.SecondaryTextColor};
    }
    ::-moz-placeholder {
      opacity: 1;
      color: ${(props) => props.theme.SecondaryTextColor};
    }
    ::-moz-placeholder {
      opacity: 1;
      color: ${(props) => props.theme.SecondaryTextColor};
    }
  }

  ${(props) =>
    props.display &&
    css`
      display: ${props.display};
    `}

  & p.title {
    text-align: left;
    font-size: 13px;
  }
  & p.warning-text {
    text-align: right;
  }

  & i {
    position: absolute;
    font-size: 13px;
    color: #4cd964;
    right: 10px;
    top: 55%;

    ${(props) =>
      props.small &&
      css`
        margin: 10px 0 10px -50px;
      `}
  }

  & .react-datepicker-wrapper {
    width: 100%;
  }

  & .react-datepicker {
    display: flex;
  }

  & .input--wrapper {
    position: relative;
  }

  & .gelacop__menu {
    background-color: ${(props) => props.theme.TertiaryDark};
    color: ${(props) => props.theme.PrimaryTextColor};
    border-radius: ${(props) => props.theme.PrimaryRadius};
    padding: 12px 10px;
    margin: 2px 0 0 0;
    text-align: left;
    box-shadow: 0px 3px 6px #00000025;

    & .gelacop__menu-list {
      max-height: 200px;

      & .gelacop__option {
        border-radius: ${(props) => props.theme.PrimaryRadius};
        height: 40px;
        padding: 8px 30px;
        font-size: ${(props) => props.theme.SecondaryFontSize};
        cursor: pointer;
        background-color: transparent

        &:hover {
          background: ${(props) => `${props.theme.SecondaryDark}50`} !important;
        }
      }

      & .gelacop__option--is-selected {
        color: ${(props) => props.theme.PrimaryTextColor};
      }
    }
  }

  & input,
  textarea,
  .gelacop__control {
    box-shadow: none;
    position: relative;
    background-color: ${(props) => `${props.theme.TertiaryDark}50`};
    height: ${(props) => (props.height ? props.height : "40px")};
    border-radius: ${(props) => props.theme.PrimaryRadius};
    border: 1px solid #ececee;
    width: 100%;
    padding: 10px 10px 10px 10px;
    font-size: 13px;
    font-weight: normal;
    color: ${(props) =>
      props.color ? props.color : props.theme.PrimaryTextColor};

    :focus {
      outline: none;
      color: ${(props) => props.theme.PrimaryTextColor};
      border-bottom: ${`1.2px solid ${(props) => props.theme.PrimaryColor}`};
    }

    & .gelacop__value-container {
      padding: 2px 0px;
      width: 90%;
      height: 20px;

      & .gelacop__placeholder {
        color: ${transparentize(0.2, Theme.PrimaryTextColor)};
        transform: unset;
        // top: unset;
        // position: unset;
      }

      & .gelacop__single-value,
      .gelacop__input {
        color: ${(props) =>
          props.color ? props.color : props.theme.PrimaryTextColor};
        transform: unset;
      }
    }

    & .gelacop__indicators {
      position: absolute;
      right: 15px;
      top: 0%;
      height: 100%;

      & .gelacop__indicator.gelacop__dropdown-indicator {
        color: ${(props) => props.theme.PrimaryColor};
      }
    }

    & .gelacop__indicator-separator {
      display: none;
    }

    :hover {
      border: ${`1.5px solid ${(props) => props.theme.PrimaryColor}`};
      background-color: ${(props) => `${props.theme.SecondaryDark}50`};
      outline: none;
    }

    ${(props) =>
      props.error &&
      css`
        border: ${`1.5px solid ${(props) => props.theme.PrimaryRed}`};
      `}

    ${(props) =>
      props.rounded &&
      css`
        border-radius: 26px;
        padding: 10px 20px 10px 30px;
      `}

    ${(props) =>
      props.pale &&
      css`
        background-color: ${(props) =>
          props.color
            ? transparentize(0.85, props.color)
            : transparentize(0.85, Theme.PrimaryDark)};
        color: ${(props) => (props.color ? props.color : "#fff")};

        ::-webkit-input-placeholder {
          /* Edge */
          color: ${transparentize(0.2, "#fff")};
        }

        :-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: ${transparentize(0.2, "#fff")};
        }

        ::placeholder {
          color: ${transparentize(0.2, "#fff")};
        }

        &:hover {
          background-color: ${(props) =>
            props.color
              ? transparentize(0.8, props.color)
              : transparentize(0.8, Theme.PrimaryColor)};
          color: ${(props) => props.theme.PrimaryTextColor};
        }

        :focus {
          outline: none;
          color: ${(props) => props.theme.PrimaryTextColor};
        }
      `}  

    ${(props) =>
      props.small &&
      css`
        height: ${(props) => (props.height ? props.height : "40px")};
        padding: 10px 20px 10px 15px;
      `}
  }
  & em {
    display: inline-block;
    position: absolute;
    bottom: -19.5px;
    color: #fd0541;
    left: 10px;
    font-style: italic;
    font-size: 0.7em;
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.75;

      label {
        color: ${(props) => props.theme.PrimaryTextColor} !important;
      }
    `}
`;

export class Input extends React.Component {
  render() {
    return (
      <InputWrapper
        disabled={this.props.disabled}
        error={this.props.error}
        value={this.props.value}
        rounded={this.props.rounded}
        pale={this.props.pale}
        color={this.props.color}
        height={this.props.height}
        small={this.props.small}
        display={this.props.display}
        label={this.props.label}
      >
        {/* <div className="input--wrapper field">
          {this.props.label && (
            <label className="title">{this.props.label}</label>
          )}
          <input
            type={this.props.type ? this.props.type : 'text'}
            {...this.props}
          />
          {this.props.error && <em>{this.props.error}</em>}
        </div> */}
        <div class="input--wrapper field">
          {this.props.label && (
            <label className="title">{this.props.label}</label>
          )}
          <input
            type={this.props.type ? this.props.type : "text"}
            {...this.props}
          />
          {this.props.error && <em>{this.props.error}</em>}
        </div>
      </InputWrapper>
    );
  }
}

export class Textarea extends React.Component {
  render() {
    return (
      <InputWrapper
        disabled={this.props.disabled}
        error={this.props.error}
        value={this.props.value}
        rounded={this.props.rounded}
        pale={this.props.pale}
        color={this.props.color}
        height={this.props.height}
        small={this.props.small}
        display={this.props.display}
      >
        <div className="input--wrapper field">
          {this.props.label && <label>{this.props.label}</label>}
          <textarea
            type={this.props.type ? this.props.type : "text"}
            cols={this.props.cols}
            rows={this.props.rows}
            {...this.props}
          />
          {this.props.error && <em>{this.props.error}</em>}
        </div>
      </InputWrapper>
    );
  }
}

export class AsyncSelect extends React.Component {
  render() {
    return (
      <InputWrapper
        disabled={this.props.disabled}
        error={this.props.error}
        value={this.props.value}
        rounded={this.props.rounded}
        pale={this.props.pale}
        color={this.props.color}
        height={this.props.height}
        small={this.props.small}
        display={this.props.display}
      >
        <div className="input--wrapper field">
          {this.props.label && <label>{this.props.label}</label>}
          <Select
            {...this.props}
            isDisabled={this.props.disabled}
            classNamePrefix="gelacop"
            className="gelacop-select"
          />
          {this.props.error && <em>{this.props.error}</em>}
        </div>
      </InputWrapper>
    );
  }
}

export class InputDate extends React.Component {
  render() {
    return (
      <InputWrapper
        disabled={this.props.disabled}
        error={this.props.error}
        value={this.props.value}
        rounded={this.props.rounded}
        pale={this.props.pale}
        color={this.props.color}
        height={this.props.height}
        small={this.props.small}
        display={this.props.display}
        label={this.props.label}
      >
        <div className="input--wrapper field">
          {this.props.label && <label>{this.props.label}</label>}
          <DatePicker
            style={{ width: "100%" }}
            className="w-100"
            {...this.props}
          />
          <i
            className="icon-calendar"
            style={this.props.color ? { color: this.props.color } : null}
          ></i>
          {this.props.error && <em>{this.props.error}</em>}
        </div>
      </InputWrapper>
    );
  }
}

const CheckWrapper = styled.label`
  display: flex;
  flex-wrap: no-wrap;
  cursor: pointer;

  & input {
    padding: 5px 10px;
    display: block;
    margin: ${(props) => (props.vAlign ? "auto 0" : "0")};
    height: 0px;
    border-radius: 4px;
    position: relative;
    -moz-appearance: initial;

    :before {
      content: "";
      border: 1px solid ${lighten(0.15, Theme.SecondaryDark)};
      background: ${(props) => props.theme.SecondaryDark};
      width: 20px;
      height: 20px;
      border-radius: 4px;
      border: 1px solid #70707070;
      display: block;
    }

    :after {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      display: block;
      position: absolute;
      top: 0;
      margin: 4px;
    }

    :checked {
      background: #fff;

      :after {
        content: "";
        background: ${(props) => props.theme.PrimaryColor};
      }
    }
  }

  & .title {
    margin: auto 0;
    padding: 0 0 0 20px;
  }
`;

export class Checkbox extends React.Component {
  render() {
    return (
      <CheckWrapper vAlign={this.props.vAlign}>
        <input
          name={this.props.name}
          type="checkbox"
          defaultChecked={this.props.defaultChecked}
          checked={this.props.checked}
          onClick={this.props.onClick ? () => this.props.onClick() : () => {}}
        />
        <Label className="title" fontSize={this.props.fontSize}>
          {this.props.label} {this.props.children}
        </Label>
      </CheckWrapper>
    );
  }
}

const RadioWrapper = styled.label`
  display: block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-size: 13px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    margin: auto 0;
  }

  .title {
    margin: auto 0;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    background-color: transparent;
    border: 1px solid #eee;
    border-radius: 50%;
  }

  :hover input ~ .checkmark {
    background-color: transparent;
    border: 1px solid #707070;
  }

  input:checked ~ .checkmark {
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.PrimaryColor};
  }

  .checkmark:after {
    content: "";
    position: absolute;
    background: #eee;
  }

  :hover input ~ .checkmark:after {
    background-color: #707070;
  }

  input:checked ~ .checkmark:after {
    display: block;
    background: ${(props) => props.theme.PrimaryColor};
  }

  .checkmark:after {
    top: 3px;
    left: 3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
`;

export const RadioButton = (props) => {
  const { label, name, value, onClick, checked, style } = props;
  return (
    <RadioWrapper style={style}>
      <input
        type="radio"
        checked={checked}
        name={name}
        value={value}
        onClick={onClick}
      />{" "}
      {label}
      <span class="checkmark"></span>
    </RadioWrapper>
  );
};
