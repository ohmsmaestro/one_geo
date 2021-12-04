import { connect } from "dva";
import { createForm } from "rc-form";
import { Rectification } from "./Rectification";
import { routerRedux } from "dva/router";

const sampleData = [
  {
    id: 1,
    entry_number: "W18956M",
    parcel_number: "PS45654",
    created_at: "30-09-2021",
    proprietor: "Ijeh Michael",
  },
  {
    id: 2,
    entry_number: "W18956M",
    parcel_number: "PS45654",
    created_at: "30-09-2021",
    proprietor: "Ijeh Michael",
  },
  {
    id: 3,
    entry_number: "W18956M",
    parcel_number: "PS45654",
    created_at: "30-09-2021",
    proprietor: "Ijeh Michael",
  },
  {
    id: 4,
    entry_number: "W18956M",
    parcel_number: "PS45654",
    created_at: "30-09-2021",
    proprietor: "Ijeh Michael",
  },
  {
    id: 5,
    entry_number: "W18956M",
    parcel_number: "PS45654",
    created_at: "30-09-2021",
    proprietor: "Ijeh Michael",
  },
  {
    id: 6,
    entry_number: "W18956M",
    parcel_number: "PS45654",
    created_at: "30-09-2021",
    proprietor: "Ijeh Michael",
  },
];

const fetchActionURL = "entries/getAllRectification";

export const mapStateToProps = (state, ownProps) => {
  const { loading, entries } = state;
  const { rectificationList, rectificationTotal } = entries;
  const isLoading = loading.effects[fetchActionURL];
  return {
    isLoading,
    rectificationList: sampleData,
    rectificationTotal: 5,
    fetchActionURL,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getAllRectification(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Rectification));
