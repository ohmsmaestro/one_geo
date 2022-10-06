import { connect } from "dva";
import { createForm } from "rc-form";
import { Archived } from "./Archived";
import { routerRedux } from "dva/router";

const sampleData = [
  {
    id: 1,
    name: "W18956M - International Passport",
    type: "pdf",
    file: "Random text about this entry that is going to prove important …",
  },
  {
    id: 1,
    name: "W18956M - International Passport",
    type: "doc",
    file: "Random text about this entry that is going to prove important …",
  },
  {
    id: 1,
    name: "W18956M - International Passport",
    type: "pdf",
    file: "Random text about this entry that is going to prove important …",
  },
  {
    id: 1,
    name: "W18956M - International Passport",
    type: "pdf",
    file: "Random text about this entry that is going to prove important …",
  },
  {
    id: 1,
    name: "W18956M - International Passport",
    type: "jpg",
    file: "Random text about this entry that is going to prove important …",
  },
  {
    id: 1,
    name: "W18956M - International Passport",
    type: "jpg",
    file: "Random text about this entry that is going to prove important …",
  },
  {
    id: 1,
    name: "W18956M - International Passport",
    type: "pdf",
    file: "Random text about this entry that is going to prove important …",
  },
  {
    id: 1,
    name: "W18956M - International Passport",
    type: "doc",
    file: "Random text about this entry that is going to prove important …",
  },
];

const fetchActionURL = "archived/getParcelArchieved";

const mapStateToProps = (state, ownProps) => {
  const { loading, archived } = state;
  const { archivedList, archivedTotal } = archived;
  const isLoading = loading.effects[fetchActionURL];
  return {
    isLoading,
    archivedList,
    archivedTotal: archivedList.length,
    fetchActionURL,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname, search) {
      dispatch(routerRedux.push({ pathname, search }));
    },
    getAllArchived(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Archived));
