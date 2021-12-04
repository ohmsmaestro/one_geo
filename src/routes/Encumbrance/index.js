import { connect } from "dva";
import { createForm } from "rc-form";
import { Encumbrance } from "./Encumbrance";
import { routerRedux } from "dva/router";

const sampleData = [
  {
    id: 1,
    entry_number: "W18956M",
    parcel_number: "PS45654",
    created_at: "30-09-2021",
    proprietor: "Ijeh Michael",
    encumbrance_number: "EN-35432",
    encumbrance_text:
      "i am an example of an encumbrance text... something something something...",
    entered_by: "Ijeh Michael",
    status: "OPEN",
  },
  {
    id: 2,
    entry_number: "W18956M",
    parcel_number: "PS45654",
    created_at: "30-09-2021",
    proprietor: "Ijeh Michael",
    encumbrance_number: "EN-35432",
    encumbrance_text:
      "i am an example of an encumbrance text... something something something...",
    entered_by: "Ijeh Michael",
    status: "OPEN",
  },
  {
    id: 3,
    entry_number: "W18956M",
    parcel_number: "PS45654",
    created_at: "30-09-2021",
    proprietor: "Ijeh Michael",
    encumbrance_number: "EN-35432",
    encumbrance_text:
      "i am an example of an encumbrance text... something something something...",
    entered_by: "Ijeh Michael",
    status: "OPEN",
  },
  {
    id: 4,
    entry_number: "W18956M",
    parcel_number: "PS45654",
    created_at: "30-09-2021",
    proprietor: "Ijeh Michael",
    encumbrance_number: "EN-35432",
    encumbrance_text:
      "i am an example of an encumbrance text... something something something...",
    entered_by: "Ijeh Michael",
    status: "CLOSED",
  },
  {
    id: 5,
    entry_number: "W18956M",
    parcel_number: "PS45654",
    created_at: "30-09-2021",
    proprietor: "Ijeh Michael",
    encumbrance_number: "EN-35432",
    encumbrance_text:
      "i am an example of an encumbrance text... something something something...",
    entered_by: "Ijeh Michael",
    status: "CLOSED",
  },
  {
    id: 6,
    entry_number: "W18956M",
    parcel_number: "PS45654",
    created_at: "30-09-2021",
    proprietor: "Ijeh Michael",
    encumbrance_number: "EN-35432",
    encumbrance_text:
      "i am an example of an encumbrance text... something something something...",
    entered_by: "Ijeh Michael",
    status: "OPEN",
  },
];

const fetchActionURL = "entries/getAllEncumbrance";

export const mapStateToProps = (state, ownProps) => {
  const { loading, entries } = state;
  const { encumbranceList, encumbranceTotal, terminateModal } = entries;
  const isLoading = loading.effects[fetchActionURL];
  return {
    isLoading,
    encumbranceList,
    encumbranceTotal: 5,
    fetchActionURL,
    terminateModal,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect(pathname) {
      dispatch(routerRedux.push({ pathname: `${pathname}` }));
    },
    getAllEncumbrance(data) {
      dispatch({ type: fetchActionURL, payload: data });
    },
    openTerminateModal(data) {
      dispatch({
        type: "entries/save",
        payload: { entryData: data, terminateModal: true },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Encumbrance));
