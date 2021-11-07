import React from "react";
import pluralize from "pluralize";
import styled from "styled-components";
import { darken, lighten, transparentize } from "polished";
import Pagination from "rc-pagination";
import Table from "rc-table";

// import { props => props.theme } from "../utils/props => props.theme";

export const TableWrapper = styled.div`
  display: block;
  margin: 5px 0;
  font-size: ${(props) => props.theme.SecondaryFontSize};
  background-color: ${(props) => props.theme.TertiaryDark};
  overflow-x: auto;

  & table {
    width: 100%;
    border-collapse: collapse;

    & thead {
      /* background: ${(props) => lighten(0.1, props.theme.PrimaryGrey)}; */
      & th {
        text-align: left;
        padding: 10px 15px;
        text-transform: capitalize;
        border-bottom: 1px solid
          ${(props) => lighten(0.66, props.theme.PrimaryTextColor)};

        font-size: ${(props) => props.theme.SecondaryFontSize};
        color: ${(props) => props.theme.PrimaryTextColor};
        font-weight: bold;
      }
    }
    & tbody {
      color: ${(props) => props.theme.SecondaryTextColor}
      & tr:nth-child(even) {
        // background: ${(props) => props.theme.SecondaryDark};
      }
      & tr {
        // border-bottom: 1px solid ${(props) =>
          lighten(0.66, props.theme.PrimaryTextColor)};
        // border-left: 1px solid ${(props) =>
          lighten(1, props.theme.PrimaryColor)};
        transition: all 0.1s ease-out;
        & td:first-child {
          border-left: none;
        }
        & td:last-child {
        }
        :hover {
          //   border-left: 1px solid ${(props) =>
            lighten(0, props.theme.PrimaryColor)};
          //   background-color: ${(props) =>
            lighten(0.46, props.theme.PrimaryColor)};
            background-color: ${(props) => props.theme.PrimaryDark};
            // color: red;
        }
      }

      & td {
        padding: 10px 15px;
        font-size: ${(props) => props.theme.SecondaryFontSize};
        // border-left: 1px solid ${(props) =>
          lighten(0.66, props.theme.PrimaryTextColor)};
        transition: ${(props) => props.theme.PrimaryTransition};
      }
      & td.text-center {
        text-align: center !important;
      }

      & td.uppercase {
        text-transform: uppercase;
      }
    }
  }
`;

const PaginationWrapper = styled.div`
  text-align: right;
  color: ${(props) => props.theme.PrimaryFontColor};
  position: relative;

  & .rc-pagination {
    list-style: none;
    margin: 0;
    padding: 0;
    display: inline-flex;
    flex-direction: row;

    & .rc-pagination-prev {
      & a {
        &:after {
          font-family: "confluencebits";
          content: "\\f104";
          color: ${(props) => props.theme.PrimaryColor};
          /* font-size: 18px; */
          font-weight: bold;
        }
      }
    }
    & .rc-pagination-next {
      & a {
        &:after {
          font-family: "confluencebits";
          content: "\\f105";
          color: ${(props) => props.theme.PrimaryColor};
          /* font-size: 18px; */
          font-weight: bold;
        }
      }
    }
    & > li {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      display: block;
      text-align: center;
      padding: 10px 0;
      box-sizing: border-box;
      font-size: 12px;
      margin: 0 2px;

      &:hover {
        border-color: ${(props) => props.theme.PrimaryColor};
      }

      transition: background-color 0.3s ease-out;
      cursor: pointer;
      &.rc-pagination-disabled {
        color: #ccc;
        & a:after {
          color: #ccc;
          font-weight: normal;
        }
        &:hover {
          background: none;
        }
      }
      &.rc-pagination-item-active {
        color: ${(props) => props.theme.PrimaryColor};
        font-weight: bold;
        padding: 10px 0;
        // margin-top: -1px;
        // height: 51px;
        & a {
          color: ${(props) => props.theme.PrimaryColor};
        }
      }
      &.rc-pagination-prev,
      &.rc-pagination-next {
        border: 1px solid ${(props) => props.theme.SecondaryTextColor};

        &:hover {
          border-color: ${(props) => props.theme.PrimaryColor};
        }
        a {
          text-decoration: none;
        }
      }
      &:active {
        outline: none;
      }
      &:focus {
        outline: none;
      }
      &:hover {
        outline: none;
        background-color: ${(props) =>
          lighten(0.7, props.theme.PrimaryFontColor)};
      }
    }
  }
  & .rc-pagination-jump-next,
  .rc-pagination-jump-prev {
    & a:after {
      content: none;
    }
  }
  & li.rc-pagination-total-text {
    width: auto;
    border: none;
    padding: 10px 10px;
    background: none;
    opacity: 0.6;
    font-size: 12px;
    &:hover {
      background: none;
    }
  }
  & .page-sizer {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 120px;
    text-align: left;
    & .flexisaf__control {
      height: 26px;
      margin: 5px;
    }

    & .flexisaf__menu {
      position: absolute;
      top: unset;
      left: 5px;
      bottom: 35px;
      z-index: 1000;
    }

    & .flexisaf__value-container {
      height: 100%;
    }
  }

  @media screen and (max-width: 600px) {
    & .page-sizer {
      display: none;
    }
  }
`;

export const TableComponent = (props) => {
  return (
    <TableWrapper>
      <Table {...props}>{null}</Table>
      {props.children && <div>{props.children}</div>}
    </TableWrapper>
  );
};

export class PaginationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: this.props.pageCounts[0],
    };
  }

  changePages = (selectedOption) => {
    this.setState({ pageSize: selectedOption });
    this.props.changePageSize(selectedOption);
  };
  render() {
    return (
      <PaginationWrapper>
        <div className="page-sizer">
          {/* {this.props.itemsDisplayed && (
            <SimpleSelect
              placeholder="items"
              options={this.props.pageCounts}
              value={{
                value: this.props.pageSize,
                label: `${this.props.pageSize} Rows`,
              }}
              onChange={this.changePages}
              isSearchable={false}
            />
          )} */}
        </div>
        <Pagination
          {...this.props}
          showTotal={(total, range) =>
            `${range[0]} - ${range[1]} of ${total} ${
              total > 1 ? pluralize(this.props.valueType) : this.props.valueType
            }`
          }
          pageSize={this.props.pageSize}
        />
      </PaginationWrapper>
    );
  }
}

PaginationComponent.defaultProps = {
  valueType: "item",
  itemsDisplayed: false,
  current: 0,
  total: 0,
};
