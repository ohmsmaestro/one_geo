import React, { Component } from "react";

export class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        page: 0,
        size: 10,
        ...this.props.externalParams,
      },
      currentPage: 1,
      pageSize: 10,
    };
    this.searchInputDebounceTimer = null;
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.externalParams) {
      if (
        JSON.stringify(prevProps.externalParams) !==
        JSON.stringify(this.props.externalParams)
      ) {
        this.setState(
          {
            filter: {
              page: 1,
              size: 10,
              ...this.props.externalParams,
            },
            currentPage: 1,
            pageSize: 10,
          },
          () => {
            this.props.fetchData(
              this.props.externalActionURL,
              this.state.filter
            );
          }
        );
      }
    }
  };

  changePageSize = (size, action) => {
    this.setState(
      {
        pageSize: size.value,
        currentPage: 1,
        filter: {
          ...this.state.filter,
          size: size.value,
          ...this.props.externalParams,
        },
      },
      () => {
        this.props.fetchData(action, this.state.filter);
      }
    );
  };

  fetchData = (action, payload) => {
    this.props.fetchData(action, payload);
  };

  handlePagination = (page, action) => {
    this.setState(
      {
        currentPage: page,
        filter: {
          ...this.state.filter,
          page,
          ...this.props.externalParams,
        },
      },
      () => {
        let payload = {
          ...this.state.filter,
          page,
          ...this.props.externalParams,
        };
        this.props.fetchData(action, payload);
      }
    );
  };

  search = (search, action) => {
    search.stopPropagation();
    clearTimeout(this.searchInputDebounceTimer);
    this.setState(
      {
        filter: {
          ...this.state.filter,
          search: search.target.value ? search.target.value : null,
          ...this.props.externalParams,
        },
      },
      () => {
        this.searchInputDebounceTimer = setTimeout(() => {
          this.props.fetchData(action, this.state.filter);
        }, 1500);
      }
    );
  };

  filter = (filters, action) => {
    let tempFilters = {};
    filters.forEach((item) => {
      tempFilters[item.key] = item.value;
    });
    this.setState(
      {
        filter: {
          ...this.state.filter,
          ...tempFilters,
          ...this.props.externalParams,
        },
      },
      () => {
        this.props.fetchData(action, this.state.filter);
      }
    );
  };
  removeTag = (tag, action) => {
    let tempFilters = this.state.filter;
    tempFilters[tag.key] = null;
    this.setState({ filter: tempFilters });
    this.props.fetchData(action, this.state.filter);
  };

  removeAllTags = (action) => {
    this.setState(
      {
        filter: {
          page: 0,
          size: 10,
          ...this.props.externalParams,
        },
      },
      () => {
        this.props.fetchData(action, this.state.filter);
      }
    );
  };

  render() {
    return this.props.render({
      fetchData: this.fetchData,
      changePageSize: this.changePageSize,
      handlePagination: this.handlePagination,
      search: this.search,
      changeFilter: this.filter,
      removeTag: this.removeTag,
      removeAllTags: this.removeAllTags,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
      filter: this.state.filter,
      isLoading: this.props.isLoading,
    });
  }
}
